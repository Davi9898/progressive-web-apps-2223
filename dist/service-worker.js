/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/service-worker.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
var CORE_CACHE_NAME = 'cache-v2';
var RUNTIME_CACHE_NAME = 'runtime-cache';
var CORE_ASSETS = ['/offline', '/css/styles.css', '/js/script.js'];
self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CORE_CACHE_NAME).then(function (cache) {
    return cache.addAll(CORE_ASSETS);
  }).then(function () {
    return self.skipWaiting();
  }));
});
self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (cacheName !== CORE_CACHE_NAME && cacheName !== RUNTIME_CACHE_NAME) {
        return caches["delete"](cacheName);
      }
    }));
  }));
});
self.addEventListener('fetch', function (event) {
  var path = new URL(event.request.url).pathname;
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(caches.open(RUNTIME_CACHE_NAME).then(function (cache) {
      return cache.match(event.request);
    }).then(function (response) {
      return response || fetchAndCache(event.request);
    })["catch"](function () {
      return caches.open(CORE_CACHE_NAME).then(function (cache) {
        return cache.match('/offline');
      });
    }));
  } else if (CORE_ASSETS.includes(path)) {
    event.respondWith(caches.open(CORE_CACHE_NAME).then(function (cache) {
      return cache.match(path);
    }));
  }
});
function fetchAndCache(request) {
  return fetch(request).then(function (response) {
    var clone = response.clone();
    caches.open(RUNTIME_CACHE_NAME).then(function (cache) {
      return cache.put(request, clone);
    });
    return response;
  });
}
/******/ })()
;