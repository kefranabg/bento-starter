function RemoveDefaultManifest() {
  this.apply = compiler => {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-after-html-processing', data => {
        data.html = data.html.replace(
          '<link rel=manifest href=/manifest.json>',
          ''
        )
      })
    })
  }
}

module.exports = RemoveDefaultManifest
