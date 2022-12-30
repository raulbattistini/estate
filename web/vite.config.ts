import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        injectRegister: "auto",
        manifest: {
          name: "vite-react-ts-100",
          short_name: "vite-react-ts-100",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          lang: "en",
          scope: "/",
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
          theme_color: "#ffffff",
        },
      }),
    ],
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
      port: 5173,
    },
  });
};
