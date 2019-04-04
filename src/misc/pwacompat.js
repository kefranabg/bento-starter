;(function() {
  // basic feature detection: from IE10+
  // also fallout on 'navigator.standalone', we _are_ an iOS PWA
  if (!('onload' in XMLHttpRequest.prototype) || navigator.standalone) {
    return
  }

  const capableDisplayModes = ['standalone', 'fullscreen', 'minimal-ui']
  const defaultSplashColor = '#f8f9fa'
  const defaultSplashTextSize = 24
  const idealSplashIconSize = 128
  const minimumSplashIconSize = 48
  const splashIconPadding = 32

  const userAgent = navigator.userAgent || ''
  const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') !== -1
  const isSafariMobile = isSafari && userAgent.indexOf('Mobile/') !== -1
  const isIEOrEdge = Boolean(userAgent.match(/(MSIE |Edge\/|Trident\/)/))
  const isEdgePWA = typeof Windows !== 'undefined'

  function setup() {
    const manifestEl = document.head.querySelector('link[rel="pwa-setup"]')
    const manifestHref = manifestEl ? manifestEl.href : ''
    if (!manifestHref) {
      throw `can't find <link rel="manifest" href=".." />'`
    }

    const hrefFactory = buildHrefFactory([manifestHref, window.location])
    const xhr = new XMLHttpRequest()
    xhr.open('GET', manifestHref)

    // nb. use getAttribute for older brower safety
    xhr.withCredentials =
      manifestEl.getAttribute('crossorigin') === 'use-credentials'

    // this is IE10+
    xhr.onload = () => {
      try {
        const data = /** @type {!Object<string, *>} */ (JSON.parse(
          xhr.responseText
        ))
        process(data, hrefFactory)
      } catch (err) {
        console.warn('pwacompat.js error', err)
      }
    }
    xhr.send(null)
  }

  /**
   * @param {!Array<string>} options
   * @return {function(string): string}
   */
  function buildHrefFactory(options) {
    for (let i = 0; i < options.length; ++i) {
      const opt = options[i]
      try {
        new URL('', opt)
        return part => new URL(part || '', opt).toString()
      } catch (e) {
        console.err(e)
      }
    }
    return part => part || ''
  }

  function push(localName, attr) {
    const node = document.createElement(localName)
    for (const k in attr) {
      node.setAttribute(k, attr[k])
    }
    document.head.appendChild(node)
    return node
  }

  function meta(name, content) {
    if (content) {
      if (content === true) {
        content = 'yes'
      }
      push('meta', { name, content })
    }
  }

  /**
   * @param {!Object<string, (string|*)>} manifest
   * @param {function(string): string} urlFactory
   */
  function process(manifest, urlFactory) {
    const icons = manifest['icons'] || []
    icons.sort((a, b) => parseInt(b.sizes, 10) - parseInt(a.sizes, 10)) // largest first
    const appleTouchIcons = icons
      .map(icon => {
        // create icons as byproduct
        const attr = {
          rel: 'icon',
          href: urlFactory(icon['src']),
          sizes: icon['sizes']
        }
        push('link', attr)
        if (!isSafariMobile) {
          return
        }
        const dim = parseInt(icon['sizes'], 10)
        if (dim < 120) {
          return
        }
        attr['rel'] = 'apple-touch-icon'
        return push('link', attr)
      })
      .filter(Boolean)

    if (appleTouchIcons.length) {
      const last = appleTouchIcons[appleTouchIcons.length - 1]
      last.removeAttribute('sizes') // smallest is 'default', no sizes needed
    }

    // nb. only for iOS, but watch for future CSS rule `@viewport { viewport-fit: cover; }`
    const metaViewport = document.head.querySelector('meta[name="viewport"]')
    const viewport = (metaViewport && metaViewport.content) || ''
    const viewportFitCover = Boolean(
      viewport.match(/\bviewport-fit\s*=\s*cover\b/)
    )

    const display = manifest['display']
    const isCapable = capableDisplayModes.indexOf(display) !== -1
    meta('mobile-web-app-capable', isCapable)
    updateThemeColorRender(
      /** @type {string} */ (manifest['theme_color']) || 'black',
      viewportFitCover
    )

    if (isIEOrEdge) {
      // Pinned Sites, largely from https://technet.microsoft.com/en-us/windows/dn255024(v=vs.60)
      meta('application-name', manifest['short_name'])
      meta('msapplication-tooltip', manifest['description'])
      meta(
        'msapplication-starturl',
        urlFactory(/** @type {string} */ (manifest['start_url'] || '.'))
      )
      meta('msapplication-navbutton-color', manifest['theme_color'])

      const largest = icons[0]
      if (largest) {
        meta('msapplication-TileImage', urlFactory(largest['src']))
      }
      meta('msapplication-TileColor', manifest['background_color'])
    }

    // nb: we check, but this won't override any _earlier_ (in DOM order) theme-color
    if (!document.head.querySelector('[name="theme-color"]')) {
      meta('theme-color', manifest['theme_color'])
    }

    if (!isSafariMobile) {
      // TODO(samthor): We don't detect QQ or UC, we just set the vars anyway.
      const orientation = simpleOrientationFor(manifest['orientation'])
      meta('x5-orientation', orientation) // QQ
      meta('screen-orientation', orientation) // UC
      if (display === 'fullscreen') {
        meta('x5-fullscreen', 'true') // QQ
        meta('full-screen', 'yes') // UC
      } else if (isCapable) {
        meta('x5-page-mode', 'app') // QQ
        meta('browsermode', 'application') // UC
      }

      return // the rest of this file is for Mobile Safari
    }

    const backgroundIsLight = shouldUseLightForeground(
      /** @type {string} */ (manifest['background_color'] || defaultSplashColor)
    )

    // Add related iTunes app from manifest.
    const itunes = findAppleId(manifest['related_applications'])
    itunes && meta('apple-itunes-app', `app-id=${itunes}`)

    // General iOS meta tags.
    meta('apple-mobile-web-app-capable', isCapable)
    meta(
      'apple-mobile-web-app-title',
      manifest['short_name'] || manifest['name']
    )

    /**
     * @param {{width: number, height: number}} arg
     * @param {string} orientation
     * @param {!Image|undefined} icon
     * @return {function(): !HTMLLinkElement}
     */
    function splashFor({ width, height }, orientation, icon) {
      const ratio = window.devicePixelRatio
      const ctx = contextForCanvas({
        width: width * ratio,
        height: height * ratio
      })

      ctx.scale(ratio, ratio)
      ctx.fillStyle = manifest['background_color'] || defaultSplashColor
      ctx.fillRect(0, 0, width, height)
      ctx.translate(width / 2, (height - splashIconPadding) / 2)

      if (icon) {
        // nb: on Chrome, we need the image >=48px, use the big layout >=80dp, ideal is >=128dp
        let iconWidth = icon.width / ratio
        let iconHeight = icon.height / ratio
        if (iconHeight > idealSplashIconSize) {
          // clamp to 128px height max
          iconWidth /= iconHeight / idealSplashIconSize
          iconHeight = idealSplashIconSize
        }

        if (
          iconWidth >= minimumSplashIconSize &&
          iconHeight >= minimumSplashIconSize
        ) {
          ctx.drawImage(
            icon,
            iconWidth / -2,
            iconHeight / -2,
            iconWidth,
            iconHeight
          )
          ctx.translate(0, iconHeight / 2 + splashIconPadding)
        }
      }

      ctx.fillStyle = backgroundIsLight ? 'white' : 'black'
      ctx.font = `${defaultSplashTextSize}px HelveticaNeue-CondensedBold`

      const title = manifest['name'] || manifest['short_name'] || document.title
      const textWidth = ctx.measureText(title).width
      if (textWidth < width * 0.8) {
        // short-circuit, just draw entire string
        ctx.fillText(title, textWidth / -2, 0)
      } else {
        // longer wrap case, draw once we have >0.7 width accumulated
        const words = title.split(/\s+/g)
        for (let i = 1; i <= words.length; ++i) {
          const cand = words.slice(0, i).join(' ')
          const measureWidth = ctx.measureText(cand).width
          if (i === words.length || measureWidth > width * 0.6) {
            // render accumulated words
            ctx.fillText(cand, measureWidth / -2, 0)
            ctx.translate(0, defaultSplashTextSize * 1.2)
            words.splice(0, i)
            i = 0
          }
        }
      }

      return () => {
        const generatedSplash = /** @type {!HTMLLinkElement} */ (document.createElement(
          'link'
        ))
        generatedSplash.setAttribute('rel', 'apple-touch-startup-image')
        generatedSplash.setAttribute('media', `(orientation: ${orientation})`)
        generatedSplash.setAttribute('href', ctx.canvas.toDataURL())
        return generatedSplash
      }
    }

    /**
     * @param {!Image=} applicationIcon
     */
    function renderBothSplash(applicationIcon) {
      const portrait = splashFor(window.screen, 'portrait', applicationIcon)
      const landscape = splashFor(
        {
          width: window.screen.height,
          height: window.screen.width
        },
        'landscape',
        applicationIcon
      )

      // this is particularly egregious setTimeout use, but the .toDataURL() is one of the
      // "bottlenecks" of PWACompat, so don't elongate any single frame more than needed.

      window.setTimeout(() => {
        document.head.appendChild(portrait())
        window.setTimeout(() => {
          document.head.appendChild(landscape())
        }, 10)
      }, 10)
    }

    // fetch the largest icon to generate a splash screen
    const icon = appleTouchIcons[0]
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onerror = () => {
      renderBothSplash() // something went wrong, generate blank image
    }

    // nothing to render, just do the error case
    if (!appleTouchIcons.length) {
      img.onerror()
      return
    }

    img.onload = () => {
      renderBothSplash(img)

      // also check and redraw icon
      if (!manifest['background_color']) {
        return
      }
      const redrawn = updateTransparent(img, manifest['background_color'])
      if (!redrawn) {
        return // the rest probably aren't interesting either
      }
      icon.href = redrawn

      // fetch and fix all remaining icons
      appleTouchIcons.slice(1).forEach(icon => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          const redrawn = updateTransparent(
            img,
            manifest['background_color'],
            true
          )
          icon.href = redrawn
        }
        img.src = icon.href
      })
    }
    img.src = icon.href
  }

  function findAppleId(related) {
    let itunes
    ;(related || [])
      .filter(app => app['platform'] === 'itunes')
      .forEach(app => {
        if (app['id']) {
          itunes = app['id']
        } else {
          const match = app['url'].match(/id(\d+)/)
          if (match) {
            itunes = match[1]
          }
        }
      })
    return itunes
  }

  function simpleOrientationFor(v) {
    const prefix = String(v || '').substr(0, 3)
    return { por: 'portrait', lan: 'landscape' }[prefix] || ''
  }

  /**
   * @param {string} color
   * @param {boolean} viewportFitCover
   */
  function updateThemeColorRender(color, viewportFitCover) {
    if (!(isSafariMobile || isEdgePWA)) {
      return
    }

    const themeIsLight = shouldUseLightForeground(color)
    if (isSafariMobile) {
      // nb. Safari 11.3+ gives a deprecation warning about this meta tag.
      const content = viewportFitCover
        ? 'black-translucent'
        : themeIsLight
        ? 'black'
        : 'default'
      meta('apple-mobile-web-app-status-bar-style', content)
    } else {
      // Edge PWA
      const t = getEdgeTitleBar()
      if (!t) {
        return // something went wrong, we had a UWP without titleBar
      }
      t.foregroundColor = colorToWindowsRGBA(themeIsLight ? 'black' : 'white')
      t.backgroundColor = colorToWindowsRGBA(color)
    }
  }

  /**
   * @return {!ApplicationViewTitleBar|undefined}
   */
  function getEdgeTitleBar() {
    try {
      // eslint-disable-next-line no-undef
      return Windows.UI.ViewManagement.ApplicationView.getForCurrentView()
        .titleBar
    } catch (e) {
      // implicit return undefined
    }
  }

  /**
   * The Windows titlebar APIs expect an object of {r, g, b, a}.
   *
   * @param {string} color
   * @return {WindowsColor}
   */
  function colorToWindowsRGBA(color) {
    const data = readColor(color)
    return /** @type {WindowsColor} */ ({
      r: data[0],
      g: data[1],
      b: data[2],
      a: data[3]
    })
  }

  /**
   * @param {string} color
   * @return {!Uint8ClampedArray}
   */
  function readColor(color) {
    const c = contextForCanvas()
    c.fillStyle = color
    c.fillRect(0, 0, 1, 1)
    return c.getImageData(0, 0, 1, 1).data
  }

  /**
   * @param {string} color
   * @return {boolean}
   */
  function shouldUseLightForeground(color) {
    const pixelData = readColor(color)

    // From https://cs.chromium.org/chromium/src/chrome/android/java/src/org/chromium/chrome/browser/util/ColorUtils.java
    const data = pixelData.map(v => {
      const f = v / 255
      return f < 0.03928 ? f / 12.92 : Math.pow((f + 0.055) / 1.055, 2.4)
    })
    const lum = 0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2]
    const contrast = Math.abs(1.05 / (lum + 0.05))
    return contrast > 3
  }

  function updateTransparent(image, background, force = false) {
    const context = contextForCanvas(image)
    context.drawImage(image, 0, 0)

    // look for transparent pixel in top-left
    // TODO: Chrome actually checks the four corners for some cases.
    if (!force) {
      const imageData = context.getImageData(0, 0, 1, 1)
      if (imageData.data[3] == 255) {
        return
      }
    }

    context.globalCompositeOperation = 'destination-over' // only replace transparent areas
    context.fillStyle = background
    context.fillRect(0, 0, image.width, image.height)
    return context.canvas.toDataURL()
  }

  function contextForCanvas({ width, height } = { width: 1, height: 1 }) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas.getContext('2d')
  }

  // actually run PWACompat here
  if (document.readyState === 'complete') {
    setup()
  } else {
    window.addEventListener('load', setup)
  }
})()
