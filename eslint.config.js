import antfu from "@antfu/eslint-config";
import perf from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";

// import simpleImportSort from "eslint-plugin-simple-import-sort";

export default antfu(
  {
    formatters: false,
    // ignores: [".pnpm-store/*", "src/routeTree.gen.ts"],
    ignores: [".pnpm-store/*", "src/routeTree.gen.ts", "**/*.d.ts"],
    react: true,
    stylistic: {
      indent: 2,
      quotes: "double",
      semi: true,
    },
    type: "app",
    typescript: true,
  },
  {
    plugins: {
      reactPlugin,
    },
    rules: {
      "antfu/no-top-level-await": ["off"],
      "no-console": ["warn"],
      "node/no-process-env": ["error"],
      "node/prefer-global/process": ["off"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "reactPlugin/jsx-newline": ["error", { prevent: false }],
      "ts/consistent-type-definitions": ["error", "type"],
      "ts/no-redeclare": "off",
      "ts/no-explicit-any": "warn",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md", "src/routeTree.gen.ts"],
        },
      ],
      ...perf.configs["recommended-alphabetical"].rules,
      "sort-objects": "off",
      "perfectionist/sort-objects": ["off"],
      "perfectionist/sort-variable-declarations": ["off"],
      "perfectionist/sort-modules": ["off"],
    },
  },
);

//* ----------------------------------------
// import js from "@eslint/js";
// import perfectionist from "eslint-plugin-perfectionist";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import globals from "globals";
// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   { ignores: ["dist"] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ["**/*.{ts,tsx}"],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//       perfectionist,
//       react,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       "react-refresh/only-export-components": [
//         "warn",
//         { allowConstantExport: true },
//       ],
//       "perfectionist/sort-variable-declarations": "warn",
//       "perfectionist/sort-intersection-types": "warn",
//       "perfectionist/sort-heritage-clauses": "warn",
//       "perfectionist/sort-array-includes": "warn",
//       "perfectionist/sort-named-imports": "warn",
//       "perfectionist/sort-named-exports": "warn",
//       "perfectionist/sort-object-types": "warn",
//       "perfectionist/sort-union-types": "warn",
//       "perfectionist/sort-switch-case": "warn",
//       "perfectionist/sort-interfaces": "warn",
//       "perfectionist/sort-decorators": "warn",
//       "perfectionist/sort-jsx-props": "warn",
//       "perfectionist/sort-modules": ["off"],
//       "perfectionist/sort-classes": "warn",
//       "perfectionist/sort-imports": "warn",
//       "perfectionist/sort-exports": "warn",
//       "perfectionist/sort-enums": "warn",
//       "perfectionist/sort-sets": "warn",
//       "perfectionist/sort-maps": "warn",
//       "perfectionist/sort-objects": "off",
//       "react/jsx-newline": ["error", { prevent: false }],
//     },
//   },
// );
