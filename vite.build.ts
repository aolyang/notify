import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/components/index.ts",
      fileName: (format) => `dist/notify.${format}.js`,
      name: "notify"
    },
    rollupOptions: {
      external: ["react", "react-dom", "@mui/material"]
    }
  }
})
