function RemoveDefaultManifest() {
  this.apply = compiler => {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-after-html-processing', data => {
        const newManifestLink = '<link rel=pwa-setup href=/manifest.json>'
        data.html = data.html.replace(
          '<link rel=manifest href=/manifest.json>',
          newManifestLink
        )
        data.html = data.html.replace(
          '<link rel="manifest" href="/manifest.json">',
          newManifestLink
        )
      })
    })
  }
}

module.exports = RemoveDefaultManifest
