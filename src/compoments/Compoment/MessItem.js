import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
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
import CircleIcon from "@mui/icons-material/Circle";
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
    boxShadow: "1px 1px 1px 1px #a79d9d",
  },
  itemParent: {
    position: "relative ",
  },
  itemChildOnline: {
    position: "absolute",
    right: "14px",
    bottom: "0px",
    color: "#31a24c",
    boxShadow: " 2px 2px",
    border: "1px solid #fff",
    borderRadius: "100px",
    fontSize: "15px !important",
  },
  itemChildOffline: {
    position: "absolute",
    right: "14px",
    bottom: "0px",
    color: "gray",
    boxShadow: " 2px 2px",
    border: "1px solid #fff",
    borderRadius: "100px",
    fontSize: "15px !important",
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
  const {
    currentSocketId,
    contact,
    arrUsersOnline,
    userContact,
    conversation,
  } = props;
  console.log("user contact ", userContact);

  const [isOnline, setIsOnline] = useState(false);

  const [socketId, setSocketId] = useState();

  useEffect(() => {
    if (arrUsersOnline) {
      arrUsersOnline.forEach((obj) => {
        if (obj.idUser === userContact.contactId) {
          setIsOnline(true);

          setSocketId(obj.idSocket);
        }
      });
    }
  }, [arrUsersOnline]);

  const handleSelected = () => {
    currentSocketId(socketId, isOnline);
  };

  return (
    <>
      <ListItem
        component={NavLink}
        to={`/message/t/${userContact.contactId}`}
        button
        onClick={handleSelected}
      >
        <ListItem>
          <ListItemAvatar className={classes.itemParent}>
            <Avatar
              alt="Profile Picture"
              src={userContact ? userContact.contactPhotoURL : ""}
              className={classes.messItemAvatar}
            />
            <CircleIcon
              className={
                isOnline ? classes.itemChildOnline : classes.itemChildOffline
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={userContact ? userContact.contactName : ""}
            secondary={
              userContact.lastMessage ? userContact.lastMessage.text : ""
            }
          />

          <div className="time-item">
            {userContact &&
            userContact.updatedAt &&
            userContact.updatedAt.seconds
              ? moment.unix(userContact.updatedAt.seconds).format("LL")
              : ""}
          </div>
        </ListItem>
      </ListItem>
      <Divider />

      {/* </CustomScrollbars> */}
    </>
  );
}
