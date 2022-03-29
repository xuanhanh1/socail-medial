import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Home from "../containers/HomePage/Home/Home";
import { makeStyles } from "@mui/styles";
import File from "./Detail/File";
import { db } from "../firebase";
const useStyles = makeStyles({
  mobileProfileItem: {
    display: "none !important",
  },
  homeBtnAction: {
    justifyContent: "space-around",
  },
  detailProfile: {
    paddingLeft: "40px !important",
    paddingRight: "10px",
  },
  "@media only screen and (max-width: 1024px)": {
    profileItem: {
      display: "none !important",
    },
    mobileProfileItem: {
      display: "block !important",
      width: "100% ",
      marginTop: "20px",
    },
  },
});
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DetailProfile(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const user = useOutletContext();
  const classes = useStyles();
  const [dataPosts, setDataPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    console.log("user in detail profile", user);
    (async () => {
      try {
        if (user.uid != undefined) {
          const postData = await db
            .collection("posts")
            .where("user_id", "==", user.uid)
            .limit(3)
            .get();

          if (postData) {
            let arr = [];
            postData.forEach((doc) => {
              // console.log(doc.data());
              arr.push(doc.data());
            });
            console.log("mang ", arr);
            if (arr.length === 3) {
              setLoading(true);
            }
            setDataPosts(arr);
          }
        }
      } catch (error) {
        console.log("try catch", error);
      }
    })();
  }, [user]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} className={classes.profileItem}>
          <Grid item xs>
            <Card
              // sx={{  , bgcolor: "background.paper" }}
              sx={{
                ml: 2,
                mr: 2,
                alignItems: "center",
                mb: 5,
                maxWidth: 360,
                width: "100%",
              }}
              elevation={4}
            >
              <div className="detail-header">
                <span style={{ paddindLeft: "10px", textAlign: "center" }}>
                  Giới thiệu
                </span>
              </div>
              <hr></hr>

              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <ApartmentSharpIcon color="backgroundColorDark" />
                  </ListItemIcon>
                  <ListItemText primary="Phú Hòa, Phú Yên" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemIcon>
                    <WorkIcon color="backgroundColorDark" />
                  </ListItemIcon>
                  <ListItemText primary="133 Tân Cảng, Bình Thạnh" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleListItemClick(event, 4)}
                >
                  <ListItemIcon>
                    <SchoolIcon color="backgroundColorDark" />
                  </ListItemIcon>
                  <ListItemText primary="Đh Công Nghệ Thông Tin" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemIcon>
                    <SportsEsportsIcon color="backgroundColorDark" />
                  </ListItemIcon>
                  <ListItemText primary="Chơi game, nuôi chó" />
                </ListItemButton>
              </List>
            </Card>
          </Grid>
          <Grid item xs={9} className={classes.detailProfile}>
            {dataPosts &&
              dataPosts.map((data, index) => {
                return (
                  <File
                    post={data}
                    index={index}
                    key={index}
                    userId={user.uid}
                  />
                );
              })}
          </Grid>
        </Grid>
        //grid responsive
        <Grid
          item
          xs={12}
          container
          spacing={2}
          className={classes.mobileProfileItem}
        >
          {dataPosts &&
            dataPosts.map((data, index) => {
              return (
                <File post={data} index={index} key={index} userId={user.uid} />
              );
            })}
        </Grid>
      </Box>
    </>
  );
}
