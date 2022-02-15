import firebase from "firebase";



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCjA4cAbYa3XzcVQHl8W-MSqHnPEBNKRaY",
    authDomain: "social-media-4bb55.firebaseapp.com",
    projectId: "social-media-4bb55",
    storageBucket: "social-media-4bb55.appspot.com",
    messagingSenderId: "571714632751",
    appId: "1:571714632751:web:34d51a1332890cbf6c9ada",
    measurementId: "G-DESJ3FCX3B"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database()
export { db, auth, storage, provider, database };


