import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const config = {
  input: 'src/index.js',
  output: {
    file: 'umd/bot-sdk.js',
    sourcemap: true,
    format: 'umd',
    name: 'CandidateBot',
  },
  plugins: [
    builtins(),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
  ],
};

export default commandLineArgs => {
  if (commandLineArgs.configProd === true) {
    config.plugins.push(uglify())
    config.output.file = 'umd/bot-sdk.min.js'
    return config;
  }
  return config;
}
