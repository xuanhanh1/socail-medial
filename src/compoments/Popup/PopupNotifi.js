import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import moment from "moment";
export default function PopupNotifi(props) {
  const { user, nameComment } = props;

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List
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
      <div className="popupnotifi-header">
        <h3 style={{ paddindLeft: "10px", textAlign: "center" }}>Thông báo </h3>
      </div>
      {nameComment && nameComment.length > 0
        ? nameComment.map((name, index) => {
            return (
              <>
                <Link to={`/trend/${name.postId}`}>
                  <ListItemButton selected={selectedIndex === 0} key={index}>
                    <ListItem alignItems="center">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={name.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={name.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              đã bình luận bài viết của bạn
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <div className="time-item">
                        {name.createdAt && name.createdAt.seconds
                          ? moment.unix(name.createdAt.seconds).format("MMM Do")
                          : ""}
                      </div>
                    </ListItem>
                  </ListItemButton>
                  <Divider />
                </Link>
              </>
            );
          })
        : null}
    </List>
  );
}
