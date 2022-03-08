import React, { useState, useEffect } from "react";
import './App.scss';
import Router from './route';
import firebase from 'firebase'
import { db, auth, provider } from "./firebase";
export const userLogin = React.createContext();
export default function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        var uid = user.uid;
        var docRef = db.collection("users").doc(uid);
        docRef.get().then((doc) => {
          if (doc.exists) {
            setUser(doc.data());
            // console.log('user  ', doc.data())
          } else {
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      } else {
        // User is signed out
        // ...
      }
    });
  }, [])



  return (
    <>
      <userLogin.Provider value={user}>
        <Router />
      </userLogin.Provider>
    </>
  )
}

