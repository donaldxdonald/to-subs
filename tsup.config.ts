import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['./src/index.ts', './scripts/cli.ts'],
  splitting: true,
  dts: true,
  format: ['cjs', 'esm'],
})
