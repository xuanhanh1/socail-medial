import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Avatar from '@mui/material/Avatar';
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
import catanddog from '../../image/catanddog.jpg';
import './popup.scss';

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


export default function ModalPost() {
    const [expanded, setExpanded] = React.useState(false);
    const [input, setInput] = React.useState('')
    const [image, setImage] = useState([]);
    const [isImage, setIsImage] = useState(false);
    const [emoji, setEmoji] = useState(null);
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
    const choseEmoji = (emoji, event) => {
        let emojiXX = emoji.native;
        setInput(input + emojiXX);
    }
    console.log(emoji)
    return (
        <Card sx={{
            width: 720
        }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }

                title="Xuân Hạnh"

            />

            <TextareaAutosize
                maxRows={8}
                aria-label="maximum height"
                placeholder="Bạn đang suy nghỉ cái quần què gì"
                value={input}
                onChange={event => setInput(event.target.value)}
                style={{
                    width: '100%',
                    display: 'scroll',
                }}
            >

            </TextareaAutosize>
            {
                isImage ?
                    <div className="post-img">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                            {
                                image && image.length > 0 ?
                                    image.map((img, i) => {
                                        return (<Grid item xs={2} sm={4} md={4} key={i}>
                                            <img src={img} />
                                        </Grid>)
                                    }) : ''
                            }
                        </Grid>

                    </div> : ''
            }

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
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained">Đăng</Button>
            </Stack>
        </Card>
    );
}
