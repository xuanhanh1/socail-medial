
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAqm3QCTEOha2-k19vldUNyQaq6JCBEVYo",
    authDomain: "apps-3d711.firebaseapp.com",
    projectId: "apps-3d711",
    storageBucket: "apps-3d711.appspot.com",
    messagingSenderId: "5990866184",
    appId: "1:5990866184:web:8c5bfda522a28f537460bd",
    measurementId: "G-3L2Q811TP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);