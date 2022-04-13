import React, { useEffect, useState, useContext } from "react";
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
  const { currentContact, contact, index } = props;
  const [active, setActive] = useState();
  const [userContact, setUserContact] = useState();
  useEffect(() => {
    var docRef = db.collection("users").doc(contact);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.id, " ===>", doc.data());
          setUserContact(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleSelected = (e) => {
    e.preventDefault();
    console.log(e.target);
    setActive(!active);
    // console.log(e.target);
    currentContact(userContact);
  };

  return (
    <>
      {/* <CustomScrollbars style={{ height: "100vh", width: "100%" }}> */}
      <ListItem
        disablePadding
        className={active ? classes.active : ""}
        onClick={(e) => handleSelected(e)}
        value={index}
      >
        <ListItem button>
          <ListItemAvatar>
            <Avatar
              alt="Profile Picture"
              src={userContact ? userContact.photoURL : ""}
              className={classes.messItemAvatar}
              value={index}
            />
          </ListItemAvatar>
          <ListItemText
            primary={userContact ? userContact.displayName : ""}
            secondary="abc"
            value={index}
          />
        </ListItem>
      </ListItem>
      <Divider />

      {/* </CustomScrollbars> */}
    </>
  );
}
