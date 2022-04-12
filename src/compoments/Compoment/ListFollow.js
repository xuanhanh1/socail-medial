import React, { useEffect, useState, useContext } from "react";
import { ListItemIcon, Divider, ListIcon, IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Avatar from "@mui/material/Avatar";
import AddTaskTwoToneIcon from "@mui/icons-material/AddTaskTwoTone";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../app/reudx/actions";

const useStyles = makeStyles({
  "@media only screen and (max-width:1024px)": {},
  active: {
    backgroundColor: "#77BDD9",
  },
});
function ListFollow(props) {
  const classes = useStyles();
  const [isActive, setIsActive] = useState();
  const { userFollow, user, ParentHandleFollow } = props;
  const [isFollow, setIsFollow] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [show, setShow] = useState(false);
  let location = useLocation();
  const dispatch = useDispatch();

  const tabSelected = (e) => {
    let currentValue = e.currentTarget.value;
    setIsActive(currentValue);
  };

  useEffect(() => {
    if (location.pathname === "/friend") {
      setShow(true);
    }
  }, []);

  const handleFollow = () => {
    user.follower.push({
      uid: userFollow.uid,
      displayName: userFollow.displayName,
      photoURL: userFollow.photoURL,
    });
    console.log("user new", user);
    var users = db.collection("users").doc(user.uid);

    return users
      .update({
        follower: user.follower,
      })
      .then(() => {
        console.log("Document successfully updated!");
        dispatch(login(user));
        ParentHandleFollow();
        toast.success("follow thành công ");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  return (
    <List>
      <ListItem disablePadding>
        <Link to="profile">
          <ListItemButton>
            <ListItemIcon>
              <Avatar alt="Remy Sharp" src={userFollow.photoURL}></Avatar>
            </ListItemIcon>
            <ListItemText
              primary={userFollow.displayName}
              // secondary={isFollow ? "UnFollow" : "Follow"}
              secondary={"Follow"}
            />
          </ListItemButton>
        </Link>
        <div className="follow-icon">
          {/* {isFollow ? (
            <IconButton>
              <CancelIcon color="secondaryDark" />
            </IconButton>
          ) : (
            <IconButton>
              <AddTaskTwoToneIcon color="secondaryLight" />
            </IconButton>
          )} */}
          <IconButton onClick={handleFollow}>
            <AddTaskTwoToneIcon color="secondaryLight" />
          </IconButton>
        </div>
      </ListItem>
      <Divider />
      <Divider />
      <Divider />
    </List>
  );
}

export default ListFollow;
