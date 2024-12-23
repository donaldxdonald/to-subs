import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts', './scripts/cli.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  target: 'es2020',
})
