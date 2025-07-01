exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /lottie-web/,
            use: loaders.null(),
          },
          {
            test: /dompurify/,
            use: loaders.null(),
          },
          {
            test: /lunr/,
            use: loaders.null(),
          },
          {
            test: /penpal/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}