import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/gestures.js',
      format: 'umd',
      name: 'gestures',
      sourcemap: true,
      sourcemapFile: 'dist/gestures.js.map',
      globals: {
        composi: 'gestures'
      }
    }, 
    {
      file: 'dist/gestures.mjs',
      format: 'esm',
      name: 'gestures',
      sourcemap: true,
      sourcemapFile: 'dist/gestures.mjs.map',
      globals: {
        composi: 'gestures'
      }
    }
  ],
  plugins:
    [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      minify({
        mangle: true,
        comments: false
      })
    ]
}