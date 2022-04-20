import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Container,
  Divider,
  Card,
  Typography,
  List,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MessItem from "../compoments/Compoment/MessItem";
import Header from "../containers/Header/Header";
import MessDetail from "../compoments/Compoment/MessDetail";
import { makeStyles } from "@mui/styles";
import { db, auth } from "../firebase";

import "./Layout.scss";
import CustomScrollbars from "../compoments/Compoment/Scrollbar";
import { getAllConversations } from "../app/reudx/actions";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const useStyles = makeStyles({
  messSearchInput: {
    backgroundColor: "#f0f2f5",
    borderRadius: "63px",
    width: "100%",
  },
  messSearchIcon: {
    zIndex: 100,
  },
  mobileMessItem: { display: "block" },
  "@media only screen and (max-width: 1024px)": {
    mess: {
      flexDirection: "column !important",
    },
    messDetail: {
      maxWidth: "100% !important",
    },
    mobileMessItem: { display: "none" },

    messDetailMobile: {
      display: "none",
    },
  },
});
export default function Messenger() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userInfor = useSelector((state) => state.userInfor);
  const conversations = useSelector((state) => state.conversations);
  const [user, setUser] = React.useState();
  const [userContacts, setUserContacts] = useState();
  const [currentContact, setCurrentContact] = useState();
  // console.log("Messenger - currentContact", currentContact);
  const [show, setShow] = useState(false);
  const [arrUsersOnline, setArrUsersOnline] = useState([]);
  const [socket, setSocket] = useState();
  const [newMsg, setNewMsg] = useState();

  useEffect(() => {
    setUser(userInfor);
  }, userInfor);

  useEffect(() => {
    if (user) {
      setUserContacts(conversations);
    }
  }, [conversations]);

  useEffect(() => {
    if (user) {
      const socket = io("localhost:6969");
      setSocket(socket);
      let data = { userLogin: user.uid };
      socket.emit("connect-success", data);

      socket.on("arr-connect", function (data) {
        console.log("data from socket ", data);
        setArrUsersOnline(data);
      });

      socket.on("send-msg", function (data) {
        let arrData = [];
        // console.log("--------> ", data);
        arrData.push(data);
        setNewMsg(arrData);
      });
      console.log("socket ", socket.connected);
    }
  }, [user]);

  useEffect(() => {
    let arrContact = [];
    try {
      if (user && user.uid && user.roomChat) {
        user.roomChat.forEach((chat) => {
          db.collection("chat")
            .where("roomId", "==", chat)
            .orderBy("updatedAt", "desc")
            .onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.data().users.forEach((id) => {
                  if (id !== user.uid) {
                    arrContact.push({
                      idContact: id,
                      roomId: doc.id,
                    });
                  }
                });
              });

              dispatch(getAllConversations(arrContact));
            });
        });
      }
    } catch (error) {
      console.log("error ", error);
    }
  }, [user]);

  const getCurrentContact = (userSelected) => {
    if (userSelected) {
      // console.log("getCurrentContact - userSelected", userSelected);
      setCurrentContact(userSelected);
    }
  };

  return (
    <div className="mess-body">
      <Header user={user} />
      <div style={{ backgroundColor: "#e2e8f0" }}>
        <Box
          sx={{
            flexGrow: 1,
            mt: 6,
            height: "100vh",
            backgroundColor: "#f0f2f5",
          }}
        >
          <Grid container spacing={2} className={classes.mess}>
            <Grid
              item
              xs={6}
              md={4}
              className={show ? classes.mobileMessItem : classes.messDetail}
            >
              <Card elevation={2} className={classes.bgCard}>
                <div className="mess-header">
                  <h2>Messagener</h2>
                  <Divider sx={{ mb: 2 }} />
                </div>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon
                      color="secondaryDark"
                      className={classes.messSearchIcon}
                    />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search in messages"
                    inputProps={{ "aria-label": "search" }}
                    className={classes.messSearchInput}
                  />
                </Search>
                <Paper square sx={{ pb: "50px" }} className={classes.inbox}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{ p: 2, pb: 0 }}
                  >
                    Inbox
                  </Typography>
                  <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                    <List sx={{ mb: 2 }} className={classes.messItem}>
                      {userContacts && userContacts.length > 0
                        ? userContacts.map((contact, index) => {
                            return (
                              <MessItem
                                contact={contact}
                                key={index}
                                currentContact={getCurrentContact}
                                arrUsersOnline={arrUsersOnline}
                              />
                            );
                          })
                        : null}
                    </List>
                  </CustomScrollbars>
                </Paper>
              </Card>
            </Grid>
            <Grid
              item
              xs={6}
              md={8}
              sx={{ position: "relative" }}
              className={classes.messDetail}
            >
              <Card elevation={4}>
                <MessDetail
                  userSelected={currentContact}
                  user={user}
                  socket={socket}
                  newMsg={newMsg}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
