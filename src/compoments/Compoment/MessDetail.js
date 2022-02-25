import React, { useState } from "react";
import { ListItem, AppBar, Toolbar, Box } from '@mui/material/';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import logoAvata from '../../image/avata.png'
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Grid from '@mui/material/Grid';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import PropTypes from 'prop-types';
import './Message.scss'
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
function MessDetail() {
    const [expanded, setExpanded] = React.useState(false);
    const [input, setInput] = React.useState('')
    const [image, setImage] = useState([]);
    const [isImage, setIsImage] = useState(false);

    const choseEmoji = (emoji, event) => {
        let emojiXX = emoji.native;
        setInput(input + emojiXX);
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleChange = (event) => {
        const imageList = event.target.files;
        // console.log(imageList)
        if (imageList) {
            const fileArray = Array.from(imageList).map(file => URL.createObjectURL(file))
            console.log(fileArray)
            setImage((prevImage) => prevImage.concat(fileArray));
        }
        if (imageList.length > 0) {
            if (!isImage) {
                setIsImage(true);
            }
        }

    }
    return (
        <>
            <Box
                sx={{
                    boxShadow: 1,
                    width: 'auto',
                    height: 'auto',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    p: 1,
                    m: 1,
                    borderRadius: 0,
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    height: '95vh',
                    position: 'relative',
                }}
            >
                {/* <AppBar > */}
                {/* <Toolbar> */}
                <div className="mess-detail-header">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src={logoAvata} />
                            </ListItemIcon>
                            <ListItemText primary="Xuân Hạnh" />
                        </ListItemButton>
                    </ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <MoreVertIcon />
                        </ListItemIcon>
                    </ListItemButton>
                </div>
                {/* </Toolbar> */}

                {/* </AppBar> */}
                <div className="mess-content">
                    <div className="mess-content-a">
                        <span>Messagener </span>
                    </div>
                    <div className="mess-content-b">

                        <span>Messagener </span>
                    </div>
                    <div className="mess-content-a">
                        <span>Messagener </span>
                    </div>

                </div>
                <div className="mess-action">
                    <div className="mess-action-input">
                        <input type="text"></input>
                        <div className="mess-action-input-icon">
                            <CardActions disableSpacing>
                                <div className="file-action" >
                                    <input id="file-input" accept="image/*|video/*"
                                        type="file"
                                        onChange={handleChange}
                                        multiple="multiple"
                                        style={{ display: 'none' }}
                                        onClick={e => (e.target.value = null)}
                                        webkitdirectory
                                    />
                                    <IconButton  >
                                        <label for="file-input" >
                                            <AttachFileIcon />
                                        </label>
                                    </IconButton>
                                </div>
                                <div className="icon-feel">

                                    <PopupState variant="popover" popupId="demo-popup-popover">
                                        {(popupState) => (
                                            <div>
                                                <IconButton aria-label="share"
                                                    {...bindTrigger(popupState)} >

                                                    <InsertEmoticonIcon />
                                                </IconButton>
                                                <Popover
                                                    {...bindPopover(popupState)}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                >
                                                    <div className="emoji">
                                                        <Picker set='apple'
                                                            onClick={choseEmoji}
                                                        />
                                                    </div>
                                                </Popover>
                                            </div>
                                        )}
                                    </PopupState>
                                </div>

                            </CardActions>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default MessDetail