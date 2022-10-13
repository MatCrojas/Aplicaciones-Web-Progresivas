self.addEventListener('install', (event) => {
    console.log("Esta instalado :D");

    const respCache = caches.open('cache-v1').then((cache) => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/js/app.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js'
        ]);

    });

    const respCache2 = caches.open('cache-v2').then((cache) => {
        return cache.add('https://reqres.in/api/users?page=2');

    });

    event.waitUntil(respCache);
    event.waitUntil(respCache2);

})

//only cache
self.addEventListener('fetch', (event) => {

    if(!event.request.url.includes('https://reqres.in/api/users')){
        const respCache = caches.match(event.request);

        event.respondWith(respCache);
    }

});

