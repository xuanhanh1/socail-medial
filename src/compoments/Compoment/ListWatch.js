import * as React from 'react';
import Box from '@mui/material/Box';
import { CardActionArea, Card, Avatar, IconButton, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Video from '../../image/video.mp4'
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
import Comment from './Comment'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles({
    '@media only screen and (max-width:740px)': {
        cartVideo: {
            width: 'auto !important',
        }
    },
})
export default function ListImageTrending() {
    const classes = useStyles();
    return (
        <Box sx={{
            // height: '100vh'
            marginBottom: '10px'
        }}>
            <Card raised={true}>
                <CardHeader
                    avatar={
                        <Avatar sx={{}} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <PopupState variant="popper" popupId="demo-popup-popper" >
                            {(popupState) => (
                                <div >
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
                <CardActionArea width="auto"
                    sx={{
                        textAlign: '-webkit-center',
                        padding: '10px',
                    }}
                >
                    <CardMedia
                        component='video'
                        height="auto"
                        src={Video}
                        alt="Paella dish"
                        controls
                        autoPlay
                        sx={{
                            width: "450px",
                            height: "600px",
                            objectFit: 'cover',
                            borderRadius: '5px'
                        }}
                        className={classes.cartVideo}
                    />
                </CardActionArea>

                <Comment />
            </Card>
        </Box >
    );
}

