import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,   // allow test, expect, describe
      },
    },
    rules: {
      "no-irregular-whitespace": "off", // Ignore special chars inside config files
    },
  },
];
