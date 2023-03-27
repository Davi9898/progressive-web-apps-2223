const CACHE_VERSION = "v2";
const CACHE_FILES = ["/styles.css", "/script.js"];

self.addEventListener("install", (event) => {
  console.log("Installing service worker");

  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      //update service worker if possible to newest version
      return cache.addAll(CACHE_FILES).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activating service worker");
  // event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch event: ", event.request.url);
  if (isCoreGetRequest(event.request)) {
    console.log("Core get request: ", event.request.url);
    //get css and js files
    event.respondWith(
      caches.open(CACHE_VERSION).then((cache) => cache.match(event.request.url))
    );
  } else if (isHtmlGetRequest(event.request)) {
    console.log("html get request", event.request.url);
    // get html files if not show offline page
    event.respondWith(
      caches
        .open("html-cache")
        .then((cache) => cache.match(event.request.url))
        .then((response) =>
          response ? response : fetchAndCache(event.request, "html-cache")
        )
        .catch((e) => {
          return caches
            .open(CACHE_VERSION)
            .then((cache) => cache.match("/offline"));
        })
    );
  }
});

const fetchAndCache = (request, cacheName) => {
  return fetch(request).then((response) => {
    if (!response.ok) {
      throw new TypeError("Bad response status");
    }

    const clone = response.clone();
    caches.open(cacheName).then((cache) => cache.put(request, clone));
    return response;
  });
};

const isHtmlGetRequest = (request) => {
  return (
    request.method === "GET" &&
    request.headers.get("accept") !== null &&
    request.headers.get("accept").includes("text/html")
  );
};

const isCoreGetRequest = (request) => {
  // return files defined in CACHE_FILES
  return (
    request.method === "GET" && CACHE_FILES.includes(getPathName(request.url))
  );
};

const getPathName = (requestUrl) => {
  const url = new URL(requestUrl);
  return url.pathname;
};