/* config-overrides.js */
const { override, addBabelPlugins } = require("customize-cra");

module.exports = {
  webpack: override(
    addBabelPlugins(
      ...[
        // [
        //   "./scripts/babel-plugin-deadly-simple",
        //   {
        //     "bad": "good",
        //     "dead": "alive"
        //   }
        // ],
        [
          require.resolve("./scripts/babel-plugin-node-env-replacer"),
          {
            NODE_ENV: "hi",
          },
        ],
        // [
        //   require.resolve("./scripts/babel-define-plugin.js"),
        //   {
        //     "process.env.NODE_ENV": "production",
        //     "typeof window": "object",
        //   },
        // ],
      ]
    )
  ),
};
