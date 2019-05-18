module.exports = {
  plugins: ['lodash'],
  presets: [
    ['@vue/app', { useBuiltIns: 'entry' }],
    ['@babel/env', { targets: { node: 6 } }]
  ]
}
