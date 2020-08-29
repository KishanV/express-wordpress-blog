const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  { targets: { browsers: "last 2 versions" } }, // or whatever your project requires
                ],
                "@babel/preset-typescript",
                "@babel/preset-react",
              ],
              plugins: [
                // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
            },
          },
        ],
      },
      {
        test: /\.node$/,
        use: "node-loader",
      },
    ],
  },
};
