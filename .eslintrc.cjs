module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true,
        browser: true
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:security/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react", "import", "jsx-a11y", "@typescript-eslint", "security", "prettier"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/no-unknown-property": "off",
        "security/detect-object-injection": "off",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-member-accessibility": ["error"],
        indent: "off",
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        semi: 2,
        quotes: [
            2,
            "double",
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        "no-trailing-spaces": "error",
        "no-case-declarations": "off",
        "prefer-template": "error",
        "eol-last": "error",
        "no-undef": 1,
        "no-prototype-builtins": 1,
        "prettier/prettier": ["error"]
    },
    ignorePatterns: ["**/*.html"],
    settings: {
        "import/resolver": {
            typescript: {}
        },
        react: {
            version: "detect"
        }
    }
};
