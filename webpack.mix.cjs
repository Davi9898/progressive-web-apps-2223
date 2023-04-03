const fs = require("fs-extra");
const mix = require("laravel-mix");
const WatchExternalFilesPlugin = require("webpack-watch-external-files-plugin");

mix.setPublicPath("./dist");
mix.options({ manifest: false });

//Clean up the dist folder
let removeFolders = ["/dist/"];

removeFolders.forEach((folder) => {
  fs.rmSync(process.cwd() + folder, { recursive: true, force: true });
});

//---

//Add more entries as needed
mix.css("./src/css/styles.css", "dist/css");
mix.js("./src/js/script.js", "dist/js");

//--

//Trigger compile on every file change so they get copied from ./src to ./dist
mix.webpackConfig({
  plugins: [new WatchExternalFilesPlugin({ files: ["./src/**/*"] })],
});

mix.after((stats) => {
  //Bug in laravel-mix-copy-watched made me change to this solution
  fs.copy("./src/static",  "./dist", () => {});
});

