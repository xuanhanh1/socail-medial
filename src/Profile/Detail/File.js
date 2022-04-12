import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import { CardHeader, CardContent, CardActions, Divider } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import ListItem from "@mui/material/ListItem";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Fade from "@mui/material/Fade";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { db } from "../../firebase";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { makeStyles } from "@mui/styles";
import Comment from "../../compoments/Compoment/Comment";
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
  mobileProfileItem: {
    display: "none !important",
  },
  homeBtnAction: {
    justifyContent: "space-around",
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
function File(props) {
  const classes = useStyles();
  const [like, setLike] = useState(false);
  const [numberLike, setNumberLike] = useState();
  const [showComment, setShowComment] = useState();
  const [time, setTime] = useState();
  const { post, userId, index } = props;
  useEffect(() => {
    if (userId !== "") {
      if (isLike(userId)) {
        setLike(true);
        // console.log("number like in useEffect ", post.likeBy);
        setNumberLike(post.likeBy.length);
      }
    }
    if (post.createdAt && post.createdAt.seconds) {
      var time = moment.unix(post.createdAt.seconds).format("LL");
      setTime(time);
    }
  }, []);
  const handleShowComment = (e) => {
    e.preventDefault();
    var index = e.target.value;
    console.log(index);
    setShowComment(index);
    console.log(showComment);
  };
  const handleLikePost = async (e) => {
    e.preventDefault();
    var likeByUserId = userId;
    var index = e.currentTarget.getAttribute("value");
    var arrPostLikeBy = [];
    var arrIsLike = post.likeBy;
    // console.log("so luong user da like bai viet ", post.likeBy);
    if (post.likeBy === undefined) {
      arrPostLikeBy.push(likeByUserId);
    } else {
      // var isLike = isLike(user.)
      if (isLike(userId)) {
        console.log("users were liked arr ", arrIsLike);
        var newArr = arrIsLike.filter((item) => item !== userId);
        console.log(newArr);
        arrPostLikeBy = newArr.concat(arrPostLikeBy);
      } else {
        arrIsLike.push(likeByUserId); //
        arrPostLikeBy = arrIsLike.concat(arrPostLikeBy);
      }
    }
    console.log("arr last ", arrPostLikeBy);
    var posts = await db.collection("posts").doc(post.post_id);

    return posts
      .update({
        likeBy: arrPostLikeBy,
      })
      .then(() => {
        console.log("Document successfully updated!");
        setLike(!like);
        setNumberLike(arrPostLikeBy.length);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  const isLike = (id) => {
    var arrIsLike = post.likeBy;
    if (arrIsLike !== undefined && arrIsLike.includes(id)) {
      return true;
    }
  };
  // console.log("props in file ", post, "---------------", userId);
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
        {post &&
          post.imageURL.length > 0 &&
          post.imageURL.map((img) => {
            return (
              <CardMedia
                component={post.type === "image" ? "img" : "video"}
                image={img}
                alt="Paella dish"
                // controls
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
      </CardActions>
      <Divider />
      <div
        className={
          showComment == index
            ? "card-list-comment-mobile"
            : "cart-list-comment"
        }
      >
        <Comment postId={post.post_id} />
      </div>
    </Card>
  );
}

export default File;
