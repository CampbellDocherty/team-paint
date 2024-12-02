import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ViteUserConfig as VitestUserConfigInterface } from 'vitest/config';
import { viteExternalsPlugin } from 'vite-plugin-externals'

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: "jsdom",
  },
};

export default defineConfig({
  base: "./",
  plugins: [
    viteExternalsPlugin({
      ml5: '/public/libraries/ml5.min.js',
    }),
    react()],
  ...vitestConfig
})