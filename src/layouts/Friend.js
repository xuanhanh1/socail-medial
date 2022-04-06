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
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(true);
  const userInform = useSelector((state) => state.userInfor);
  const [user, setUser] = useState();
  const [cookies, setCookie] = useCookies();
  const [followers, setFollowers] = useState([]);
  const [allUser, setAllUser] = useState();

  const handleCookie = (user) => {
    setCookie("user", user, {
      path: "/",
    });
  };

  useEffect(() => {
    setUser(userInform);
    // console.log("loading user use effect user inform ");
    if (userInform && userInform.follower) {
      setFollowers(userInform.follower);
      // console.log("set user follower by user inform");
    }
  }, [userInform]);

  useEffect(() => {
    // console.log("loading user from user cookies ");
    db.collection("users")
      .doc(cookies.user.uid)
      .onSnapshot((doc) => {
        // console.log("Current data: ", doc.data());
        setUser(doc.data());
        dispatch(login(doc.data()));
      });
    // var docRef = db.collection("users").doc(cookies.user.uid);

    // docRef
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       setUser(doc.data());
    //       dispatch(login(doc.data()));
    //     } else {
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error getting document:", error);
    //   });
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [followers]);

  const handleUnFollower = (id) => {
    if (followers) {
      const newFollowers = followers.filter((follower) => follower !== id);
      setFollowers(newFollowers);

      var users = db.collection("users").doc(user.uid);
      return users
        .update({
          follower: newFollowers,
        })
        .then(() => {
          console.log("Document successfully updated!");
          db.collection("users")
            .doc(user.uid)
            .onSnapshot((doc) => {
              console.log("Current data: ", doc.data());
              dispatch(login(doc.data()));
              handleCookie(doc.data());
            });
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  };

  const getAllUsers = async () => {
    var arr = [];
    await db
      .collection("users")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          if (followers) {
            if (
              followers.includes(doc.data().uid) ||
              user.uid == doc.data().uid
            ) {
              console.log("doc. data trung voi user follower");
            } else {
              arr.push(doc.data());
            }
          }
        });
      })
      .catch((error) => {
        console.log("err", error);
      });
    setAllUser(arr);
  };

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
        {followers
          ? followers.map((follower, index) => {
              return (
                <ListFriend
                  followerId={follower}
                  key={index}
                  ParentHandleUnFollower={handleUnFollower}
                />
              );
            })
          : null}
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
        {allUser && allUser.length > 0
          ? allUser.map((u) => (
              <ListNewFriend
                userFollower={u}
                userId={user ? user.uid : null}
                followers={followers}
              />
            ))
          : null}
      </Grid>
    </Box>
  );
}

export default Friend;
