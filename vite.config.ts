import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const relativePublicAssets = {
  name: 'relative-public-assets',
  transform(code: string, id: string) {
    if (!id.endsWith('page.tsx')) return null;
    return { code: code.split('/assets/').join('./assets/'), map: null };
  },
};

export default defineConfig({
  base: './',
  plugins: [relativePublicAssets, react()],
  build: { assetsInlineLimit: 0 },
});
