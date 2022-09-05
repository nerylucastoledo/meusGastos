module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:react/recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1 }],
        'no-console': 'off',
        'space-before-blocks': 'error',
        'no-trailing-spaces': 'error',
    }
}
