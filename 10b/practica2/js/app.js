if(navigator.serviceWorker){
    console.log("Soportamos SW :D");
    //identificar si estoy en local o github
    navigator.serviceWorker.register('sw.js');
}else{
    console.log("No soportamos SW :c");
}