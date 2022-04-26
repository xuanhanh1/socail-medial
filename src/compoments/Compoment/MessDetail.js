import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { ListItem, AppBar, Toolbar, Box, Divider } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import logoAvata from "../../image/avata.png";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Grid from "@mui/material/Grid";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import PropTypes from "prop-types";
import "./Message.scss";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
// import userLogin from '../../App'
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
function MessDetail(props) {
  const { user, userSelected, socket, newMsg } = props;

  const [input, setInput] = React.useState("");
  const [image, setImage] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [arrChat, setArrChat] = useState([]);
  const [arrNewMsg, setArrNewMsg] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [arrRoomChat, setArrRoomChat] = useState([]);
  const { roomId } = useParams();
  const [roomChatId, setRoomChatId] = useState("");
  const [roomOldChatId, setRoomOldChatId] = useState("");
  let scrollRef = useRef();
  let roomIdRef = useRef();

  useEffect(() => {
    debugger;
    if (roomId) {
      debugger;
      saveMsg(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    console.log("call firebase");

    if (roomChatId != "") {
      db.collection("chat")
        .doc(roomChatId)
        .collection("messages")
        .orderBy("updatedAt", "asc")
        .onSnapshot((querySnapshot) => {
          var chats = [];
          querySnapshot.forEach((doc) => {
            chats = chats.concat(doc.data().data);
          });
          setArrChat(chats);
        });
    }

    setArrRoomChat([...arrRoomChat, roomId]);
  }, [roomChatId]);

  const saveMsg = (roomId) => {
    debugger;
    if (arrNewMsg.length > 0) {
      db.collection("chat")
        .doc(roomChatId)
        .collection("messages")
        .add({
          data: arrNewMsg,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          debugger;
          setRoomChatId(roomId);

          setArrNewMsg([]);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      setRoomChatId(roomId);
    }
  };

  useEffect(() => {
    if (newMsg) {
      let data = arrNewMsg.concat(newMsg);
      setArrNewMsg(data);
    }
  }, [newMsg]);

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [arrChat, arrNewMsg]);

  const handleSubmitMessage = () => {
    let socketId = userSelected.idSocket;
    let msg = {
      text: input,
      sender_id: user.uid,
      updatedAt: new Date(),
      sender_name: user.displayName,
    };
    setArrNewMsg([...arrNewMsg, msg]);
    socket.emit("send-msg", { socketId, msg });
    setInput("");
  };

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmitMessage();
    }
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const choseEmoji = (emoji, event) => {
    let emojiXX = emoji.native;
    setInput(input + emojiXX);
  };

  const handleChange = (event) => {
    const imageList = event.target.files;
    // console.log(imageList)
    if (imageList) {
      const fileArray = Array.from(imageList).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);
      setImage((prevImage) => prevImage.concat(fileArray));
    }
    if (imageList.length > 0) {
      if (!isImage) {
        setIsImage(true);
      }
    }
  };

  return (
    <>
      {userSelected && user ? (
        <Box
          sx={{
            boxShadow: 1,
            width: "auto",
            height: "auto",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 1,
            m: 1,
            borderRadius: 0,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700",
            height: "90vh",
            position: "relative",
          }}
        >
          <div className="mess-detail-header">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src={userSelected.data.photoURL} />
                </ListItemIcon>
                <ListItemText primary={userSelected.data.displayName} />
              </ListItemButton>
            </ListItem>
            <ListItemButton>
              <ListItemIcon>
                <MoreVertIcon />
              </ListItemIcon>
            </ListItemButton>
          </div>
          <Divider />
          <Divider />
          <Divider />
          <div className="mess-content">
            {arrChat && arrChat.length > 0 ? (
              arrChat.map((chat, i) => {
                return (
                  <div
                    key={i}
                    className={
                      chat.sender_id === user.uid
                        ? "mess-content-a"
                        : "mess-content-b"
                    }
                  >
                    <span className="mess-detail-text">{chat.text}</span>
                  </div>
                );
              })
            ) : (
              <p>not messages</p>
            )}

            {arrNewMsg && arrNewMsg.length > 0
              ? arrNewMsg.map((msg, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        msg.sender_id === user.uid
                          ? "mess-content-a"
                          : "mess-content-b"
                      }
                    >
                      <span className="mess-detail-text">{msg.text}</span>
                    </div>
                  );
                })
              : null}

            <div ref={scrollRef} />
          </div>
          <div className="mess-action">
            <div className="mess-action-input">
              <span className="input">
                <input
                  type="text"
                  placeholder="Aa"
                  onChange={(e) => handleChangeInput(e)}
                  onKeyDown={(e) => handleOnKeyDown(e)}
                  value={input}
                />
              </span>

              <div className="mess-action-input-icon">
                <CardActions disableSpacing>
                  <div className="file-action">
                    <input
                      id="file-input"
                      accept="image/*|video/*"
                      type="file"
                      // multiple="multiple"
                      style={{ display: "none" }}
                      // onClick={(e) => (e.target.value = null)}
                      webkitdirectory
                    />
                    <IconButton>
                      <label for="file-input">
                        <AttachFileIcon
                          color="secondaryLight"
                          sx={{
                            fontSize: "1.4rem",
                          }}
                        />
                      </label>
                    </IconButton>
                  </div>
                  <div className="icon-feel">
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState) => (
                        <div>
                          <IconButton
                            aria-label="share"
                            {...bindTrigger(popupState)}
                          >
                            <InsertEmoticonIcon
                              color="secondaryLight"
                              sx={{
                                fontSize: "1.4rem",
                              }}
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
                  <div className="input-send-icon">
                    <IconButton onClick={handleSubmitMessage}>
                      <SendOutlinedIcon
                        color="secondaryLight"
                        sx={{
                          fontSize: "1.4rem",
                        }}
                      />
                    </IconButton>
                  </div>
                </CardActions>
              </div>
            </div>
          </div>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

export default MessDetail;

// const handleSubmitMessage = () => {
//   db.collection("chat")
//     .doc(roomId)

//     .collection("messages")
//     .add({
//       text: input,
//       sender_id: user.uid,
//       updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
//       sender_name: user.displayName,
//     })
//     .then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//       db.collection("chat")
//         .doc(roomId)
//         .update({
//           updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
//         })
//         .then(() => {
//           console.log("update cusses");
//         })
//         .catch((err) => {
//           console.log("err ", err);
//         });
//     })
//     .catch((error) => {
//       console.error("Error adding document: ", error);
//     });
// };
