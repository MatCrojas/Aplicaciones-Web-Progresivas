const STATIC_CACHE_NAME = 'static-cache-v1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';
const DINAMIC_CACHE_NAME = 'dinamiccache-v1';

self.addEventListener('install', (event) => {
    console.log('SW instalado :D');

    const respCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica7/',
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica7/index.html',
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica7/manifest.json',
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica7/images/icons/android-launchericon-144-144.png'
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

self.addEventListener('fetch', (event) => {
        const respCache = caches.match(event.request);
        event.respondWith(respCache); 

})
