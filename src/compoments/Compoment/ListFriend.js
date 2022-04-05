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
  const { followerId, ParentHandleUnFollower } = props;
  const [userFollower, setUserFollower] = useState();
  useEffect(() => {
    (async () => {
      if (followerId) {
        const userData = await db.collection("users").doc(followerId);
        userData
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserFollower(doc.data());
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document in friend list!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    })();
  }, [followerId]);

  const handleUnFollower = () => {
    ParentHandleUnFollower(userFollower.uid);
  };

  return (
    <>
      <Grid item xs={6} className={classes.itemFriend}>
        {userFollower ? (
          <Paper sx={{ mb: "10px" }} elevation={4}>
            <ListItem alignItems="flex-start">
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src={userFollower.photoURL} />
                </ListItemIcon>
                <ListItemText primary={userFollower.displayName} />
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
              <ListItemButton onClick={handleUnFollower}>
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
