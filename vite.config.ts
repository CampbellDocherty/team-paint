import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ViteUserConfig as VitestUserConfigInterface } from 'vitest/config';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: "jsdom",
  },
};

export default defineConfig({
  base: "./",
  plugins: [react()],
  ...vitestConfig
})