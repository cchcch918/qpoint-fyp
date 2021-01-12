module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: 'less-loader',
        options: {
          modifyVars: {
            'primary-color': '#F7882F',
          },
          javascriptEnabled: true
        }
      }
    ]
  }
};
