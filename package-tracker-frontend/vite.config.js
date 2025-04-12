import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173, // Make sure this matches the port in your Django CORS_ALLOWED_ORIGINS
    open: true,
    proxy: {
      // If you want to proxy API requests during development
      "/api": {
        target: import.meta.env.VITE_API_URL, // Dynamically use the env var for Backend server URL
        changeOrigin: true,
      },
    },
  },
});
