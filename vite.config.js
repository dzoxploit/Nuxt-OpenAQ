import postcssImport from "postcss-import";
import tailwindcssNesting from "tailwindcss/nesting";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssScss from "postcss-scss";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "build",
    cssCodeSplit: true,
    emptyOutDir: true,
    minify: false,
    assetsDir: "",
    rollupOptions: {
      input: {
        index: "js/index.js",
        tailwind: "styles/tailwind.css",
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  css: {
    postcss: {
      syntax: postcssScss,
      plugins: [postcssImport, tailwindcssNesting, tailwindcss, autoprefixer],
    },
  },
  server: {
    hmr: false, // Disable Hot Module Replacement
    overlay: false, // Disable HMR overlay
  },
  clearScreen: true,
  publicDir: false,
});
