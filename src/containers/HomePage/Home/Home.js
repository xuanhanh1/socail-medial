import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { CardHeader, Divider } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import catanddog from "../../../image/catanddog.jpg";
import "./Home.scss";
import Post from "../../../compoments/Compoment/Post";
import Comment from "../../../compoments/Compoment/Comment";
import { db, auth, provider } from "../../../firebase";
import { PostAddSharp } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import PostDetail from "../../../compoments/Compoment/PostDetail";
const useStyles = makeStyles({
  popupMore: {
    fontSize: "50px",
  },
  cardMobile: {
    marginLeft: "0 !important",
    marginRight: "0 !important",
  },
  homePost: {
    marginBottom: "10px",
    width: "100%",
    marginTop: "0px",
    marginLeft: "0 !important",
    marginRight: "0 !important",
  },
  homeCard: {
    textAlign: "justify",
    padding: "10px",
  },
  homeContent: {
    textAlign: "left",
    fontWeight: "500",
    fontSize: "17px !important",
    color: "#000 !important",
    padding: " 0 10px",
  },
  homeBtnAction: {
    justifyContent: "space-around",
    padding: "0 30px !important",
  },
  homeImage: {
    width: "350px !important",
  },
  homeCommentIcon: {
    justifyContent: "center !important",
    borderRadius: "10px !important",
    margin: "5px 40px !important",
    height: "45px",
  },
  loading: {
    padding: 20,
  },
  "@media only screen and (max-width: 1024px)": {
    cardMobile: {
      //  marginRight: '0 !important'
    },
  },
  "@media only screen and (max-width: 740px)": {
    cardMobile: {
      marginLeft: "0 !important",
      marginRight: "0 !important",
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
function Home() {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const userInfor = useSelector((state) => state.userInfor);
  console.log("user redux ", userInfor);
  const [user, setUser] = useState(userInfor);
  const [dataPosts, setDataPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("user in useEffect", userInfor);
    setUser(userInfor);
  }, [userInfor]);
  useEffect(() => {
    (async () => {
      const postData = await db
        .collection("posts")
        .where("type", "==", "image")
        .limit(4)
        .get();

      if (postData) {
        let arr = [];
        postData.forEach((doc) => {
          // console.log(doc.data());
          arr.push(doc.data());
        });
        if (arr.length === 4) {
          setLoading(true);
        }
        setDataPosts(arr);
      }
    })();
  }, []);
  return (
    <>
      {user && user.displayName ? (
        <Card
          elevation={4}
          className={classes.homePost}
          sx={{
            ml: 2,
            mr: 2,
            alignItems: "center",
            mb: 5,
          }}
        >
          <Post />
        </Card>
      ) : (
        ""
      )}

      {loading ? (
        ""
      ) : (
        <>
          <CircularProgress color="primary" />
        </>
      )}
      {dataPosts.map((post, index) => {
        return (
          <PostDetail
            key={index}
            post={post}
            userId={user ? user.uid : null}
            index={index}
          />
        );
      })}
    </>
  );
}

export default Home;
