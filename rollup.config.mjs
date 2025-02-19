import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { dts } from 'rollup-plugin-dts'
import path from 'path'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
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
  external: (id) => {
    if (id.startsWith('.') || path.isAbsolute(id)) {
      return false;
    }
    return /node_modules/.test(id);
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      // verbosity: 3,
      clean: true,
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['node_modules', 'lib']
    })
  ]
}

/**
 * @type {import('rollup').RollupOptions}
 */
const dtsConfig = {
  input: 'src/index.js',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  external: (id) => !id.startsWith('.') && !path.isAbsolute(id),
  plugins: [dts()]
}

export default [config, dtsConfig]
