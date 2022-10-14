const STATIC_CACHE_NAME = 'static-cache-v1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';
const DINAMIC_CACHE_NAME = 'dinamiccache-v1';

self.addEventListener('install', (event) => {
    const promCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        cache.addAll([
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica6/',
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica6/index.html',
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica6/js/app.js'
        ])
    })

    event.waitUntil(promCache);
})

//Primero intento ir siempre a web, sino a cache
self.addEventListener('fetch', (event) => {

    const resp = fetch(event.request).then((respWeb) => {

        //Para si existen errores tipo 404
        if (!respWeb.ok) {
            caches.match(event.request)
        }

        caches.open(DINAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, respWeb)
        })

        return respWeb.clone();

    }).catch(() => {
        //Responde con el cache si no hay acceso a internet
        return caches.match(event.request)
    })

    event.respondWith(resp);
})
