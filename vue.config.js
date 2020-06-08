const path = require('path')
const merge = require('webpack-merge')

// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
//webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// https://github.com/Brooooooklyn/ts-import-plugin 使用ts的情况
// webpack.config.js
const tsImportPluginFactory = require('ts-import-plugin')

// 引入 HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist', // 打包生成的生产环境构建文件的目录
    lintOnSave: true, // eslint-loader 是否在保存的时候检查 
    // runtimeCompiler: false, // 是否使用包含运行时编译器的Vue核心的构建
    assetsDir: 'assets', // 放置生成的静态资源路径，默认在outputDir
    indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
    // pages: undefined, // 构建多页
    productionSourceMap: false, // 开启 生产环境的 source map?
    configureWebpack: {
        plugins: process.env.NODE_ENV === 'production' ? [
            new CompressionWebpackPlugin({
                // asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new UglifyJsPlugin({
                uglifyOptions: {
                  compress: process.env.NODE_REALM === 'prd' ? {
                    drop_debugger: true,
                    drop_console: true,
                  } : {
                    drop_debugger: false,
                    drop_console: false,
                  },
                },
                sourceMap: false,
                parallel: true,
            })
        ] : [],
        // new HtmlWebpackPlugin({
        //     filename: 'public/index.html',
        //     template: 'public/index.html',
        //     inject: 'head',
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true
        //     },
        //     chunksSortMode: 'dependency'
        // }),
        // new webpack.ProvidePlugin({
        //     Vue: "vue",
        //     "window.Vue": "vue",
        //     VueRouter: "vue-router",
        //     Vuex: 'vuex'
        // })
        // externals: process.env.NODE_ENV === 'production' ? {
        //     'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        // } : {},
    },
    chainWebpack: config => {
        // 配置路径别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components')).end()
        // config.module.rule('ts')
        //     .use('ts-loader').loader('ts-loader')
        //     .options({
        //         appendTsSuffixTo: [/\.vue$/]
        //     }).end();
    },
    css: {
        modules: false, // 启用 CSS modules
        extract: true, // 是否使用css分离插件
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            postcss: {
                // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
                 plugins: [
                    require("postcss-px2rem-exclude")({
                        remUnit: 75,
                        exclude: /node_modules|folder_name/i
                    })
                ]
            }
        } // css预设器配置项
    },
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    filenameHashing:true,
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler:false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies:[],
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    crossorigin:undefined,
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次。
    integrity:false,
    parallel: require('os').cpus().length > 1, // 在多核机器下会默认开启。
    pwa: {}, // PWA 插件的选项。   
    devServer: {
        // port: 8080, // 端口
        proxy: {
            '/proxy': {
                target: 'http://kong.missxiaolin.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/proxy': ''
                }
            }
        }, // 设置代理
        historyApiFallback: true,
        hot: true
    },
    pluginOptions: {} // 第三方插件的选项
}