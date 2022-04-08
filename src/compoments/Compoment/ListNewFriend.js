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

  return (
    <>
      <Grid item xs={6} className={classes.itemFriend}>
        <Paper elevation={8}>
          <ListItem alignItems="flex-start">
            <ListItemButton>
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="{userFollower.photoURL" />
              </ListItemIcon>
              <ListItemText primary={"userFollower.displayName"} />
            </ListItemButton>

            <ListItemButton>
              <AddIcon color="secondaryLight" className={classes.friendIcon} />
              <ListItemText primary="Follow" />
            </ListItemButton>
          </ListItem>
        </Paper>
      </Grid>
    </>
  );
}
