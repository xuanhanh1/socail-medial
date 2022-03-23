import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import avataHome from "../../image/avata.png";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  listComment: {
    borderRadius: "15px",
    padding: "10px",
    background: "#f0f2f5",
  },
  "@media only screen and (max-width: 740px)": {
    comment: {
      marginLeft: "0 !important",
    },
  },
});
export default function Comment() {
  const classes = useStyles();
  const userInfor = useSelector((state) => state.userInfor);
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(userInfor);
  }, userInfor);
  return (
    <>
      <List
        sx={{ bgcolor: "background.paper", ml: 7 }}
        className={classes.comment}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            className={classes.listComment}
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {
                  " — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…"
                }
              </React.Fragment>
            }
          />
        </ListItem>
        <ul className="list-comment">
          <li>Thích</li>
          <li>September 14</li>
        </ul>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            className={classes.listComment}
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ul className="list-comment">
          <li>Thích</li>
          <li>November 14</li>
        </ul>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            className={classes.listComment}
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ul className="list-comment">
          <li>Thích</li>
          <li>September 14</li>
        </ul>
      </List>

      <div className="card-comment">
        <Avatar
          alt="Cindy Baker"
          src={user && user.photoURL ? user.photoURL : ""}
          sx={{
            display: "flex",
            width: "40px",
            height: "40px",
          }}
        />
        <TextField
          id="standard-basic"
          placeholder="Viết bình luận tại đây..."
          variant="standard"
          fullWidth
          width="65%"
          padding="50px"
        />

        <Stack direction="row" spacing={2}>
          <DriveFileMoveOutlinedIcon
            sx={{
              fontSize: "2rem",
            }}
            color="secondaryLight"
          />
          <SendOutlinedIcon
            color="secondaryLight"
            sx={{
              fontSize: "2rem",
            }}
          />
        </Stack>
      </div>
    </>
  );
}
