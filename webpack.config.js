const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /test/,
          /dist/
        ],
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json']
        },
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'windows/installAsWindowsService.js', to: 'installAsWindowsService.js' },
        { from: 'windows/installAsWindowsService.bat', to: 'installAsWindowsService.bat' },
        { from: 'windows/uninstallAsWindowsService.bat', to: 'uninstallAsWindowsService.bat' },
        { from: 'package.json', to: 'package.json' },
        { from: '.env.example', to: '.env.example' }
      ]
    })
  ],
  target: 'node'
}
