  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCTdO4TahP1J_AnXdF8q1lEs5aATVQftJk",
    authDomain: "b-pwa-38d11.firebaseapp.com",
    projectId: "b-pwa-38d11",
    storageBucket: "b-pwa-38d11.appspot.com",
    messagingSenderId: "242639044217",
    appId: "1:242639044217:web:352d556207e52ce44e1ea8"
  };
  
  const app = initializeApp(firebaseConfig);

  export { app }