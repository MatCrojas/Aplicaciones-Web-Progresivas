const STATIC_CACHE_NAME = 'static-cache-v3';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';
const DINAMIC_CACHE_NAME = 'dinamiccache-v1';

const cleanCache = (cacheName, limitItems) => {
    caches.open(cacheName).then((cache) => {
        return cache.keys().then((keys) => {
            if (keys.length > limitItems) {
                cache.delete(keys[0]).then(cleanCache(cacheName, limitItems));
            }
        });
    });
};

self.addEventListener('install', (event) => {
    console.log('SW instalado :D');

    const respCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            '/',
            '/index.html',
            '/pages/offline.html',
            '/manifest.json',
            '/images/icons/android-launchericon-48-48.png',
            '/images/icons/android-launchericon-72-72.png',
            '/images/icons/android-launchericon-96-96.png',
            '/images/icons/android-launchericon-144-144.png',
            '/images/icons/android-launchericon-192-192.png',
            '/images/icons/android-launchericon-512-512.png',
            '/images/generic.jpg'
        ]);
    });

    const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2'

        ]);
    })

    event.waitUntil(Promise.all([respCache, respCacheInmutable]));

})

self.addEventListener('activate', (event) => {
   const promiseDelete = caches.keys().then(items => {
        items.forEach(cacheName => {
            if(cacheName != STATIC_CACHE_NAME && cacheName.includes('static')){
                return caches.delete(cacheName);
            }
        });
    })

    event.waitUntil(promiseDelete);
})

self.addEventListener('fetch', (event) => {
// It's Cache with network fallback
    const resp = caches.match(event.request).then((respCache) => {
        if (respCache) {
            return respCache;
        }
        return fetch(event.request).then((respWeb) => {
            caches.open(DINAMIC_CACHE_NAME).then((cache) => {
                cache.put(event.request, respWeb);
                cleanCache(DINAMIC_CACHE_NAME, 10);
            });
            return respWeb.clone();
        });
    }).catch(err => {
        if(event.request.headers.get('accept').includes('text/html')){
            return caches.match('/pages/offline.html');
        }

        if(event.request.headers.get('accept').includes('image/')){
            return caches.match('/images/generic.jpg');
        }
    })

    //const respCache = caches.match(event.request);
    event.respondWith(resp);

})