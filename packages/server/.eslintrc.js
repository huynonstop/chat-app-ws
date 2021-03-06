module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
  },
};
