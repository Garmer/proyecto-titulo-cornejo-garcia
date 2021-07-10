const { override, fixBabelImports, addLessLoader } = require("customize-cra")

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@text-selection-bg": "#15847D",
      "@primary-color": "#15847D",
      "@checkbox-color": "#15847D",
      "@checkbox-border-width": "2px"
    }
  })
)
