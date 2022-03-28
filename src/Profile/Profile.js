import React, { useEffect, useState } from "react";
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
import { db } from "../firebase";
const Input = styled("input")({
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
  const [dataPosts, setDataPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sx, ...other } = props;
  const classes = useStyles();
  useEffect(() => {
    setUser(userInfor);
  }, userInfor);
  useEffect(() => {
    (async () => {
      const postData = await db
        .collection("posts")
        .where("type", "==", "image")
        .limit(3)
        .get();

      if (postData) {
        let arr = [];
        postData.forEach((doc) => {
          // console.log(doc.data());
          arr.push(doc.data());
        });
        if (arr.length === 3) {
          setLoading(true);
        }
        setDataPosts(arr);
      }
    })();
  }, []);
  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      <Container className={classes.contai}>
        <Header />
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
              <img src={catanddog} />
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
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Thay đổi" />
              </ListItemButton>
            </div>
          </div>
          <div className="profile-content">
            <div className="profile-content-left">
              <div className="profile-content-img">
                <img src={user && user.photoURL ? user.photoURL : ""} />
                <label htmlFor="icon-button-file" className="profile-label">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <div className="profile-content-lable">
                <h3> {user && user.displayName ? user.displayName : ""}</h3>
                <AvatarGroup total={24}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
                Post
              </ListItemButton>
            </Button>

            <Button variant="outlined" className={classes.profileBtn}>
              <ListItemButton>
                <BookmarkAddedIcon />
                Save
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
          <Outlet context={user} />
          {/* <DetailProfile user={user}></DetailProfile> */}
        </Card>
      </Container>
    </div>
  );
}

export default Profile;
