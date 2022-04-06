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
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../app/reudx/actions";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  "@media only screen and (max-width:1024px)": {},
  active: {
    backgroundColor: "#77BDD9",
  },
});
function ListFollow(props) {
  const [user, setUser] = React.useState();
  const classes = useStyles();
  const [isActive, setIsActive] = useState();
  const { userFollow, userInform } = props;
  const [isFollow, setIsFollow] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const tabSelected = (e) => {
    let currentValue = e.currentTarget.value;
    setIsActive(currentValue);
  };
  const handleCookie = (user) => {
    setCookie("user", user, {
      path: "/",
    });
  };

  const handleAddFollow = () => {
    var followers = userInform.follower;
    followers.push(userFollow.uid); //
    // console.log(
    //   "🚀 ~ file: ListFollow.js ~ line 38 ~ handleAddFollow ~ followers",
    //   followers
    // );
    var users = db.collection("users").doc(userInform.uid);
    return users
      .update({
        follower: followers,
      })
      .then(() => {
        console.log("Document successfully updated!");

        db.collection("users")
          .doc(userInform.uid)
          .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
            dispatch(login(doc.data()));
            handleCookie(doc.data());
          });

        setIsFollow(true);
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
              secondary={"Follow"}
            />
          </ListItemButton>
        </Link>
        <div className="follow-icon" onClick={handleAddFollow}>
          {/* {isFollow ? (
            <IconButton>
              <CancelIcon color="secondaryDark" />
            </IconButton>
          ) : (
            
          )} */}
          <IconButton>
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
