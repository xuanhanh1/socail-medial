import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  CardActionArea,
  Card,
  Avatar,
  IconButton,
  Typography,
  CardActions,
} from "@mui/material";
import { toast } from "react-toastify";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Video from "../../image/video.mp4";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Fade from "@mui/material/Fade";
import { Paper, CardContent, Divider } from "@mui/material";
import Comment from "./Comment";
import { makeStyles } from "@mui/styles";
import { db } from "../../firebase";
import moment from "moment";
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
  "@media only screen and (max-width:740px)": {
    cartVideo: {
      width: "auto !important",
    },
  },
});
export default function ListImageTrending(props) {
  const classes = useStyles();
  const { post, userId, index } = props;
  const [like, setLike] = useState(false);
  const [numberLike, setNumberLike] = useState();
  const [showComment, setShowComment] = useState();
  const [time, setTime] = useState();
  const [arrLikes, setArrLikes] = useState([]);
  const [focusInput, setFocusInput] = useState(false);
  ///copy tuwf home

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
  /// copy tu home post
  return (
    <Box
      sx={{
        // height: '100vh'
        marginBottom: "10px",
      }}
    >
      <Card raised={true}>
        <CardHeader
          className={classes.homeCard}
          avatar={
            <Avatar
              //   sx={{ bgcolor: red[500] }}
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
        <CardActionArea
          width="auto"
          sx={{
            textAlign: "-webkit-center",
            padding: "10px",
          }}
        >
          <CardMedia
            component="video"
            height="auto"
            src={post.imageURL}
            alt="Paella dish"
            controls
            autoPlay
            sx={{
              width: "450px",
              height: "600px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
            className={classes.cartVideo}
          />
        </CardActionArea>
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
        {/* <CardActions disableSpacing className={classes.homeBtnAction}>
          <ListItemButton
            disablePadding
            className={classes.homeCommentIcon}
            value={index}
            onClick={(e) => handleLikePost(e)}
          >
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color={like ? "secondaryDark" : "blue"} />
            </IconButton>
            {like ? (
              <span className="home-comment-icon">{`${numberLike} like`}</span>
            ) : (
              <span className="home-comment-icon">Thích</span>
            )}
          </ListItemButton>
          <ListItemButton className={classes.homeCommentIcon}>
            <IconButton
              aria-label="comment"
              onClick={(e) => handleShowComment(e)}
              value={index}
            >
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
        </CardActions> */}
        <Divider />
        <Comment postId={post.post_id} />
      </Card>
    </Box>
  );
}
