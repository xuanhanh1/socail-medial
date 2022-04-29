import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import ListItemButton from "@mui/material/ListItemButton";
import { Divider } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { NavLink } from "react-router-dom";

import ListItem from "@mui/material/ListItem";

import { makeStyles } from "@mui/styles";
import moment from "moment";
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
export default function PopupMess(props) {
  const classes = useStyles();
  const { user } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [arrItemChat, setArrItemChat] = useState();
  let navigate = useNavigate();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate("/message");
  };

  useEffect(() => {
    try {
      db.collection("users")
        .doc(user.uid)
        .collection("messages")
        .orderBy("updatedAt", "desc")
        .onSnapshot((query) => {
          let arrItems = [];
          query.forEach((doc) => {
            arrItems.push(doc.data());
          });
          //   console.log("arr item chat", arrItemChat);
          setArrItemChat(arrItems);
        });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  console.log("arr item chat ", arrItemChat);
  return (
    <Box
      sx={{
        width: 360,
        maxWidth: 720,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: "80vh",
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      <List component="nav" aria-label="main mailbox folders">
        <div className="popupnotifi-header">
          <h3 style={{ paddindLeft: "10px", textAlign: "center" }}>
            Mesenger{" "}
          </h3>
        </div>
        {arrItemChat && arrItemChat.length > 0 ? (
          arrItemChat.map((item, index) => {
            return (
              <>
                <ListItem
                  component={NavLink}
                  to={`/message/t/${item.contactId}`}
                  button
                  //   onClick={handleSelected}
                >
                  <ListItem>
                    <ListItemAvatar className={classes.itemParent}>
                      <Avatar
                        alt="Profile Picture"
                        src={item.contactPhotoURL}
                        className={classes.messItemAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.contactName}
                      secondary={item.lastMessage ? item.lastMessage.text : ""}
                    />

                    <div className="time-item">
                      {item.updatedAt && item.updatedAt.seconds
                        ? moment.unix(item.updatedAt.seconds).format("LL")
                        : ""}
                    </div>
                  </ListItem>
                </ListItem>

                <Divider />
              </>
            );
          })
        ) : (
          <p>No messages</p>
        )}
      </List>
    </Box>
  );
}
