import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: [
    "index.js",
    "src/Select/base.js",
    "src/Select/index.js",
    "src/Radio/base.js",
    "src/Radio/index.js",
    "src/Checkbox/base.js",
    "src/Checkbox/index.js",
  ],
  output: [
    {
      dir: "build",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
  ],
  preserveModules: true,
  external: ["react", "react-dom"],
  plugins: [
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs({
      exclude: ["node_modules/@reusejs/react-utils/build/node_modules/**"],
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
