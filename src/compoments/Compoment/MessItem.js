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
const useStyles = makeStyles({
  messItem: {
    overflow: "scroll",
    height: "60vh",
  },
  active: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
  const [isActive, setIsActive] = useState();
  const { conversations, onSelect } = props;
  const handleSeleted = (e) => {
    let currentValue = e.currentTarget.value;
    setIsActive(currentValue);
    const userInfor = conversations[currentValue];
    console.log(
      "🚀 ~ file: MessItem.js ~ line 50 ~ handleSeleted ~ userInfor",
      userInfor
    );
    onSelect(userInfor);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: "50px" }} className={classes.inbox}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ p: 2, pb: 0 }}
        >
          Inbox
        </Typography>
        <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
          <List sx={{ mb: 2 }} className={classes.messItem}>
            {conversations && conversations.length > 0
              ? conversations.map((conversation, i) => {
                  return (
                    <React.Fragment key={i}>
                      <ListItem
                        disablePadding
                        onClick={(e) => {
                          handleSeleted(e);
                        }}
                        value={i}
                        className={isActive === i ? classes.active : ""}
                      >
                        <ListItem button>
                          <ListItemAvatar>
                            <Avatar
                              alt="Profile Picture"
                              src={conversation.photoURL}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={conversation.user_Name}
                            secondary="abc"
                          />
                        </ListItem>
                      </ListItem>
                    </React.Fragment>
                  );
                })
              : null}
          </List>
        </CustomScrollbars>
      </Paper>
    </React.Fragment>
  );
}
