import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Typography, CardMedia } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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
  homeImage: {
    width: "250px !important",
  },
  commentImage: {
    width: "100px !important",
    marginLeft: "70px",
    marginTop: "10px",
    borderRadius: "20px",
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
  const { postId, focusInput } = props;
  const [comments, setComments] = useState([]);
  const [valueComment, setValueComment] = useState("");
  const [addComment, setAddComment] = useState(true);
  const [imageComment, setImageComment] = useState();
  const [show, setShow] = useState(true);
  const [image, setImage] = useState();
  const textInput = useRef(null);

  useEffect(() => {
    setUser(userInfor);
  }, userInfor);

  useEffect(() => {
    getAllComments();
  }, [show]);

  useEffect(() => {
    handleFocusInput();
  }, [focusInput]);

  const getAllComments = () => {
    if (!show) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("createdAt", "desc")
        .get()
        .then((querySnapshot) => {
          var arrComments = [];
          querySnapshot.forEach((doc) => {
            arrComments.push(doc.data());
          });
          setComments(arrComments);
        });
    } else {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("createdAt", "desc")
        .limit(3)
        .get()
        .then((querySnapshot) => {
          var arrComments = [];
          querySnapshot.forEach((doc) => {
            arrComments.push(doc.data());
          });
          setComments(arrComments);
        });
    }
  };

  const choseEmoji = (emoji) => {
    let emojiXX = emoji.native;
    setValueComment(valueComment + emojiXX);
  };

  const handleOnChangeInput = (e) => {
    var valueInput = e.target.value;
    setValueComment(valueInput);
  };

  const handleSubmitComment = () => {
    console.log(
      "image url in handle submit comment (dau ham handle submit )",
      imageComment
    );
    if (valueComment !== "") {
      const data = {
        text: valueComment,
        commentFromUserId: user.uid,
        commentFromUserAvatar: user.photoURL ? user.photoURL : "",
        commentFromUserDisplayName: user.displayName,
        commentImage: imageComment ? imageComment : "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const time = Date.now();

      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .add(data)
        .then((docRef) => {
          setValueComment("");
          const obj = data;
          obj.createdAt = time;
          setComments([obj, ...comments]);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      setAddComment(!addComment);
    } else {
      console.log("no comments");
    }
    console.log(
      "image url in handle input changes (cuoi ham handle submit) ",
      imageComment
    );
  };

  const handleFocusInput = () => {
    if (focusInput) {
      setTimeout(() => {
        textInput.current.focus();
      }, 10);
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmitComment();
    }
  };

  const handleChangeFile = (e) => {
    var f = e.target.files[0];
    var name = f.name;
    var pathName = `${user.uid}/${name}`;
    console.log(
      "🚀 ~ file: Comment.js ~ line 173 ~ handleChangeFile ~ pathName",
      pathName
    );
    var uploadTask = firebase.storage().ref().child(`image/${pathName}`).put(f);
    //upload files
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
          setImageComment((prevImage) => prevImage.concat(downloadURL));
        });
      }
    );

    if (f) {
      const fileArray = URL.createObjectURL(f);
      console.log(
        "🚀 ~ file: Comment.js ~ line 204 ~ handleChangeFile ~ fileArray",
        fileArray
      );
      setImage((prevImage) => prevImage.concat(fileArray));
    }
  };

  return (
    <>
      <List
        sx={{ bgcolor: "background.paper", ml: 7 }}
        className={classes.comment}
      >
        {comments &&
          comments.length > 0 &&
          comments.map((comment, i) => {
            let commentTime = "";
            if (comment) {
              if (typeof comment.createdAt === "object") {
                commentTime = moment
                  .unix(comment.createdAt.seconds)
                  .format("dddd, MMMM Do YYYY, h:mm:ss a");
              } else {
                commentTime = moment
                  .unix(comment.createdAt)
                  .format("dddd, MMMM Do YYYY, h:mm:ss a");
              }
            }

            return (
              <div key={i}>
                <ListItem alignItems="flex-start">
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
                        {/* <CardMedia
                          component="img"
                          image={""}
                          alt="Paella dish"
                          className={classes.homeImage}
                        /> */}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ul className="list-comment">
                  <li>Thích</li>
                  <li>{commentTime}</li>
                </ul>
              </div>
            );
          })}
      </List>
      {comments && comments.length >= 3 ? (
        <div className="add-comment">
          {show ? (
            <span
              onClick={() => {
                setShow(!show);
              }}
            >
              Xem thêm bình luận
            </span>
          ) : (
            <span
              onClick={() => {
                setShow(!show);
              }}
            >
              Ẩn bình luận
            </span>
          )}
        </div>
      ) : (
        ""
      )}
      {image ? (
        <CardMedia
          component="img"
          image={image}
          alt="Paella dish"
          className={classes.commentImage}
        />
      ) : null}

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
          id="comment"
          placeholder="Viết bình luận tại đây..."
          variant="standard"
          fullWidth
          width="65%"
          padding="50px"
          onChange={(e) => handleOnChangeInput(e)}
          inputRef={textInput}
          value={valueComment}
          onKeyDown={(e) => {
            handleOnKeyDown(e);
          }}
        />

        <Stack direction="row" spacing={2}>
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
          <div className="icon-feel">
            <input
              id="comment-input"
              accept="image/*|video/*"
              type="file"
              onChange={handleChangeFile}
              style={{ display: "none" }}
              onClick={(e) => (e.target.value = null)}
            />
            <IconButton>
              <label for="comment-input">
                <AttachFileIcon
                  color="secondaryLight"
                  className={classes.commentIcon}
                />
              </label>
            </IconButton>
          </div>

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
