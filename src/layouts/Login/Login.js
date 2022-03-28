import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import "./Login.scss";
import LoginImg from "../../image/war.png";
import { Navigate } from "react-router-dom";
import { db, auth, provider } from "../../firebase";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { login } from "../../app/reudx/actions";
import { useCookies } from "react-cookie";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Great war dog cat
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [checkUser, setCheckUser] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const [remember, setRemember] = useState(true);
  const handleCookie = (user) => {
    setCookie("user", user, {
      path: "/",
    });
  };
  const handleChangeInnput = (event) => {
    // console.log("remember me , ", event.target);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeCheckbox = (event) => {
    setRemember(!remember);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(input.email, input.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if (remember) {
          handleCookie(user);
        }
        setCheckUser(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };
  const signUpGoogle = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        checkSignInWithGoogle(user);
        setCheckUser(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
  const checkSignInWithGoogle = (authUser) => {
    const docRef = db.collection("users").doc(authUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          docRef
            .set({
              email: authUser.email,
              phoneNumber: authUser.phoneNumber,
              displayName: authUser.displayName,
              photoURL: authUser.photoURL,
              uid: authUser.uid,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              console.log("Updated");
            });
        }
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };

  if (checkUser) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginImg})`,
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  handleChangeInnput(event);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  handleChangeInnput(event);
                }}
              />
              <div className="reg-err">
                <span>{error ? error : ""}</span>
              </div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                onClick={(event) => {
                  handleChangeCheckbox(event);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <div className="LoginFb">
              <Typography component="h2" variant="h5" sx={{ mt: 5 }}>
                Login with Facebook or Google
                <div className="loginFb-icon">
                  <FacebookOutlinedIcon
                    sx={{
                      fontSize: "50px",
                      fontWeight: "bold",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  />
                  <GoogleIcon
                    sx={{
                      fontSize: "50px",
                      fontWeight: "bold",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={signUpGoogle}
                  />
                </div>
              </Typography>
            </div>
          </Box>

          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
