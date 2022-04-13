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

export default function ListFriend(props) {
  const classes = useStyles();
  const { userFollow, ParentHandleUnFollower, index, user } = props;
  const allUserSuggestFollow = useSelector(
    (state) => state.allUserSuggestFollow
  );
  const allUserFollowed = useSelector((state) => state.allUserFollowed);

  const dispatch = useDispatch();

  const handleUnFollow = () => {
    if (allUserFollowed.length > 0) {
      const arrNewFollowers = allUserFollowed.splice(index, 1);
      allUserFollowed.filter((user) => user.uid === arrNewFollowers.uid);
      const arrSuggestFollow = allUserSuggestFollow.concat(arrNewFollowers);

      user.follower = allUserFollowed;

      var users = db.collection("users").doc(user.uid);
      return users
        .update({
          follower: allUserFollowed,
        })
        .then(() => {
          dispatch(login(user));
          dispatch(getAllUserFollowed(allUserFollowed));
          dispatch(suggestFollow(arrSuggestFollow));
          console.log("update cusses");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  };
  return (
    <>
      <Grid item xs={6} className={classes.itemFriend}>
        {userFollow ? (
          <Paper sx={{ mb: "10px" }} elevation={4}>
            <ListItem alignItems="flex-start">
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src={userFollow.photoURL} />
                </ListItemIcon>
                <ListItemText primary={userFollow.displayName} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <MapsUgcIcon
                  color="secondaryLight"
                  className={classes.friendIcon}
                />
                <ListItemText primary="Nhắn tin" />
              </ListItemButton>
              <ListItemButton onClick={handleUnFollow}>
                <CancelIcon
                  color="secondaryDark"
                  className={classes.friendIcon}
                />
                <ListItemText primary="UnFollower" />
              </ListItemButton>
            </ListItem>
          </Paper>
        ) : null}
      </Grid>
    </>
  );
}
