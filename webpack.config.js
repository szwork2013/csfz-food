module.exports = {
    context: __dirname,
    entry: './component/index.js',
    output: {
        path: __dirname + '/public/build',
        filename: 'bundle.js'
    },
    externals: {
        'react': 'React',
        'react-router': 'ReactRouter',
        'jquery': 'jQuery',
        'reflux': 'Reflux',
        'moment': 'moment',
        'underscore': '_',
        'wolfy87-eventemitter': 'EventEmitter'
    },
    module: {
        loaders: [
            {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: {compact: false}},
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};