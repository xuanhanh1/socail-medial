import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { db, provider } from "../../firebase";
import { Navigate } from "react-router-dom";
import "./Login.scss";
import firebase from "firebase";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Great war dog cat
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [value, setValue] = React.useState("female");
  const [error, setError] = React.useState("");
  const [valida, setValida] = React.useState(true);
  const [checkUser, setCheckUser] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [allValues, setAllValues] = React.useState({
    firstName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleOnChangeInput = (event) => {
    setAllValues({ ...allValues, [event.target.name]: event.target.value });
    setError("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidation(allValues);
    if (valida === true) {
      addUser(allValues);
    }
  };
  const addUser = (data) => {
    let email = data.email;
    let password = data.password;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let gender = value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (data) => {
        var user = data.user;
        await db
          .collection("users")
          .doc(user.uid)
          .set({
            displayName: firstName + " " + lastName,
            email: email,
            gender: gender,
            uid: user.uid,
            photoURL: "",
            backGroundImage: "",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            console.log("User created ", user);
            signInWithEmail(email, password);
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        if (user !== null) {
          const uid = user.uid;
          var docRef = db.collection("users").doc(uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setUser(doc.data());
                console.log("user in header ", doc.data());
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        }
        setAllValues({
          firstName: "",
          firstName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleValidation = (allValues) => {
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //set empty
    if (!allValues.firstName) {
      setValida(false);
      setError("First name cannot be empty");
    } else if (!allValues.lastName) {
      setValida(false);
      setError("Last name cannot be empty");
    } else if (!allValues.email) {
      setValida(false);
      setError("Email cannot be empty");
    } else if (!allValues.password) {
      setValida(false);
      setError("Password cannot be empty");
    }
    //confirmPassword
    else if (allValues.password !== allValues.confirmPassword) {
      setError("Your password and confirmation password do not match");
    }
    //validate email
    else if (!filter.test(allValues.email)) {
      setValida(false);
      setError("is not email address. Please enter your email");
    } else {
      return setValida(true);
    }
  };
  const signUpGoogle = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log("user gg in reg", user);
        checkSignInWithGoogle(user);
        setCheckUser(true);
      })
      .catch((error) => {
        var errorCode = error.code;
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
  const signInWithEmail = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setCheckUser(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };
  if (checkUser) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={allValues.firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => handleOnChangeInput(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={allValues.lastName}
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => handleOnChangeInput(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={allValues.email}
                  name="email"
                  autoComplete="email"
                  onChange={(e) => handleOnChangeInput(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={allValues.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleOnChangeInput(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  value={allValues.confirmPassword}
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  onChange={(e) => handleOnChangeInput(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Grid>
              {error ? (
                <Grid item xs={12}>
                  <div className="reg-err">
                    <span>{error}</span>
                  </div>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
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
      </Container>
    </ThemeProvider>
  );
}
