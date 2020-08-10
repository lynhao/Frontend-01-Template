module.exports = {
    entry: {
        app: './main.js',
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
            {
                test: /\.view/,
                use: {
                    loader: require.resolve("./myloader.js")
                }
            },
            {
                test: /\.css/,
                use: {
                    // loader: 'css-loader'
                    loader: require.resolve("./component-css-loader.js")
                }
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: true
    }
}