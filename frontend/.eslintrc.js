module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off'
  },
  settings: {
    react: {
      version: '17.0'
    }
  }
}
