# Kunstzoeker 

![headerreadme](https://user-images.githubusercontent.com/76910947/229766352-70e8c33f-a8ec-45ec-b71a-9da6c5599bac.png)

## Inleiding
Voor dit vak zijn we bezig gegaan om onze Single page application om te bouwen naar een progressive web app. Dit hebben we gedaan om te leren over moderne webtechnologieën. Een progessive web app kan sneller en beter zijn voor gebruikers. Ook kunnen PWA's offline worden gebruikt en zelf geïnstalleerd worden op je device. Een PWA biedt dus functies als: offline caching, push-notificaties en toegang hardware functies van je apparaat. Je zou kunnen zeggen dat dit een wat meer geadvanceerdere versie is van een SPA. Goed voor ons om mee aan de slag te gaan.

https://progressive-web-apps-2223-davi9898.onrender.com/kunstobject/SK-C-251


# Table of contents
1. [Omschrijving](#introduction)
2. [Features](#paragraph1)
    1. [Github Pages](#subparagraph1)
3. [Install](#paragraph2)
    1. [Sections](#subparagraph2)
4. [Activity Diagram](#paragraph3)
5. [Logbook](#paragraph4)
    1. [Week 1](#week1)
    2. [Week 2](#week2)
    3. [Week 3](#week3)
    4. [Week 4](#week4)
6. [Functions](#paragraph5)
7. [Checklist](#paragraph6)

<!-- ☝️ replace this description with a description of your own work -->
## Omschrijving <a name="introduction"></a>
De kunstzoeker is een progressive web app waarin er gezocht kan worden naar verschillende kunstobjecten doormiddel van een search query. Ook kan er worden geklikt op een kunstobject zodat er een detail pagina te voor weergegeven wordt. Hier kan de gebruiker meer informatie over het kunstobject op doen. Ook worden er core_assets opgeslagen in de cache zodat er altijd CSS, JS en een offline page geserved kunnen worden aan de gebruiker, ook als hij/zij offline is. Ook cached hij eerder bezochte pagina's waardoor deze later weer bezocht kunnen worden. Een downside is dat de images die worden niet gecached omdat deze middels een API worden ingeladen. 

## Client side vs Server side
Ik heb voor deze app enkel server side rendering gebruikt. Wanneer een app server side rendering gebruikt wordt alle dynamische content op de server gerenderd. Dit kan vervolgens als html naar de client gestuurd worden. SSR kan de gebruikerservaring verbeteren door de snelheid van de pagina's te verbeteren. Ook kan het voor oudere apparaten voordelig werken omdat de content al gerenderd is op de server en dus niet client side gebeurt.

Er zijn twee belangrijke metrics die gebruikt woredn om dew laadsnelheid van een pagina te meten:
* FCP(First Contentful Paint): Verwijst naar het moment waarop het eerste stukje inhoud van een webpagina wordt gerenderd en weergegeven aan de gebruiker, zoals tekst, afbeeldingen of video. Dit geeft een indicatie wanneer de pagina als bruikbaar wordt beschouwd.
* LCP(Largest Contentful Paint): Verwijst naar het moment waarop het grootste stukje inhoud van een webpagina wordt gerenderd en weergegeven aan de gebruiker, zoals een afbeelding of een video. Dit geeft een indicatie wanneer de pagina als visueel stabiel wordt beschouwd.

Bij SSR wordt de HTML-inhoud van de pagina al gerenderd op de server voordat deze wordt verzonden naar de browser. Dit betekent dat de browser snel de HTML kan ontvangen en parseren, wat resulteert in een snellere FCP. Bovendien betekent het dat de browser de volledige inhoud van de pagina kan renderen voordat deze aan de gebruiker wordt getoond, waardoor de kans op onstabiele LCP's kleiner wordt. 

Aan de andere kant moet bij CSR de browser de pagina-inhoud dynamisch genereren aan de clientzijde, wat kan leiden tot vertragingen in de laadtijd en FCP. Bovendien kan het zijn dat de LCP nog niet is weergegeven op het moment dat de pagina al als bruikbaar wordt beschouwd, waardoor de gebruikerservaring minder prettig kan zijn.

In het algemeen is SSR beter voor de prestaties van FCP en LCP, omdat het de laadtijd van de pagina verkort en ervoor zorgt dat de inhoud van de pagina volledig wordt gerenderd voordat deze aan de gebruiker wordt getoond.

<!-- ...and an activity diagram including the Service Worker 📈 -->
## Activity Diagram
![Frame 4 (4)](https://user-images.githubusercontent.com/76910947/229812131-855d2775-3635-4aa3-946c-2a1d9826f2bb.png)


<!-- This would be a good place for a list of enhancements to optimize the critical render path implemented your app  -->
## Critical Rendering Path

### Compression
De npm package 'compression' is een package voor het comprimeren van HTTP responses in Node.js. Het kan worden gebruikt als middleware in Express.js en andere Node.js frameworks om de grootte van de HTTP response te verminderen en de laadtijd van webpagina's te verkorten.
```js
app.use(compression())
```
Je zou eventueel nog filters kunnen toevoegen maar dat is niet nodig.

### Minify doormiddel van Webpack/laravel Mix
Minificatie is het proces van kleiner maken van code zodat deze sneller en efficiënter kunnen worden geladen. Ik richt het op CSS / JavaScript / Serviceworker. De webapplicatie kan dus sneller geladen worden en betere prestaties leveren.

```js
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
```
Wanneer de volgende commands gedaan worden:
Transpiling:
```
npx mix watch
```
Minify:
```
npm run prod
```

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->
## Sources
https://medium.com/@daveshreenu/the-benefits-of-server-side-rendering-over-client-side-rendering-5d55a435ff1d"
https://blog.cloudflare.com/client-side-vs-server-side-rendering-why-its-not-all-black-and-white/
https://web.dev/lcp/"
https://web.dev/first-contentful-paint/

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- How about a license here? When in doubt use GNU GPL v3. 📜  -->
