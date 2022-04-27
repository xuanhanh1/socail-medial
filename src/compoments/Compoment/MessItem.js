import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import CustomScrollbars from "../Compoment/Scrollbar";
import { db } from "../../firebase";
import { Divider } from "@mui/material";
const useStyles = makeStyles({
  messItem: {
    overflowY: "auto",
    height: "60vh",
  },
  active: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    paddingLeft: "4px",
    marginBottom: "4px",
    marginTop: "4px",
    // color: "#262626",
    // backgroundColor: "#efefef",
    // "& $title": {
    //   fontWeight: 600,
    // },
  },
  messItemAvatar: {
    width: "60px !important",
    height: "60px !important",
    marginRight: "15px !important",
  },
  "@media only screen and (max-width:1024px)": {
    inbox: {
      // display: 'none'
    },
  },
});
const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function MessItem(props) {
  const classes = useStyles();
  const { currentSocketId, contact, arrUsersOnline, id, conversation } = props;
  console.log("MessItem - conversation", conversation);
  const [isOnline, setIsOnline] = useState(false);
  const [userContact, setUserContact] = useState();
  console.log("MessItem - userContact", userContact);
  const [socketId, setSocketId] = useState();
  // console.log("id contact ", id);

  useEffect(() => {
    if (id) {
      var docRef = db.collection("users").doc(id);
      docRef
        .get()
        .then((doc) => {
          // console.log(doc.data());
          setUserContact(doc.data());
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, []);

  useEffect(() => {
    if (arrUsersOnline) {
      arrUsersOnline.forEach((obj) => {
        if (obj.idUser === id) {
          setIsOnline(true);
          // console.log("set socket", obj.idSocket);
          // setUserContact((prevUserContact) => ({
          //   ...prevUserContact,
          //   idSocket: obj.idSocket,
          // }));
          setSocketId(obj.idSocket);
        }
      });
    }
  }, [arrUsersOnline]);

  const handleSelected = () => {
    // console.log("handleSelected - userContact", userContact);
    currentSocketId(socketId);
  };

  return (
    <>
      <ListItem
        component={NavLink}
        to={`/message/t/${id}`}
        button
        onClick={handleSelected}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar
              alt="Profile Picture"
              src={userContact ? userContact.photoURL : ""}
              className={classes.messItemAvatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={userContact ? userContact.displayName : ""}
            secondary={
              conversation.lastMessage ? conversation.lastMessage.text : ""
            }
          />
        </ListItem>
      </ListItem>
      <Divider />

      {/* </CustomScrollbars> */}
    </>
  );
}
