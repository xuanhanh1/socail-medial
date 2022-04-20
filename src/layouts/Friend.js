import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  count,
  getAllUserFollowed,
  suggestFollow,
} from "../app/reudx/actions";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useCookies } from "react-cookie";
import {
  Typography,
  Grid,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material/";
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
  const user = useSelector((state) => state.userInfor);
  const allUserFollowed = useSelector((state) => state.allUserFollowed);
  const allUserSuggestFollow = useSelector(
    (state) => state.allUserSuggestFollow
  );

  const [usersFollowed, setUsersFollowed] = useState(allUserFollowed);
  const [usersSuggestFollow, setUsersSuggestFollow] =
    useState(allUserSuggestFollow);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getAllUsers(user);
    }
  }, [user]);

  useEffect(() => {
    setUsersFollowed(allUserFollowed);
    setUsersSuggestFollow(allUserSuggestFollow);
  }, [allUserFollowed, allUserSuggestFollow]);

  const getAllUsers = (user) => {
    console.log("getAllUsers");
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
          dispatch(getAllUserFollowed(user.follower));
          dispatch(suggestFollow(arr));
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
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
        {usersFollowed && usersFollowed.length > 0
          ? usersFollowed.map((follow, index) => {
              return (
                <>
                  <ListFriend
                    key={index}
                    index={index}
                    userFollow={follow}
                    user={user}
                    // ParentHandleUnFollower={handleUnFollow}
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
        {usersSuggestFollow
          ? usersSuggestFollow.map((userFollow, i) => {
              return (
                <ListNewFriend
                  key={i}
                  user={user}
                  userFollow={userFollow}
                  // ParentHandleFollow={handleFollow}
                  index={i}
                />
              );
            })
          : null}
      </Grid>
    </Box>
  );
}

export default Friend;
