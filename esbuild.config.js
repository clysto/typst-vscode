const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./src/extension.js'],
    bundle: true,
    platform: 'node',
    outfile: './dist/extension.js',
    external: ['vscode'],
    sourcemap: true,
    format: 'cjs',
    minify: false,
    logLevel: 'info',
    loader: {
      '.wasm': 'file',
    },
  })
  .catch(() => process.exit(1));
