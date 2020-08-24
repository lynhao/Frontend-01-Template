module.exports = {
    entry: {
        app: './src/main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [["@babel/plugin-transform-react-jsx", {pragma: "createElement"}]]
                    }
                }
            },
            // {
            //     test: /\.view/,
            //     use: {
            //         loader: require.resolve("./myloader.js")
            //     }
            // },
            // {
            //     test: /\.css/,
            //     use: {
            //         // loader: 'css-loader'
            //         loader: require.resolve("./component-css-loader.js")
            //     }
            // }
        ]
    },
    mode: "development",
    plugins: [
        new (require('html-webpack-plugin'))
    ],
    optimization: {
        minimize: true
    },
    devServer: {
        open: true,
        compress: false,
        contentBase: "./src"
    }
}