module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier',
  ],
  env: {
    es6: true,
    jest: true,
  },
  rules: {
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', {extensions: ['.js', '.jsx']}],
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 2,
        comments: 100,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathPrefix: '@',
        rootPathSuffix: 'src',
      },
    },
  },
  globals: {
    __DEV__: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['react', 'react-native', 'jsx-a11y', 'import', 'prettier'],
};
