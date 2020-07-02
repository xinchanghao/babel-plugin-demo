import * as parser from "@babel/parser";
// import traverse from "@babel/traverse";

export const CodeToAst = function () {
  let code = `
     let a = 1, b = 2;
     function sum(a, b){
          return a + b;
     }

    sum(a, b);
`;

  // step 1
  let ast = parser.parse(code, {
    // parse in strict mode and allow module declarations
    sourceType: "module",

    plugins: [
      // enable jsx and flow syntax
      "jsx",
      "flow",
    ],
  });

  console.log(ast);

  // step 2
  // traverse(ast, {
  //   enter(path) {
  //     if (path.node.type === "Identifier" && path.node.name === "n") {
  //       path.node.name = "x";
  //     }
  //   },
  // });

  // console.log(ast);
};
