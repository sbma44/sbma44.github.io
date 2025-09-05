const CACHE_NAME = 'civil-war-century-v1';

// Get the base path from the current script location
const scriptURL = new URL(self.location);
const basePath = scriptURL.pathname.substring(0, scriptURL.pathname.lastIndexOf('/') + 1);

const urlsToCache = [
  basePath,
  `${basePath}index.html`,
  'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css',
  'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // For Mapbox tiles and API requests, use network first, cache second
        if (event.request.url.includes('mapbox.com')) {
          return fetch(event.request).then((response) => {
            // Don't cache API responses that might be dynamic
            if (event.request.url.includes('/tiles/') || 
                event.request.url.includes('/fonts/') ||
                event.request.url.includes('/sprites/')) {
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            
            return response;
          }).catch(() => {
            // If network fails, try to return cached version
            return caches.match(event.request);
          });
        }
        
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
