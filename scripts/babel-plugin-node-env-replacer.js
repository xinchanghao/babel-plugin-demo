module.exports = function ({ types: t }) {
  return {
    name: "node-env-replacer",
    visitor: {
      // 成员表达式
      MemberExpression(path, state) {
        // 如果 object 对应的节点匹配了模式 "process.env"
        if (path.get("object").matchesPattern("process.env")) {
          // 这里返回结果为字符串字面量类型的节点
          const key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            // path.replaceWith( newNode ) 用来替换当前节点
            // t.valueToNode( value ) 用来创建节点，如果value是字符串，则返回字符串字面量类型的节点

            path.replaceWith(t.valueToNode(state.opts[key.value]));
          }
        }
      },
    },
  };
};
