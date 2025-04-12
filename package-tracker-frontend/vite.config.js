import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [tailwindcss(), react()],
    server: {
      port: 5173, // Ensure this matches the port in your Django CORS_ALLOWED_ORIGINS
      open: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL, // Now using the loaded env variables
          changeOrigin: true,
        },
      },
    },
  };
});
