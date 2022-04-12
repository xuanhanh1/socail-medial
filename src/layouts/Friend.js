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
import { login, count } from "../app/reudx/actions";
import EmailIcon from "@mui/icons-material/Email";
import { makeStyles } from "@mui/styles";
import ListFriend from "../compoments/Compoment/ListFriend";
import ListNewFriend from "../compoments/Compoment/ListNewFriend";
import { db } from "../firebase";
import { compareFollowerId } from "../compoments/FunCompoments/Function";
import Test from "../compoments/Compoment/test";

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
  const userInform = useSelector((state) => state.userInfor);
  const [user, setUser] = useState();
  const [allUsers, setAllUsers] = useState();
  const [isChanged, setIsChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("user is not change ", user);
    if (userInform) {
      setUser(userInform);
      getAllUsers(userInform);
    } else {
      getAllUsers();
    }
  }, [userInform, isChanged]);

  const getAllUsers = (user) => {
    let arr = [];
    if (user && user.follower) {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            let compareFollow = compareFollowerId(
              user.follower,
              doc.data().uid
            );
            if (user.uid == doc.data().uid || compareFollow.result) {
              console.log();
            } else {
              arr.push(doc.data());
            }
          });
          setAllUsers(arr);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
          setAllUsers(arr);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      console.log("not have user");
    }
  };

  const handleUnFollow = (id) => {
    let index = compareFollowerId(user.follower, id).index;

    if (user.follower) {
      const arrNewFollowers = user.follower.splice(index, 1);
      var users = db.collection("users").doc(user.uid);
      return users
        .update({
          follower: user.follower,
        })
        .then(() => {
          dispatch(login(user));
          setIsChanged(!isChanged);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  };

  const handleFollow = () => {
    setIsChanged(!isChanged);
  };
  return (
    <Box
      sx={{
        marginBottom: "10px",
        height: "100vh",
      }}
    >
      <div>{count}</div>
      <div className="friend-header">
        <h1>Follower</h1>
      </div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className={classes.listFriend}
      >
        {user && user.follower && user.follower.length > 0
          ? user.follower.map((follow, index) => {
              return (
                <>
                  <ListFriend
                    key={index}
                    index={index}
                    userFollow={follow}
                    ParentHandleUnFollower={handleUnFollow}
                  />
                </>
              );
            })
          : null}
      </Grid>
      <Divider />

      <div className="friend-header">
        <h1> Suggest Follower </h1>
      </div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className={classes.listFriend}
      >
        {allUsers
          ? allUsers.map((userFollow, i) => {
              return (
                <ListNewFriend
                  key={i}
                  user={user}
                  userFollow={userFollow}
                  ParentHandleFollow={handleFollow}
                />
              );
            })
          : null}
      </Grid>
    </Box>
  );
}

export default Friend;
