module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  "parser": "babel-eslint",
  'extends': [
    'standard',
    "plugin:react/recommended"
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  "parserOptions": {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  'plugins': [
    'react'
  ],
  "rules": {
    "react/prop-types": 0,
    "indent": ["error", 2, {
      "SwitchCase": 1
    }],
    "react/display-name": 'off',
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "space-before-function-paren": ["error", "always"],
    "jsx-quotes": ["error", "prefer-single"],
    "generator-star-spacing": ["error", {
      "before": true,
      "after": true
    }]
  }
}