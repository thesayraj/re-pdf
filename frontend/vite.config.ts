import { defineConfig, normalizePath } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";
import path from "node:path";
import { createRequire } from "node:module";
import { viteStaticCopy } from "vite-plugin-static-copy";

const require = createRequire(import.meta.url);

const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, "cmaps"));
const wasmDir = normalizePath(path.join(pdfjsDistPath, "wasm"));
const standardFontsDir = normalizePath(
  path.join(
    path.dirname(require.resolve("pdfjs-dist/package.json")),
    "standard_fonts"
  )
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    viteStaticCopy({
      targets: [
        {
          src: cMapsDir,
          dest: "",
        },
        {
          src: wasmDir,
          dest: "",
        },
        {
          src: standardFontsDir,
          dest: "",
        },
      ],
    }),
  ],
  server: {
    host: true, // or use '0.0.0.0'
    port: 5173,
  },
});
