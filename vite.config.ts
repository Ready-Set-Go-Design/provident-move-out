import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { exec } from "child_process";

import path from "path";

// Configuration for the extractor
const extractorConfig = {
  arrayNames: ["base", "colors", "styles"],
  sourceExtensions: [".jsx", ".tsx"],
  prefixName: "pf",
};

// Custom plugin to run our script on file changes
const extractTailwindClasses = () => ({
  name: "extract-tailwind-classes",
  handleHotUpdate({ file, server }) {
    if (file.endsWith(".jsx") || file.endsWith(".tsx")) {
      exec(
        `node scripts/extractTailwindClasses.js '${JSON.stringify(
          extractorConfig
        )}'`,
        (error) => {
          if (error) {
            console.error("Error running extractTailwindClasses:", error);
          } else {
            console.log("Tailwind classes extracted successfully.");
            server.ws.send({ type: "full-reload" });
          }
        }
      );
    }
  },
  buildStart() {
    return new Promise<void>((resolve, reject) => {
      exec(
        `node scripts/extractTailwindClasses.js '${JSON.stringify(
          extractorConfig
        )}'`,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  },
});

export default defineConfig({
  plugins: [
    extractTailwindClasses(),
    react({
      jsxRuntime: "automatic",
      jsxImportSource: "react",
    }),
    tailwindcss(),
    nodePolyfills({
      include: ["process"],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
