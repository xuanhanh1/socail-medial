import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { CardHeader, Divider, ListItemButton } from "@mui/material";
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
import catanddoc from "../../image/catanddog.jpg";
import Comment from "../Compoment/Comment";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import moment from "moment";

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
const useStyles = makeStyles({
  homeBtnAction: {
    justifyContent: "space-around",
  },
  homeBtnAction: {
    justifyContent: "space-around",
    padding: "0 30px !important",
  },
  homeCommentIcon: {
    justifyContent: "center !important",
    borderRadius: "10px !important",
    margin: "5px 40px !important",
    height: "45px",
  },
});
export default function ModalTrend(props) {
  const [expanded, setExpanded] = React.useState(false);
  let navigate = useNavigate();
  const classes = useStyles();
  const { data, userId } = props;
  const [like, setLike] = useState(false);
  const [numberLike, setNumberLike] = useState();
  const [time, setTime] = useState();
  const [arrLikes, setArrLikes] = useState([]);

  useEffect(() => {
    if (data.createdAt && data.createdAt.seconds) {
      var time = moment.unix(data.createdAt.seconds).format("LL");
      setTime(time);
    }
  }, [userId]);

  useEffect(() => {
    setArrLikes(data.likeBy);
    setNumberLike(data.likeBy.length);

    if (arrLikes.includes(userId)) {
      setLike(!like);
    } else {
      setLike(false);
    }
  }, [data]);

  useEffect(() => {
    setNumberLike(arrLikes.length);

    if (arrLikes.includes(userId)) {
      setLike(!like);
    } else {
      setLike(false);
    }
  }, [arrLikes, userId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changesNewRouter = () => {
    navigate(`/`);
  };

  const handleLikePost = async (e) => {
    if (userId) {
      var docRef = db.collection("posts").doc(data.post_id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const likes = doc.data().likeBy;
            if (likes.includes(userId)) {
              const likesNew = likes.filter((like) => like !== userId);
              var posts = db.collection("posts").doc(data.post_id);
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
              var posts = db.collection("posts").doc(data.post_id);
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
    <Card sx={{ Width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={data.photoURL}
          ></Avatar>
        }
        title={data.user_name}
        subheader="September 14, 2016"
      />
      <div
        className={
          data.imageURL.length === 1 ? "div-home-image-one" : "div-home-image"
        }
      >
        {data && data.imageURL.length > 0
          ? data.imageURL.map((d, i) => {
              return (
                <CardMedia
                  component="img"
                  // height="194"

                  image={d}
                  alt="Paella dish"
                  onClick={changesNewRouter}
                />
              );
            })
          : ""}
      </div>
      <CardContent onClick={changesNewRouter}>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing className={classes.homeBtnAction}>
        <ListItemButton
          disablePadding
          className={classes.homeCommentIcon}
          onClick={(e) => handleLikePost(e)}
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color={like ? "secondaryDark" : "blue"} />
          </IconButton>
          {data.likeBy.includes(userId) ? (
            <span className="home-comment-icon">{`${numberLike} like`}</span>
          ) : (
            <span className="home-comment-icon">{`${numberLike} like`}</span>
          )}
        </ListItemButton>

        <ListItemButton className={classes.homeCommentIcon}>
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
    </Card>
  );
}
