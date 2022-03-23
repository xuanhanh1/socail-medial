import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { CardHeader, Divider } from "@mui/material";
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
});
export default function ModalTrend() {
  const [expanded, setExpanded] = React.useState(false);
  let navigate = useNavigate();
  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const changesNewRouter = () => {
    navigate(`/`);
  };
  return (
    <Card sx={{ Width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        // height="194"
        image={catanddoc}
        alt="Paella dish"
        onClick={changesNewRouter}
      />
      <CardContent onClick={changesNewRouter}>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing className={classes.homeBtnAction}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          <span className="home-comment-icon">Thích</span>
        </IconButton>

        <IconButton aria-label="comment" onClick={changesNewRouter}>
          <ChatBubbleOutlineOutlinedIcon />
          <span className="home-comment-icon">Bình luận</span>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
          <span className="home-comment-icon">Chia sẻ</span>
        </IconButton>
      </CardActions>
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
