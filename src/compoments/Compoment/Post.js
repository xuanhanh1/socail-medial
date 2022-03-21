import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import Modal from "@mui/material/Modal";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import Button from "@mui/material/Button";
import { TextField, Box, Paper } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import ModalPost from "../Popup/ModalPost";
import feel from "../../image/feeling.png";
import video from "../../image/video.png";
import live from "../../image/livestream.png";

const useStyles = makeStyles({
  post: {
    display: "flex",
    "& > :not(style)": {
      m: 1,
      width: "100%",
      height: 180,
    },
  },
  postFeel: {
    marginTop: "10px",
    justifyContent: "space-evenly !important",
    height: "auto",
  },
  iconClose: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  postDivider: {
    marginRight: "72px !important",
  },
  "@media only screen and (max-width:1024px)": {
    modalMobile: {
      width: "auto",
      top: "0 !important",
      bottom: "0 !important",
      left: "0 !important",
      right: "0 !important",
      transform: "translate(0px, 10px) !important",
    },
  },
  "@media only screen and (max-width:740px)": {
    postFeel: {
      display: "none !important",
    },
    post: {
      display: "flex",
      "& > :not(style)": {
        m: 1,
        width: "100%",
        height: "auto",
      },
    },
    modalMobile: {
      width: "auto",
      top: "0 !important",
      bottom: "0 !important",
      left: "0 !important",
      right: "0 !important",
      transform: "translate(0px, 10px) !important",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "@media only screen and (max-width:1024px)": {
    top: "25%",
  },
};

function Post() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userInfor = useSelector((state) => state.userInfor);
  const [user, setUser] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    setUser(userInfor);
  }, userInfor);

  return (
    <Box className={classes.post}>
      <Paper variant="outlined">
        <ListItem alignItems="flex-start" onClick={handleOpen}>
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={user && user.photoURL ? user.photoURL : ""}
            />
          </ListItemAvatar>
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label={
              user && user.displayName
                ? user.displayName + ` ơi, bạn đang nghỉ gì thế?`
                : ""
            }
            fullWidth
          />
        </ListItem>
        <Divider variant="inset" className={classes.postDivider} />
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          spacing={2}
          className={classes.postFeel}
        >
          <Button variant="outlined" onClick={handleOpen}>
            <img src={feel} className="btn-img-post"></img>
            Hình ảnh/Cảm xúc
          </Button>
          <Button variant="outlined" onClick={handleOpen}>
            <img src={video} className="btn-img-post"></img>
            Video/ Hoạt động{" "}
          </Button>
          <Button variant="outlined" onClick={handleOpen}>
            <img src={live} className="btn-img-post"></img>
            Trục tiếp
          </Button>
        </BottomNavigation>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalMobile}
      >
        <Box sx={style} className={classes.modalMobile}>
          <IconButton
            aria-label="add to favorites"
            className={classes.iconClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            color="secondaryDark"
            onClick={handleClose}
          >
            <CancelSharpIcon />
          </IconButton>
          <ModalPost user={user} />
        </Box>
      </Modal>
    </Box>
  );
}

export default Post;
