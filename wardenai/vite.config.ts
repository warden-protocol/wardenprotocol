import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { nodePolyfills } from "vite-plugin-node-polyfills";
// import inject from "@rollup/plugin-inject";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
    plugins: [
        react(),
        // nodePolyfills({
        //     // To exclude specific polyfills, add them to this list.
        //     // exclude: [
        //     //     "fs", // Excludes the polyfill for `fs` and `node:fs`.
        //     // ],
        //     // Whether to polyfill specific globals.
        //     globals: {
        //         Buffer: true, // can also be 'build', 'dev', or false
        //         global: true,
        //         process: true,
        //     },
        //     // Whether to polyfill `node:` protocol imports.
        //     protocolImports: true,
        // }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: "globalThis",
            },
            // Enable esbuild polyfill plugins
            plugins: [
                // @ts-ignore
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
});
