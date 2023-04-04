// File system methods extra
const fs = require("fs-extra");
// Build tool dat het proces van compilen versimpelt
const mix = require("laravel-mix");
// plugin voor webpack zorgt dat er gewatched kan worden naar files buiten het main build process
const WatchExternalFilesPlugin = require("webpack-watch-external-files-plugin");

// Output directory voor het build process
mix.setPublicPath("./dist");
// Configuring het build process en geen manifest te genereren
mix.options({ manifest: false });

//Clean up the dist folder
let removeFolders = ["/dist/"];

// Loop door de array om de folders te verwijderen. 
// rmSync is een method van fs-extra om files en folder synchroon te verwijderen
// process.cwd returned the huidige werkende directory welke gebruikt wordt om het path naar de folder te deleten
removeFolders.forEach((folder) => {
  fs.rmSync(process.cwd() + folder, { recursive: true, force: true });
});

//---

//Add more entries as needed
mix.css("./src/css/styles.css", "dist/css");
mix.js("./src/js/script.js", "dist/js");
mix.js("./src/service-worker.js", "dist/");

//--

//Trigger compile on every file change so they get copied from ./src to ./dist
mix.webpackConfig({
  plugins: [new WatchExternalFilesPlugin({ files: ["./src/**/*"] })],
});

//Call back functie om executed te worden nadat het build process complete
// fs-extra wordt gebruikt om alles files te copyen naar de output directory
mix.after((stats) => {
  //Bug in laravel-mix-copy-watched made me change to this solution
  fs.copy("./src/static",  "./dist", () => {});
});

