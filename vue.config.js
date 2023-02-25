const path = require('path')
const webpack = require('webpack')

// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']

function resolve (dir) {
  return path.join(__dirname, dir)
}

// const isProd = process.env.NODE_ENV === 'production'

let plugins = [
  // Ignore all locale files of moment.js
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]
// if (isProd) {
//   plugins.push(
//     new CompressionWebpackPlugin({
//       filename: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
//       threshold: 10240,
//       minRatio: 0.8
//     })
//   )
// }

// vue.config.js
const vueConfig = {
  publicPath: '/',

  configureWebpack: {
    // webpack plugins
    plugins,
    // if prod, add externals
    externals: {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/);
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });

    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  },

  css: {
    loaderOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    host: "localhost",
    port: 8021,
    hot: true,
    open: true,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/api': {
        target: 'https://dev.h2o.homes',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
  },

  // disable source map in production
  productionSourceMap: false,

  lintOnSave: true,

  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/index.less')]
    }
  }
}

module.exports = vueConfig
