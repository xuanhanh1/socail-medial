import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { makeStyles } from "@mui/styles";
import firebase from "firebase";
import { db } from "../../firebase";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Picker } from "emoji-mart";
import "./Message.scss";

const useStyles = makeStyles({
  listComment: {
    borderRadius: "15px",
    padding: "10px",
    background: "#f0f2f5",
  },
  commentIcon: {
    fontSize: "1.8rem",
  },
  "@media only screen and (max-width: 740px)": {
    comment: {
      marginLeft: "0 !important",
    },
  },
});
export default function Comment(props) {
  const classes = useStyles();
  const userInfor = useSelector((state) => state.userInfor);
  const [user, setUser] = useState();
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const [valueComment, setValueComment] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [addComment, setAddComment] = useState(true);
  // var value = 1647968400;
  // var dateString = moment.unix(value).format("LL");
  // console.log("🚀 ~ file: Comment.js ~ line 39 ~ Comment ~ myDate", dateString);
  useEffect(() => {
    setUser(userInfor);
  }, userInfor);
  useEffect(async () => {
    await getAllComments();
  }, [addComment]);
  const getAllComments = async () => {
    var commentItem = [];
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        var arrComments = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          arrComments.unshift(doc.data());
        });
        // console.log("array comments, ", arrComments);
        setComments(arrComments);
      });
    // console.log("comment item ", commentItem);
  };
  // console.log("comment,", comments.length);
  const choseEmoji = (emoji) => {
    let emojiXX = emoji.native;
    setValueComment(valueComment + emojiXX);
  };
  const handleOnChangeInput = (e) => {
    var valueInput = e.target.value;

    setValueComment(valueInput);
  };
  const handleSubmitComment = async () => {
    if (valueComment !== "") {
      await db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
          text: valueComment,
          commentFromUserId: user.uid,
          commentFromUserAvatar: user.photoURL,
          commentFromUserDisplayName: user.displayName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          setValueComment("");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      setAddComment(!addComment);
    } else {
      console.log("no comments");
    }
  };
  // console.log("value comments ", valueComment);
  // console.log("user ", user);
  return (
    <>
      <List
        sx={{ bgcolor: "background.paper", ml: 7 }}
        className={classes.comment}
      >
        {comments &&
          comments.length > 0 &&
          comments.map((comment, i) => {
            // console.log("seconds", comment.createdAt);
            if (comment.createdAt.seconds) {
              var commentTime = moment
                .unix(comment.createdAt.seconds)
                .format("LL");
            }

            return (
              <>
                <ListItem alignItems="flex-start" key={i}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={comment.commentFromUserAvatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.listComment}
                    primary={comment.commentFromUserDisplayName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {comment.text}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ul className="list-comment">
                  <li>Thích</li>
                  <li>{commentTime}</li>
                </ul>
              </>
            );
          })}
      </List>

      <div className="card-comment">
        <Avatar
          alt="Cindy Baker"
          src={user && user.photoURL ? user.photoURL : ""}
          sx={{
            display: "flex",
            width: "40px",
            height: "40px",
          }}
        />
        <TextField
          id="standard-basic"
          placeholder="Viết bình luận tại đây..."
          variant="standard"
          fullWidth
          width="65%"
          padding="50px"
          onChange={(e) => handleOnChangeInput(e)}
          value={valueComment}
        />

        <Stack direction="row" spacing={2}>
          {/* <InsertEmoticonIcon
            color="secondaryLight"
            className={classes.commentIcon}
          /> */}
          <div className="icon-feel">
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <IconButton aria-label="share" {...bindTrigger(popupState)}>
                    <InsertEmoticonIcon
                      color="secondaryLight"
                      className={classes.commentIcon}
                    />
                  </IconButton>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div className="emoji">
                      <Picker set="apple" onClick={choseEmoji} />
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
          </div>
          {/* <AttachmentIcon
            color="secondaryLight"
            className={classes.commentIcon}
          /> */}
          <div className="icon-feel">
            <IconButton onClick={handleSubmitComment}>
              <SendOutlinedIcon
                color="secondaryLight"
                className={classes.commentIcon}
              />
            </IconButton>
          </div>
        </Stack>
      </div>
    </>
  );
}
