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
import "../../containers/HomePage/Home/Home.scss";
import Comment from "./Comment.js";
import { db, auth, provider } from "../../firebase";
import { PostAddSharp } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { getData } from "emoji-mart/dist/utils";
import moment from "moment";
import { toast } from "react-toastify";
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
function PostDetail(props) {
  const { post, index, userId } = props;
  const classes = useStyles();
  const [like, setLike] = useState(false);
  const [numberLike, setNumberLike] = useState();
  const [showComment, setShowComment] = useState();
  const [time, setTime] = useState();
  const [arrLikes, setArrLikes] = useState([]);
  const [focusInput, setFocusInput] = useState(false);

  useEffect(() => {
    if (post.createdAt && post.createdAt.seconds) {
      var time = moment.unix(post.createdAt.seconds).format("LL");
      setTime(time);
    }
  }, [userId]);

  useEffect(() => {
    setArrLikes(post.likeBy);
    setNumberLike(post.likeBy.length);

    if (arrLikes.includes(userId)) {
      setLike(!like);
    } else {
      setLike(false);
    }
  }, [post]);

  useEffect(() => {
    setNumberLike(arrLikes.length);

    if (arrLikes.includes(userId)) {
      setLike(!like);
    } else {
      setLike(false);
    }
  }, [arrLikes, userId]);

  const handleShowComment = (e) => {
    e.preventDefault();
    var index = e.target.value;
    setShowComment(index);
    setFocusInput(true);
  };

  const handleLikePost = async (e) => {
    if (userId) {
      var docRef = db.collection("posts").doc(post.post_id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const likes = doc.data().likeBy;
            if (likes.includes(userId)) {
              const likesNew = likes.filter((like) => like !== userId);
              var posts = db.collection("posts").doc(post.post_id);
              setLike(!like);
              setArrLikes(likesNew);
              setNumberLike(likesNew.length);
              return posts
                .update({
                  likeBy: likesNew,
                })
                .then(() => {})
                .catch((error) => {
                  console.error("Error updating document: ", error);
                });
            } else {
              var posts = db.collection("posts").doc(post.post_id);
              setLike(!like);
              return posts
                .update({
                  likeBy: [...likes, userId],
                })
                .then(() => {
                  setNumberLike([...likes, userId].length);
                })
                .catch((error) => {
                  console.error("Error updating document: ", error);
                });
            }
          } else {
            // doc.data() will be undefined in this case
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      toast.error("Mời bạn đăng nhập");
    }
  };

  return (
    <>
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
          subheader={time}
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
            post.imageURL.length === 1 ? "div-home-image-one" : "div-home-image"
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
          <ListItemButton
            disablePadding
            className={classes.homeCommentIcon}
            value={index}
            onClick={(e) => handleLikePost(e)}
          >
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color={like ? "secondaryDark" : "blue"} />
            </IconButton>
            {post.likeBy.includes(userId) ? (
              <span className="home-comment-icon">{`${numberLike} like`}</span>
            ) : (
              <span className="home-comment-icon">{`${numberLike} like`}</span>
            )}
          </ListItemButton>

          <ListItemButton
            className={classes.homeCommentIcon}
            onClick={(e) => handleShowComment(e)}
            value={index}
          >
            <IconButton aria-label="comment">
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
            <span className="home-comment-icon">Bình luận</span>
          </ListItemButton>

          <ListItemButton className={classes.homeCommentIcon}>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <span className="home-comment-icon">Chia sẻ</span>
          </ListItemButton>
        </CardActions>
        <Divider />
        <div
          className={
            showComment == index
              ? "card-list-comment-mobile"
              : "cart-list-comment"
          }
        >
          <Comment postId={post.post_id} key={index} focusInput={focusInput} />
        </div>
      </Card>
    </>
  );
}

export default PostDetail;
