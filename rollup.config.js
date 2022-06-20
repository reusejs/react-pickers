import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

export default {
  input: "index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  // preserveModules: true,
  external: [
    "react",
    "react-dom",
    "regenerator-runtime",
    "@reusejs/react-utils",
    "@reusejs/react-text-inputs",
  ],
  plugins: [
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs({
      // exclude: ["node_modules/@reusejs/react-utils/build/node_modules/**"],
    }),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
  ],
};
