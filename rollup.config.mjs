import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  logLevel: 'debug',
  input: [
    'src/index.js',
    'src/vsop87.js'
  ],
  output: [
    {
      dir: 'lib',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
    {
      dir: 'lib',
      format: 'es',
      entryFileNames: '[name].mjs',
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src'
    }
  ],
  external: [/node_modules/],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      // verbosity: 3,
      include: ['*.js+(|x)', '**/*.js+(|x)']
    })
  ]
}
