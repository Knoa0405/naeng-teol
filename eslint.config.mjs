import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends("next", "next/core-web-vitals", "prettier"),

    rules: {
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },

          "newlines-between": "always-and-inside-groups",

          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "object",
            "index",
            "type",
            "unknown",
          ],

          pathGroups: [
            {
              pattern: "next",
              group: "builtin",
            },
            {
              pattern: "react",
              group: "builtin",
            },
            {
              pattern: "../**",
              group: "sibling",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "parent",
              position: "after",
            },
          ],

          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
    },
  },
]);
