import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "prettier", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"),
    {
        plugins: {
            "react": react,
            "react-hooks": fixupPluginRules(reactHooks),
            "prettier": fixupPluginRules(prettier),
            "@typescript-eslint": typescriptEslint
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 12,
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "react/jsx-uses-vars": "warn",
            "react/jsx-uses-react": "warn",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "no-empty-function": "off",
            "@typescript-eslint/no-empty-function": "off",
        },
    },
];