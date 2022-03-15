import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Router from './route';
import firebase from 'firebase'
import { db, auth, provider } from "./firebase";
import { login } from './app/reudx/actions'
import theme from './globalStyles/them/GlobalThem'
import { ThemeProvider } from '@mui/material/styles';
export default function App() {
  const [userRef, setUserRef] = useState()
  const [user, serUser] = useState()
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        var uid = user.uid;
        var docRef = db.collection("users").doc(uid);
        docRef.get().then((doc) => {
          if (doc.exists) {
            setUserRef(doc.data());
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
  dispatch(login(userRef));
  const userInfor = useSelector(state => state.userInfor)
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router userInfor={userInfor ? userInfor : ''} />
      </ThemeProvider>
    </>
  )
}

