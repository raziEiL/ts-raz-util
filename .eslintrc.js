module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: [
        // Базовый набор правил eslint
        'eslint:recommended',
        // Отключаем правила из базового набора
        'plugin:@typescript-eslint/eslint-recommended',
        // Базовые правила для TypeScript
        'plugin:@typescript-eslint/recommended',
        // Правила TS, требующие инфо о типах
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/warnings',
        "plugin:import/typescript",
        'plugin:unicorn/recommended',
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/tslint",
        "import",
        "unicorn",
        "no-null"
    ],
    "rules": {
        "quotes": ["error", "double", { "avoidEscape": true }],
        "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "no-empty": ["error", { "allowEmptyCatch": true }],
        "@typescript-eslint/ban-ts-ignore": "warn",
        "@typescript-eslint/no-use-before-define": "warn", // ["error", { "functions": false }],
        "@typescript-eslint/camelcase": "warn",
        "@typescript-eslint/prefer-regexp-exec": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/catch-error-name": "off",
        "unicorn/explicit-length-check": "off",
        "no-null/no-null": "warn",
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "jsdoc-format": true,
                    "one-line": [
                        true,
                        "check-open-brace",
                        "check-whitespace"
                    ],
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-module",
                        "check-separator",
                        "check-type"
                    ]
                }
            }
        ]
    }
};