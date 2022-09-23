self.addEventListener('install', (event) => {
    console.log("SW: Instalado...");
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Instalaciones finalizadas");
            resolve("ok");
        }, 3000);
    })
    event.waitUntil(myPromise);

})

self.addEventListener('activate', (event) => {
    console.log('SW: Activando...');
})

self.addEventListener('fetch', (ev) => {
    //Esto indica los recursos que fueron mandados para la vista html
    console.log(ev.request.url);

    //Se verifica si existe un archivo con ese nombre
    if (ev.request.url.includes('imagen2.jpg')) {
        //Cambias el recurso enviado en la ruta por uno nuevo, en esta caso imagen
        let response = fetch('./images/imagen.jpg');

        //Envia a la pagina la ruta con el recurso modificado
        ev.respondWith(response)
    }

    /*
    //forma de verificar el fetch antes de hacer una accion
    fetch(event.request.url).then((resp)=>{
        console.log(resp);
        if(resp.ok){
            event.respondWith(resp);
        }else{
            const generic = fetch('./images/images2.jpg');
            event.respondWith(generic);
        }
    }).catch((err)=>{
        console.log("SW: err"+err);
    })
*/

    if (ev.request.url.includes('style.css')) {
        const respuesta = new Response(
            `body{
                    color: red;
                    background-color:#134976;
                }`
            , {
                headers: {
                    'Content-Type': 'text/css'
                }
            }

        )
        ev.respondWith(respuesta)
    }
})