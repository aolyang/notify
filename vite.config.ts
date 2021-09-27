import { defineConfig } from 'vite'
import path from "path"
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  base: ".",
  root: __dirname,
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "/@/": path.join(__dirname, "src") + "/"
    }
  }
})
