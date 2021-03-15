module.exports = {
  module: {
    rules: [
      {
        test: /\.md/,
        loader: "markdownit-loader",
      },
    ],
  },
};
