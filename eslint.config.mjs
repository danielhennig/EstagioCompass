import globals from "globals";
import pluginJs from "@eslint/js";

//Para verificar se há problemas no seu código, execute:
//npx eslint demo-file.js

//Para corrigir automaticamente problemas identificados, execute:
//npx eslint demo-file.js --fix

/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];
