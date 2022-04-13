import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  count,
  getAllUserFollowed,
  suggestFollow,
} from "../../app/reudx/actions";
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
  const { user, userFollow, ParentHandleFollow, index } = props;
  const allUserSuggestFollow = useSelector(
    (state) => state.allUserSuggestFollow
  );
  const allUserFollowed = useSelector((state) => state.allUserFollowed);

  const dispatch = useDispatch();

  const handleFollow = () => {
    const arrNewFollowers = allUserSuggestFollow.splice(index, 1);
    console.log("handleFollow - arrNewFollowers", arrNewFollowers);
    allUserSuggestFollow.filter((user) => user.uid === arrNewFollowers.uid);
    // const arrNewUsersFollowed = allUserFollowed.concat(arrNewFollowers);
    const arrNewUsersFollowed = allUserFollowed.concat([
      {
        uid: arrNewFollowers[0].uid,
        photoURL: arrNewFollowers[0].photoURL,
        displayName: arrNewFollowers[0].displayName,
      },
    ]);

    console.log("allUserSuggestFollow", allUserSuggestFollow);
    console.log("allUserFollowed", arrNewUsersFollowed);

    user.follower = arrNewUsersFollowed;

    var users = db.collection("users").doc(user.uid);

    return users
      .update({
        follower: arrNewUsersFollowed,
      })
      .then(() => {
        console.log("follow success", user);
        dispatch(login(user));
        dispatch(getAllUserFollowed(arrNewUsersFollowed));
        dispatch(suggestFollow(allUserSuggestFollow));
        // toast.success("follow thành công ");
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
