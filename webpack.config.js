// https://github.com/Brooooooklyn/ts-import-plugin 使用ts的情况
// webpack.config.js
const tsImportPluginFactory = require('ts-import-plugin')

console.log('webpack.config')

module.exports = {
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|js|ts)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [ tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'lib',
                style: true
              }) ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          },
          exclude: /node_modules/
        }
      ]
    },
  }