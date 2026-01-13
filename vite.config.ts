import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import TanStackRouter from '@tanstack/router-plugin/vite'
import path from "path"


// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouter(),
  react({
    babel: {
      plugins: [["module:@preact/signals-react-transform"]],
    },
  }), tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
