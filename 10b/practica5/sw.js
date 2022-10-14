const STATIC_CACHE_NAME = 'static-cache-v1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';
const DINAMIC_CACHE_NAME = 'dinamiccache-v1';

const cleanCache = (cacheName, limitItem) => {
    caches.open(cacheName).then((cache) => {
        cache.keys().then((items) =>{
            console.log(items.length);

            if(items.length > limitItem){
                cache.delete(items[0]).then(()=>{
                    cleanCache(cacheName,limitItem)
                })
            }

        })
    })
    
}

self.addEventListener('install', (event) => {
    console.log("Esta instalado :D");

    const respCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica5/',
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica5/index.html',
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica5/css/style.css',
            'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica5/js/app.js',
        ]);

    });

    const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js'
        ]);
    })

    event.waitUntil(Promise.all([respCache, respCacheInmutable]));

})
/*
//only cache
self.addEventListener('fetch', (event) => {

    if(!event.request.url.includes('https://reqres.in/api/users')){
        const respCache = caches.match(event.request);

        event.respondWith(respCache);
    }

});
*/

//cache with network fallback
self.addEventListener('fetch', (event) => {

    resp = null;
    if(event.request.url.includes('reqres.in')){
        //Aplico el cache with network
        resp = caches.match(event.request).then((respCache)=>{
            if(respCache){
                return respCache
            }
            return fetch(event.request).then((respWeb)=>{
                caches.open(DINAMIC_CACHE_NAME).then((cacheDynamic)=>{
                    cacheDynamic.put(event.request, respWeb)
                    cleanCache(DINAMIC_CACHE_NAME,4)
                })
                return respWeb.clone();
            })
        })


    }else{
        //only cache

        resp = caches.match(event.request)
    }

    event.respondWith(resp);
});
