/* config-overrides.js */
const { override, addBabelPlugins } = require("customize-cra");

module.exports = {
  webpack: override(
    addBabelPlugins(
      ...[
        [
          require.resolve("./scripts/babel-define-plugin.js"),
          {
            "process.env.NODE_ENV": "production",
            "typeof window": "object",
          },
        ],
      ]
    )
  ),
};

console.log("------------------------------------");
console.log(process.env);
console.log("------------------------------------");
