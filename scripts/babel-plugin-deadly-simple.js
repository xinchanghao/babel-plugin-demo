// module.exports = function () {
//   return {
//     name: "babel-plugin-deadly-simple",
//     visitor: {
//       Identifier(path) {
//         if (path.node.name === "bad") {
//           path.node.name = "good";
//         }
//       },
//     },
//   };
// };

module.exports = function ({ types: babelTypes }) {
  return {
    name: "babel-plugin-deadly-simple",
    visitor: {
      Identifier(path, state) {
        let name = path.node.name;

        if (state.opts[name]) {
          path.node.name = state.opts[name];
        }
      },
    },
  };
};
