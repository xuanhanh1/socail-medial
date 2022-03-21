import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import Post from '../../../compoments/Compoment/Post'
import Comment from "../../../compoments/Compoment/Comment"
import { db, auth, provider } from "../../../firebase";
import { PostAddSharp } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
    popupMore: {
        fontSize: '50px'
    },
    homePost: {
        marginBottom: '10px'
    },
    '@media only screen and (max-width: 740px)': {
        cardMobile: {
            marginLeft: '0 !important',
            marginRight: '0 !important'
        },
    },
    homeImage: {
        width: '380px !important',
        
    },
    loading:{
        padding : 20
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
    const userInfor = useSelector(state => state.userInfor)
    const [user, setUser] = useState({})
    const [dataPosts, setDataPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apods, setAPods] = useState()

    window.onscroll = (() => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    }
    console.log("🚀 ~ file: Home.js ~ line 80 ~ window.onscroll=debounce ~ document.documentElement.offsetHeight", document.documentElement.offsetHeight)
    console.log("🚀 ~ file: Home.js ~ line 80 ~ window.onscroll=debounce ~ document.documentElement.scrollTop", document.documentElement.scrollTop)
    
    }, 100);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(()=>{
        (async() => {
            const postData = await db.collection('posts').limit(3).get();
            // console.log('postData ', postData);
            if (postData){
                let arr = []
                postData.forEach((doc) => {
                    arr.push(doc.data());
                });
                // console.log('arr ', arr);
                if(arr.length === 3 ){
                    setLoading(true);
                }
                setDataPosts(arr)
            }
        })()
        // var dataPosts = []
        // db.collection("posts").get().then( (querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         dataPosts.push(doc.data());
        //     });
        //     setDataPosts(dataPosts)
        //     console.log('START-END: ', new Date().getMinutes() + ":" + new Date().getSeconds());
        // });
    }, [])

    return (
        <>
            <Card elevation={4} className={classes.homePost}
                sx={{
                    ml: 2,
                    mr: 2,
                    alignItems: 'center',
                    mb: 5,
                }}
            >
                <Post />
            </Card>
            {
                loading ? '' : (
                    <>
                        <CircularProgress color="secondary"  />
                        <CircularProgress color="success"   />
                        <CircularProgress color="inherit"   />
                    </>
                )
            }
            {
                dataPosts.map((post) => {
                    // console.log(post)
                    return (
                        <Card sx={{
                            ml: 2,
                            mr: 2,
                            alignItems: 'center',
                            mb: 5,
            
                        }} elevation={8} className={classes.cardMobile}>
            
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                                        src = {post.photoURL}
                                    >
                                       
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
                                title={post.user_name}
                                subheader="September 14, 2016"
                            />
                             <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {post.content}
                                </Typography>
                            </CardContent>
                            
                            <div className="div-home-image">
                            {
                                post.imageURL.map((img) => {
                                    return (
                                        <CardMedia
                                            component="img"
                                            image={img}
                                            alt="Paella dish"
                                            className={classes.homeImage}
                                        />
                                        )
                                    })
                                }
                                </div>
                           
            
                            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                            </Collapse> */}
            
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
                    )
                })
            }
           
        </>
    )
}

export default Home;
