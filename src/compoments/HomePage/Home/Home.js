import React, { useEffect, useState } from "react";
import firebase from "firebase"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import catanddog from '../../../image/catanddog.jpg'
import './Home.scss';
import Post from '../../Compoment/Post'
import Comment from "./Comment"
import { db, auth, provider } from "../../../firebase";

const useStyles = makeStyles({
    popupMore: {
        fontSize: '50px'
    },
    '@media only screen and (max-width: 740px)': {
        cardMobile: {
            marginLeft: '0 !important',
            marginRight: '0 !important'
        },
    }
})
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
function Home() {
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();
    const [user, setUser] = useState({})
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // const getUserProfile = () => {
    //     const user = firebase.auth().currentUser;
    //     if (user !== null) {
    //         const uid = user.uid;
    //         var docRef = db.collection("users").doc(uid);
    //         docRef.get().then((doc) => {
    //             if (doc.exists) {
    //                 setUser(doc.data());
    //                 localStorage.setItem("user", JSON.stringify(doc.data()))

    //             } else {
    //                 console.log("No such document!");
    //             }
    //         }).catch((error) => {
    //             console.log("Error getting document:", error);
    //         });
    //     }
    // }
    // useEffect(getUserProfile, user);
    return <Card sx={{
        ml: 2,
        mr: 2,
        alignItems: 'center',
        mb: 5,

    }} elevation={8} className={classes.cardMobile}>
        <Post />
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
            }
            action={
                <PopupState variant="popper" popupId="demo-popup-popper" >
                    {(popupState) => (
                        <div className={classes.popupMore}>

                            <IconButton aria-label="settings" variant="contained" {...bindToggle(popupState)}>
                                <MoreVertIcon />
                            </IconButton>

                            <Popper {...bindPopper(popupState)} transition placement="left-start">
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper>
                                            <Typography >
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
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        />
        <CardMedia
            component="img"
            image={catanddog}
            alt="Paella dish"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
            </Typography>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                    aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                    stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and
                    peppers, and cook without stirring, until most of the liquid is absorbed,
                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                    mussels, tucking them down into the rice, and cook again without
                    stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
            </CardContent>
        </Collapse>

        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>

        <div className="cart-list-comment">
            <Comment />
        </div>
    </Card >
}

export default Home;
