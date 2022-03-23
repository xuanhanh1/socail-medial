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
import { getData } from "emoji-mart/dist/utils";

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
    marginTop: "10px",
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
  },
  homeImage: {
    width: "350px !important",
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
  const [user, setUser] = useState({});
  const [dataPosts, setDataPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apods, setAPods] = useState();
  const [showComment, setShowComment] = useState();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    (async () => {
      const postData = await db.collection("posts").limit(3).get();
      // console.log('postData ', postData);
      if (postData) {
        let arr = [];
        postData.forEach((doc) => {
          arr.push(doc.data());
        });
        if (arr.length === 3) {
          setLoading(true);
        }
        setDataPosts(arr);
      }
    })();
  }, []);
  const handleShowComment = (e) => {
    e.preventDefault();
    var index = e.target.value;
    console.log(index);
    setShowComment(index);
    console.log(showComment);
  };
  return (
    <>
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
      {loading ? (
        ""
      ) : (
        <>
          <CircularProgress color="primary" />
        </>
      )}

      {dataPosts.map((post, index) => {
        console.log("post in home, ", post);
        return (
          <Card
            sx={{
              ml: 2,
              mr: 2,
              alignItems: "center",
              mb: 5,
            }}
            elevation={8}
            className={classes.cardMobile}
          >
            <CardHeader
              className={classes.homeCard}
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={post.photoURL}
                ></Avatar>
              }
              action={
                <PopupState variant="popper" popupId="demo-popup-popper">
                  {(popupState) => (
                    <div className={classes.popupMore}>
                      <IconButton
                        aria-label="settings"
                        variant="contained"
                        {...bindToggle(popupState)}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      <Popper
                        {...bindPopper(popupState)}
                        transition
                        placement="left-start"
                      >
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                              <Typography>
                                <List>
                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                        <BookmarkIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="Save" />
                                    </ListItemButton>
                                  </ListItem>
                                </List>
                              </Typography>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  )}
                </PopupState>
              }
              title={post.user_name}
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.homeContent}
              >
                {post.content}
              </Typography>
            </CardContent>
            <Divider />
            <div
              className={
                post.imageURL.length === 1
                  ? "div-home-image-one"
                  : "div-home-image"
              }
            >
              {post.imageURL.map((img) => {
                return (
                  <CardMedia
                    component="img"
                    image={img}
                    alt="Paella dish"
                    className={classes.homeImage}
                  />
                );
              })}
            </div>
            <Divider />
            <CardActions disableSpacing className={classes.homeBtnAction}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                <span className="home-comment-icon">Thích</span>
              </IconButton>

              <IconButton
                aria-label="comment"
                onClick={(e) => handleShowComment(e)}
                value={index}
              >
                <ChatBubbleOutlineOutlinedIcon />
                <span className="home-comment-icon">Bình luận</span>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
                <span className="home-comment-icon">Chia sẻ</span>
              </IconButton>
            </CardActions>
            <Divider />
            <div
              className={
                showComment == index
                  ? "card-list-comment-mobile"
                  : "cart-list-comment"
              }
            >
              <Comment />
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default Home;
