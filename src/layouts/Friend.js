import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { useCookies } from "react-cookie";
import {
  Typography,
  Grid,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material/";
import { login } from "../app/reudx/actions";
import EmailIcon from "@mui/icons-material/Email";
import { makeStyles } from "@mui/styles";
import ListFriend from "../compoments/Compoment/ListFriend";
import ListNewFriend from "../compoments/Compoment/ListNewFriend";
import { db } from "../firebase";
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

function Friend() {
  const classes = useStyles();

  return (
    <Box
      sx={{
        marginBottom: "10px",
        height: "100vh",
      }}
    >
      <div className="friend-header">
        <h1>Danh sách bạn bè</h1>
      </div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className={classes.listFriend}
      >
        <ListFriend />
      </Grid>
      <Divider />

      <div className="friend-header">
        <h1>Thêm bạn mới </h1>
      </div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className={classes.listFriend}
      >
        <ListNewFriend />
      </Grid>
    </Box>
  );
}

export default Friend;
