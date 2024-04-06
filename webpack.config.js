const path = require("path");
const glob = require("glob");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: glob.sync("./src/**/*.ts").reduce((acc, filePath) => {
    const entry = filePath.replace("/index.ts", "").substring(4, filePath.length - 3);
    acc[entry] = path.resolve(__dirname, filePath);
    return acc;
  }, {}),
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  target: "electron-renderer",
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node-modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
}
