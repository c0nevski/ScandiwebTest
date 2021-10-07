const CACHE_NAME = "version-1";
const DYNAMIC_CACHE_NAME = "dynamic-version-1";
const OFFLINE_IMAGE = "/no-internet.png";
const urlsToCache = ["offline.html", OFFLINE_IMAGE];

const self = this;

// limit cache size helper func
// const limitCacheSize = (cacheName, size) => {
//     caches.open(cacheName).then(cache => {
//         cache.keys().then(keys => {
//             if(keys.length > size) {
//                 cache.delete(keys[0]).then(limitCacheSize(cacheName, size));
//             }
//         });
//     });
// }

// Install ServiceWorker
self.addEventListener("install", (event) => {
  console.log("SW has been INSTALLED.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("OPENED CACHE");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate ServiceWorker
self.addEventListener("activate", () => {
  caches.keys().then((keys) => {
    return Promise.all(
      keys
        .filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
        .map((key) => caches.delete(key))
    );
  });

  self.clients.claim();
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // Try the cache
    caches
      .match(event.request)
      .then(function (response) {
        // Fall back to network
        return response || fetch(event.request);
      })
      .catch(function () {
        // If both fail, show a generic fallback:
        return caches.match("offline.html");
        // if (event.request.url.indexOf(".html") > -1) {
        //   return caches.match("offline.html");
        // }
      })
  );
});
