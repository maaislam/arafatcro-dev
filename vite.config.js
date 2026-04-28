import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Auto-discover all HTML files in /work
const workDir = resolve(__dirname, 'work');
const workPages = readdirSync(workDir)
  .filter((file) => file.endsWith('.html') && !file.startsWith('_'))
  .reduce((acc, file) => {
    const name = file.replace('.html', '');
    acc[`work-${name}`] = resolve(workDir, file);
    return acc;
  }, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...workPages,
      },
    },
  },
});
