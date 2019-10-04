module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:vue/strongly-recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "max-len": [1, 240, 2],
    indent: ["error", 2, { "SwitchCase": 1 }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always"
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
