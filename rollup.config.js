import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import url from 'rollup-plugin-url'
import babel from 'rollup-plugin-babel'
import autoprefixer from 'autoprefixer'
import pkg from './package.json'

const deps = Object.keys(pkg.dependencies)

export default {
  input: 'src/index.js',

  output: {
    format: 'esm',
    file: 'dist/vue-async-dialog.esm.js'
  },

  plugins: [
    json(),
    resolve({
      extensions: ['.mjs', '.js', '.vue', '.json']
    }),
    commonjs(),
    url(),
    vue({
      style: {
        postcssPlugins: [
          autoprefixer()
        ]
      }
    }),
    babel({
      extensions: ['.mjs', '.js', '.vue']
    })
  ],

  external: id => deps.some(m => id === m || id.startsWith(m + '/'))
}
