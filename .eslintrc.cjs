module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "prettier", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-extra-semi": 1,
    "no-unused-vars": 1,
    "@typescript-eslint/no-unused-vars": 1,
  },
};
