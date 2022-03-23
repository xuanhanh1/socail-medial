import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import ModalTrend from "../Popup/ModalTrend";
import { makeStyles } from "@mui/styles";

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
  width: 720,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ListImageTrending() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Cd, setCd] = React.useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (window.innerWidth < 740) {
      setCd(true);
    }
  }, []);

  return (
    <Box sx={{}}>
      <ImageList variant="masonry" gap={8} cols={Cd ? 2 : 3}>
        <div data-aos="zoom-in">
          {itemData.map((item) => (
            <ImageListItem ImageListItem key={item.img} onClick={handleOpen}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar position="below" title={item.author} />
            </ImageListItem>
          ))}
        </div>
      </ImageList>
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
          <ModalTrend />
        </Box>
      </Modal>
    </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
    author: "Ben Kolde",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
    author: "Philipp Berndt",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
    author: "Jen P.",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
    author: "Douglas Sheppard",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
    author: "Fi Bell",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
    author: "Hutomo Abrianto",
  },
];
