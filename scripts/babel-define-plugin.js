const traverse = require("traverse");
const { get, has, find } = require("lodash");

const getSortedObjectPaths = (obj) => {
  if (!obj) {
    return [];
  }

  return traverse(obj)
    .paths()
    .filter((arr) => arr.length)
    .map((arr) => arr.join("."))
    .sort((a, b) => b.length - a.length);
};

const replaceAndEvaluateNode = (replaceFn, nodePath, replacement) => {
  nodePath.replaceWith(replaceFn(replacement));

  if (nodePath.parentPath.isBinaryExpression()) {
    const result = nodePath.parentPath.evaluate();

    if (result.confident) {
      nodePath.parentPath.replaceWith(replaceFn(result.value));
    }
  }
};

const processNode = (replacements, nodePath, replaceFn, comparator) => {
  const replacementKey = find(getSortedObjectPaths(replacements), (value) =>
    comparator(nodePath, value)
  );
  if (has(replacements, replacementKey)) {
    replaceAndEvaluateNode(
      replaceFn,
      nodePath,
      get(replacements, replacementKey)
    );
  }
};

const memberExpressionComparator = (nodePath, value) =>
  nodePath.matchesPattern(value);
const identifierComparator = (nodePath, value) => nodePath.node.name === value;
const unaryExpressionComparator = (nodePath, value) =>
  nodePath.node.argument.name === value;
const TYPEOF_PREFIX = "typeof ";

const plugin = function ({ types: t }) {
  return {
    visitor: {
      // process.env.NODE_ENV;
      MemberExpression(nodePath, state) {
        processNode(
          state.opts,
          nodePath,
          t.valueToNode,
          memberExpressionComparator
        );
      },

      // const x = { version: VERSION };
      Identifier(nodePath, state) {
        processNode(state.opts, nodePath, t.valueToNode, identifierComparator);
      },

      // typeof window
      UnaryExpression(nodePath, state) {
        if (nodePath.node.operator !== "typeof") {
          return;
        }

        const { opts } = state;
        const keys = Object.keys(opts);
        const typeofValues = {};

        keys.forEach((key) => {
          if (key.substring(0, TYPEOF_PREFIX.length) === TYPEOF_PREFIX) {
            typeofValues[key.substring(TYPEOF_PREFIX.length)] = opts[key];
          }
        });

        processNode(
          typeofValues,
          nodePath,
          t.valueToNode,
          unaryExpressionComparator
        );
      },
    },
  };
};

module.exports = plugin;
module.exports.default = plugin;
module.exports.getSortedObjectPaths = getSortedObjectPaths;
