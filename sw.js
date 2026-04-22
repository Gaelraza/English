const CACHE_NAME = 'english-learning-v1';

const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/design-tokens.css',
    '/css/layout.css',
    '/css/components.css',
    '/data/vocab-data.js',
    '/data/grammar-data.js',
    '/js/vocab-engine.js',
    '/js/grammar-engine.js',
    '/js/redaction-engine.js',
    '/js/ui-controller.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(function() {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(function(response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});
