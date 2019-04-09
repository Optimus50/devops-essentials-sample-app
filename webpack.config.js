const path = require('path');

module.exports = {

   mode: "development",
   entry: path.resolve(__dirname, `src`, `app`),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   resolve: {
      extensions: ['.js', '.jsx']
   },
   devServer: {
      historyApiFallback: true
   },
   module: {
      rules: [{
         test: /\.jsx?/,
         exclude: /(node_modules|bower_components)/,
         use: {
            loader: "babel-loader",
            options: {
               presets: ['@babel/preset-env']
            }
         }
      }]
   }
}