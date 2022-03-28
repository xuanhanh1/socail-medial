import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import Router from "./route";
import firebase from "firebase";
import { db, auth, provider } from "./firebase";
import { login } from "./app/reudx/actions";
import theme from "./globalStyles/them/GlobalThem";
import { ThemeProvider } from "@mui/material/styles";
import CustomScrollbars from "./compoments/Compoment/Scrollbar";
import { ToastContainer, toast } from "react-toastify";
import { withCookies, Cookies } from "react-cookie";
import { useCookies } from "react-cookie";
export default function App() {
  const [userRef, setUserRef] = useState();
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        var docRef = db.collection("users").doc(uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserRef(doc.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  useEffect(() => {
    let userCookie = cookies.user;

    if (userCookie) {
      var docRef = db.collection("users").doc(userCookie.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUser(doc.data());

            dispatch(login(user));
          } else {
            // console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      // console.log("k co cookies");
    }
  }, []);
  dispatch(login(userRef));

  return (
    <>
      <ThemeProvider theme={theme}>
        <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
          <Router
          // userInfor={userInfor ? userInfor : ''}
          />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CustomScrollbars>
      </ThemeProvider>
    </>
  );
}
