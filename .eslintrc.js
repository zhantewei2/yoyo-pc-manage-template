module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    "prefer-const":"off",
    'no-empty':"off",
    "@typescript-eslint/ban-ts-ignore":"off",
    "@typescript-eslint/no-inferrable-types":"off",
    "@typescript-eslint/type-annotation-spacing":0,
    "@typescript-eslint/no-empty-function":0,
    "@typescript-eslint/no-explicit-any":0,
    "@typescript-eslint/no-unused-vars":0,
    "@typescript-eslint/class-name-casing":0,
    "@typescript-eslint/consistent-type-assertions":0,
    "@typescript-eslint/member-delimiter-style":0,
    "@typescript-eslint/no-this-alias":0
  }
}
