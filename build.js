import esbuild from "esbuild";

const meta = `// ==UserScript==
// @name         Ballcrack
// @namespace    *://miniblox.io/*
// @version      1.0.0
// @author       Wang
// @description  We do a little thugging
// @match        *://miniblox.io/*
// @grant        none
// ==/UserScript==
`

const common = {
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: true,
  loader: { ".css": "text" }
};

async function run(watch = false) {
  const normal = await esbuild.context({
    ...common,
    outfile: "dist/ballcrack.js"
  });

  const user = await esbuild.context({
    ...common,
    format: "iife",
    platform: "browser",
    banner: { js: meta },
    outfile: "dist/ballcrack.user.js"
  });

  if (watch) {
    await normal.watch();
    await user.watch();
  } else {
    await normal.rebuild();
    await user.rebuild();
    await normal.dispose();
    await user.dispose();
  }
}

const watch = process.argv.includes("--watch");
run(watch);