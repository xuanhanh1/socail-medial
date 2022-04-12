import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/reudx/actions";
import { Card, Container, Button } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import catanddog from "../image/catanddog.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import Header from "../containers/Header/Header";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Outlet } from "react-router-dom";
import "./Profile.scss";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { db } from "../firebase";
import firebase from "firebase";
const input = styled("input")({
  display: "none",
});

const useStyles = makeStyles({
  profileBtn: {
    marginRight: "20px !important",
    fontSize: "14px !important",
  },
  profileIconImg: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  profile: {},
  "@media only screen and (max-width:740px)": {
    contai: {
      padding: "0 !important",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
});
function Profile(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = React.useState();
  const userInfor = useSelector((state) => state.userInfor);
  const [photoURL, setPhotoURL] = useState();
  const [bgURL, setBgURL] = useState();
  const [isChanged, setIsChanged] = useState(false);
  const { sx, ...other } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    setUser(userInfor);
    console.log("useEffect user infor", userInfor);
  }, [userInfor]);

  useEffect(() => {
    if (photoURL) {
      console.log("photoURL", photoURL);
      var userPhoto = db.collection("users").doc(user.uid);
      user.photoURL = photoURL;
      return userPhoto
        .update({
          photoURL: photoURL,
        })
        .then(() => {
          console.log("Document successfully updated!", user);
          dispatch(login(user));
          setIsChanged(!isChanged);
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
    if (bgURL) {
      console.log("background image", bgURL);
      var userPhoto = db.collection("users").doc(user.uid);
      user.backGroundImage = bgURL;
      return userPhoto
        .update({
          backGroundImage: bgURL ? bgURL : user.backGroundImage,
        })
        .then(() => {
          console.log("Document successfully updated!", user);
          dispatch(login(user));
          setIsChanged(!isChanged);
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }, [photoURL, bgURL]);

  const handleUpdateInform = async (event) => {
    // e.preventDefault();
    var file = event.target.files[0];
    var bgId = event.target.id;
    var isBackground = false;
    if (bgId === "icon-button-bg") {
      isBackground = true;
    }
    await onUpLoadComplete(file, isBackground);
  };

  const onUpLoadComplete = (file, isBackground) => {
    var uploadTask = firebase
      .storage()
      .ref()
      .child(`image/${file.name}`)
      .put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          console.log("is background, ", isBackground);
          if (isBackground == true) {
            setBgURL(downloadURL);
          } else {
            setPhotoURL(downloadURL);
          }
        });
      }
    );
  };

  console.log("background image", bgURL);
  console.log("photo image", photoURL);

  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      <Container className={classes.contai}>
        <Header user={user} />
        {user && user.uid ? (
          <Card
            sx={{
              ml: 2,
              mr: 2,
              alignItems: "center",
              mb: 5,
              mt: "50px",
              // height: '95vh'
            }}
            elevation={8}
          >
            <div className="profile-header">
              <div className="profile-header-img">
                <img
                  src={user && user.backGroundImage ? user.backGroundImage : ""}
                />
              </div>
              <div className="profile-header-icon">
                <ListItemButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    fontSize: "28px",
                    backgroundColor: "white",
                  }}
                >
                  <label>
                    <input
                      accept="image/*"
                      id="icon-button-bg"
                      type="file"
                      onChange={handleUpdateInform}
                    ></input>
                    <IconButton
                      for="icon-button-bg"
                      aria-label="upload picture"
                      component="span"
                    >
                      <SettingsIcon />
                    </IconButton>
                    <ListItemText primary="Thay đổi" />
                  </label>
                </ListItemButton>
              </div>
            </div>
            <div className="profile-content">
              <div className="profile-content-left">
                <div className="profile-content-img">
                  <img src={user && user.photoURL ? user.photoURL : ""} />
                  <label className="profile-label">
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={handleUpdateInform}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      for="icon-button-file"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
                <div className="profile-content-lable">
                  <h3> {user && user.displayName ? user.displayName : ""}</h3>
                  <AvatarGroup total={24}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src="/static/images/avatar/4.jpg"
                    />
                    <Avatar
                      alt="Trevor Henderson"
                      src="/static/images/avatar/5.jpg"
                    />
                  </AvatarGroup>
                </div>
              </div>
              <div className="profile-content-right">
                <Button variant="contained" sx={{ mr: 2 }}>
                  Contained
                </Button>
                <Button variant="contained">
                  <BorderColorTwoToneIcon />
                  Chỉnh sửa Profile
                </Button>
              </div>
            </div>
            <hr></hr>
            <div className="profile-action">
              <Button variant="outlined" className={classes.profileBtn}>
                <ListItemButton>
                  <PostAddIcon />
                  Dòng thời gian
                </ListItemButton>
              </Button>

              <Button variant="outlined" className={classes.profileBtn}>
                <ListItemButton>
                  <BookmarkAddedIcon />
                  Đã lưu
                </ListItemButton>
              </Button>

              <Button variant="outlined" className={classes.profileBtn}>
                <ListItemButton>
                  <ImportContactsRoundedIcon />
                  Giới thiệu
                </ListItemButton>
              </Button>
            </div>
            <hr></hr>
            {user && user.uid ? <Outlet context={user} /> : ""}

            {/* <DetailProfile user={user}></DetailProfile> */}
          </Card>
        ) : (
          toast.warning("chờ loading user ")
        )}
      </Container>
    </div>
  );
}

export default Profile;
