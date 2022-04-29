import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { Picker } from "emoji-mart";
import moment from "moment";
import firebase from "firebase";
import "emoji-mart/css/emoji-mart.css";
import "./Message.scss";
import { ListItem, Box, Divider } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CardActions from "@mui/material/CardActions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import PropTypes from "prop-types";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
function ElevationScroll(props) {
  const { children, window } = props;
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
  window: PropTypes.func,
};

function MessDetail(props) {
  const { user, isOnline, socket, newMsg, socketId } = props;
  const [input, setInput] = React.useState("");
  const [image, setImage] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [arrChat, setArrChat] = useState([]);
  const [arrNewMsg, setArrNewMsg] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [arrRoomChat, setArrRoomChat] = useState([]);
  const { contactId } = useParams();
  const [roomChatId, setRoomChatId] = useState("");
  const [roomOldChatId, setRoomOldChatId] = useState("");
  const [userContact, setUserContact] = useState();
  let scrollRef = useRef();
  let roomIdRef = useRef();

  useEffect(() => {
    if (newMsg) {
      let data = arrNewMsg.concat(newMsg);
      setArrNewMsg(data);
    }
  }, [newMsg]);

  useEffect(() => {
    if (userContact && roomOldChatId && arrNewMsg.length > 0) {
      let newArr = [];

      if (userContact.messagesWait) {
        newArr = userContact.messages.concat(userContact.messagesWait);
      } else {
        newArr = userContact.messages;
      }
      let newArrFB = newArr.concat(arrNewMsg);
      console.log("time ", firebase.firestore.FieldValue.serverTimestamp());
      var washingtonRef = db
        .collection("users")
        .doc(user.uid)
        .collection("messages")
        .doc(roomOldChatId);

      return washingtonRef
        .update({
          messages: newArrFB,
          lastMessage: newArr[newArr.length - 1],
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          messagesWait: [],
        })
        .then(() => {
          console.log("Document successfully updated!");
          setArrNewMsg([]);
          setUserContact({});
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }

    if (contactId && user) {
      try {
        db.collection("users")
          .doc(user.uid)
          .collection("messages")
          .where("contactId", "==", contactId)
          .get()
          .then((doc) => {
            doc.forEach((data) => {
              setUserContact(data.data());
              setRoomOldChatId(data.data().roomId);
            });
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }, [contactId]);

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [userContact, arrNewMsg]);

  const handleSubmitMessage = () => {
    let msg = {
      text: input,
      sender_id: user.uid,
      updatedAt: new Date().getTime(),
      sender_name: user.displayName,
    };
    setArrNewMsg([...arrNewMsg, msg]);
    socket.emit("send-msg", { socketId, msg });

    if (!isOnline) {
      var users = db
        .collection("users")
        .doc(contactId)
        .collection("messages")
        .doc(user.uid);

      return users
        .update({
          messagesWait: [msg],
        })
        .then(() => {
          console.log("document successfully updated");
          setInput("");
        })
        .catch((err) => {
          console.log(err);
        });
    }

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

  const choseEmoji = (emoji, event) => {
    let emojiXX = emoji.native;
    setInput(input + emojiXX);
  };

  const handleChange = (event) => {
    const imageList = event.target.files;

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
      {contactId && user && userContact ? (
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
                  <Avatar alt="Remy Sharp" src={userContact.contactPhotoURL} />
                </ListItemIcon>
                <ListItemText
                  primary={userContact.contactName}
                  secondary={isOnline ? "Đang hoạt động " : "Đang offline"}
                />
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
            {userContact.messages && userContact.messages.length > 0 ? (
              userContact.messages.map((chat, i) => {
                const formatted = moment(chat.updatedAt).format(
                  "MMMM Do, h:mm a"
                );

                return (
                  <div
                    className={
                      chat.sender_id === user.uid
                        ? "mess-content-a"
                        : "mess-content-b"
                    }
                  >
                    <div className="mess">
                      <div className="mess-avatar">
                        <Avatar
                          alt="avatar messages"
                          src={userContact.contactPhotoURL}
                          className="mess-avatar-img"
                        />
                      </div>
                      <div className="mess-content-text">{chat.text}</div>
                    </div>
                    <div className="time">
                      <span>{formatted}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>not messages</p>
            )}

            {userContact.messagesWait && userContact.messagesWait.length > 0
              ? userContact.messagesWait.map((chat, i) => {
                  const formatted = moment(chat.updatedAt).format(
                    "MMMM Do, h:mm a"
                  );

                  return (
                    <div
                      className={
                        chat.sender_id === user.uid
                          ? "mess-content-a"
                          : "mess-content-b"
                      }
                    >
                      <div className="mess">
                        <div className="mess-avatar">
                          <Avatar
                            alt="avatar messages"
                            src={userContact.contactPhotoURL}
                            className="mess-avatar-img"
                          />
                        </div>
                        <div className="mess-content-text">{chat.text}</div>
                      </div>
                      <div className="time">
                        <span>{formatted}</span>
                      </div>
                    </div>
                  );
                })
              : null}

            {arrNewMsg && arrNewMsg.length > 0
              ? arrNewMsg.map((msg, i) => {
                  const formatted = moment(msg.updatedAt).fromNow();

                  return (
                    <div
                      className={
                        msg.sender_id === user.uid
                          ? "mess-content-a"
                          : "mess-content-b"
                      }
                    >
                      <div className="mess">
                        <div className="mess-avatar">
                          <Avatar
                            alt="avatar messages"
                            src={userContact.contactPhotoURL}
                            className="mess-avatar-img"
                          />
                        </div>
                        <div className="mess-content-text">{msg.text}</div>
                      </div>
                      <div className="time">
                        <span>{formatted}</span>
                      </div>
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
