import { initializeApp } from 'firebase/app';

    const firebaseConfig = {
        apiKey: "AIzaSyC--lx_4INrlN6rhFnOa6h3BnCeakGYpVo",
        authDomain: "boards-f9cc6.firebaseapp.com",
        projectId: "boards-f9cc6",
        storageBucket: "boards-f9cc6.appspot.com",
        messagingSenderId: "24430545291",
        appId: "1:24430545291:web:197b73e378bd8f0b03878e"
  };

const app = initializeApp(firebaseConfig);

export default app;