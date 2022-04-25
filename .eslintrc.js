module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'max-len': ['error', { code: 250 }],
    'vue/multi-word-component-names': 'off',
    'no-control-regex': 0,
    'import/extensions': 0,
    'no-return-await': 0,
    'import/no-cycle': 0,
  },
};
