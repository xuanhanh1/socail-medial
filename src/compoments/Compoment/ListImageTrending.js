import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ImageList, CardMedia } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import ModalTrend from "../Popup/ModalTrend";
import { makeStyles } from "@mui/styles";
import { db } from "../../firebase";

const useStyles = makeStyles({
  btnClose: {
    position: "absolute !important",
    top: 0,
    right: 0,
  },
  trend: {
    columnCount: 3,
  },
  modalTrend: {
    position: "relative",
  },

  "@media only screen and (max-width: 1024px)": {
    modalTrend: {
      top: "0 !important",
      left: "0 !important",
      right: "0 !important",
      bottom: "0 !important",
      transform: " translate(0px, 0px) !important",
    },
  },
  "@media only screen and (max-width:740)": {
    trend: {
      columnCount: 2,
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ListImageTrending(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Cd, setCd] = React.useState(false);
  const classes = useStyles();
  const { dataPosts, userId } = props;

  useEffect(() => {
    if (window.innerWidth < 740) {
      setCd(true);
    }
  }, []);

  return (
    <>
      <>
        {dataPosts.type === "image" ? (
          <>
            <ImageListItem
              ImageListItem
              key={dataPosts.post_id}
              onClick={handleOpen}
            >
              <img
                // src={`${item.imageURL[0]}?w=248&fit=crop&auto=format`}
                src={
                  dataPosts.imageURL[0]
                    ? dataPosts.imageURL[0]
                    : "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7"
                }
                // srcSet={`${item.imageURL[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={dataPosts.content}
                loading="lazy"
              />
              <ImageListItemBar position="below" title={dataPosts.user_name} />
            </ImageListItem>
          </>
        ) : (
          <>
            <CardMedia
              component="video"
              image={dataPosts.imageURL}
              alt="Paella dish"
              width="248px"
              key={dataPosts.post_id}
              onClick={handleOpen}
            />
          </>
        )}
      </>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.modalTrend}>
          <IconButton
            aria-label="add to favorites"
            className={classes.btnClose}
            onClick={handleClose}
          >
            <CancelSharpIcon color="secondaryDark" />
          </IconButton>
          <ModalTrend data={dataPosts} userId={userId} />
        </Box>
      </Modal>
    </>
  );
}
