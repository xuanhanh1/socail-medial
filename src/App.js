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
  const userInform = useSelector((state) => state.userInfor);

  // useEffect(() => {
  //   console.log("useEffect - userInform", userInform);
  //   if (userInform) {
  //   }
  // }, [userInform]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
          <Router />
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
