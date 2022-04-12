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
import { useDispatch } from "react-redux";
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
  const { userFollow, ParentHandleUnFollower, index } = props;
  const [userFollower, setUserFollower] = useState();

  const handleUnFollower = () => {
    ParentHandleUnFollower(userFollow.uid);
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
