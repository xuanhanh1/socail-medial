import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import { CardHeader, CardContent, CardActions, Divider } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import ListItem from "@mui/material/ListItem";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Fade from "@mui/material/Fade";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DraftsIcon from "@mui/icons-material/Drafts";
import LogoAvata from "../image/avata.png";
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Home from "../containers/HomePage/Home/Home";
import { makeStyles } from "@mui/styles";
import Comment from "../compoments/Compoment/Comment";

const useStyles = makeStyles({
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DetailProfile(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { user } = props;
  const [showComment, setShowComment] = useState();
  const classes = useStyles();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleShowComment = (e) => {
    e.preventDefault();
    var index = e.target.value;
    console.log(index);
    setShowComment(index);
    console.log(showComment);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} className={classes.profileItem}>
        <Grid item xs>
          <Card
            // sx={{  , bgcolor: "background.paper" }}
            sx={{
              ml: 2,
              mr: 2,
              alignItems: "center",
              mb: 5,
              maxWidth: 360,
              width: "100%",
            }}
            elevation={4}
          >
            <div className="detail-header">
              <span style={{ paddindLeft: "10px", textAlign: "center" }}>
                Giới thiệu
              </span>
            </div>
            <hr></hr>

            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <ApartmentSharpIcon color="backgroundColorDark" />
                </ListItemIcon>
                <ListItemText primary="Phú Hòa, Phú Yên" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <WorkIcon color="backgroundColorDark" />
                </ListItemIcon>
                <ListItemText primary="133 Tân Cảng, Bình Thạnh" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <SchoolIcon color="backgroundColorDark" />
                </ListItemIcon>
                <ListItemText primary="Đh Công Nghệ Thông Tin" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <SportsEsportsIcon color="backgroundColorDark" />
                </ListItemIcon>
                <ListItemText primary="Chơi game, nuôi chó" />
              </ListItemButton>
            </List>
          </Card>
        </Grid>
        <Grid item xs={9}>
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
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={LogoAvata}
                >
                  L
                </Avatar>
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
              title="xuan hanh"
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Typography>
            </CardContent>

            <div className="div-home-image-one">
              <CardMedia
                component="img"
                image={LogoAvata}
                alt="Paella dish"
                className={classes.homeImage}
              />
            </div>
            <Divider />
            <CardActions disableSpacing className={classes.homeBtnAction}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                <span className="home-comment-icon">Thích</span>
              </IconButton>

              <IconButton
                aria-label="comment"
                onClick={(e) => handleShowComment(e)}
                // value={index}
              >
                <ChatBubbleOutlineOutlinedIcon />
                <span className="home-comment-icon">Bình luận</span>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
                <span className="home-comment-icon">Chia sẻ</span>
              </IconButton>
            </CardActions>
            <Divider />

            <div className="cart-list-comment">
              <Comment />
            </div>
          </Card>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        spacing={2}
        className={classes.mobileProfileItem}
      >
        <Home />
      </Grid>
    </Box>
  );
}
