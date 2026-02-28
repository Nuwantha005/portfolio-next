import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "out/**",
      ".next/**",
      "node_modules/**",
      "src/out/**",
      "**/*.config.js",
      "**/*.config.ts",
    ],
  },
];

export default eslintConfig;
