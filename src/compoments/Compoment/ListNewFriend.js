import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import {
  Typography,
  Grid,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material/";
import logoAvata from "../../image/avata.png";
import EmailIcon from "@mui/icons-material/Email";
import { makeStyles } from "@mui/styles";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login, count } from "../../app/reudx/actions";

const useStyles = makeStyles({
  friendIcon: {
    marginRight: 10,
  },
  "@media only screen and (max-width:740px)": {
    listFriend: {
      flexDirection: "column !important",
    },
    itemFriend: {
      maxWidth: "100% !important",
    },
  },
});

export default function ListNewFriend(props) {
  const classes = useStyles();
  const { user, userFollow, ParentHandleFollow } = props;
  const dispatch = useDispatch();

  const handleFollow = () => {
    ParentHandleFollow();

    user.follower.push({
      uid: userFollow.uid,
      displayName: userFollow.displayName,
      photoURL: userFollow.photoURL,
    });
    user.countFollower = user.follower.length + 1;
    var users = db.collection("users").doc(user.uid);

    return users
      .update({
        follower: user.follower,
      })
      .then(() => {
        console.log("Document successfully updated!");
        dispatch(login(user));
        toast.success("follow thành công ");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <>
      <Grid item xs={6} className={classes.itemFriend}>
        <Paper elevation={8}>
          <ListItem alignItems="flex-start">
            <ListItemButton>
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src={userFollow.photoURL} />
              </ListItemIcon>
              <ListItemText primary={userFollow.displayName} />
            </ListItemButton>

            <ListItemButton onClick={handleFollow}>
              <AddIcon color="secondaryLight" className={classes.friendIcon} />
              <ListItemText primary="Follow" />
            </ListItemButton>
          </ListItem>
        </Paper>
      </Grid>
    </>
  );
}
