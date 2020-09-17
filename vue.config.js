const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@static': path.resolve('./src/assets/'),
        '@frontend': path.resolve('./src/'),
        '@fixtures': path.resolve('./fixtures'),
        '@css': path.resolve('./static/generated/css/')
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ removeViewBox: false }]
        }
      })
  }
}
