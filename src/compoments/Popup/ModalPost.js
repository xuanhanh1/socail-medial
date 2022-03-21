import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Card, CardActionArea } from '@mui/material';
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
import { Picker } from 'emoji-mart';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import './popup.scss';
import { makeStyles } from '@mui/styles';
import { db, auth } from '../../firebase'
import moment from 'moment';
import firebase from "firebase";
import { toast } from 'react-toastify';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Video from '../../image/video.mp4'
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

const useStyles = makeStyles({
    postModalmobile: {
        width: 750,
        minHeight: 600,
    },
    inputArea: {
        fontSize: '17px',
        border: 'none',
        paddingLeft: '25px',
        paddingBottom: '15px',
        outline: 'none',
        backgroundColor: 'transparent',
        borderStyle: 'none',
        resize: 'none',
    },
    btnPost: {
        position: 'absolute !important',
        bottom: '35px'
    },
    modalPostGrid:{
        position: 'relative'
    },
    '@media only screen and (max-width:1024px)': {
        postModalmobile: {
            top: '30%'
        }
    },
    '@media only screen and (max-width:740px)': {
        postModalmobile: {
            width: 'auto',
            top: '0 !important',
            bottom: '0 !important',
            left: '0 !important',
            right: '0 !important',
            transform: 'translate(0px, 10px) !important',
        }
    },
});
export default function ModalPost(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [input, setInput] = React.useState('')
    const [image, setImage] = useState([]);
    const [isImage, setIsImage] = useState(false);
    const [isSet, setIsSet] = useState(false);
    const [emoji, setEmoji] = useState(null);
    const classes = useStyles();
    const { user } = props;
    const [file, setFile] = useState(null);
    const [base64URL, setBase64URL] = useState([])

    const handleCloseImgItem = (e) =>{
        var selectedImg = parseInt(e.currentTarget.value);
        var newImages = [];
        var item = image.splice(selectedImg, 1);
        newImages = newImages.concat(image)
        setImage(newImages);
        var newBase64URL = [];
        var itemBase64URL = base64URL.splice(selectedImg, 1);
        newBase64URL = newBase64URL.concat(base64URL);
        setBase64URL(newBase64URL);
    }
    const getBase64 = (file) => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };
    const SubmitPost = () => {
        var createdAt = new Date();
        var myDate = moment(createdAt).format("DD-MM-YYYY").split("-");
        var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
        var data = db.collection("posts").doc();
        data.set({
            content: input,
            imageURL: base64URL,
            user_id: user.uid,
            user_name: user.displayName,
            type: isImage ? "image" : "video",
            photoURL: user.photoURL,
            createdAt: newDate.getTime(),
        })
            .then(() => {
                console.log("Document successfully written!");
               
                // toast.success('post success')
                const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
                toast.promise(
                    resolveAfter3Sec,
                    {
                    pending: 'chờ đợi trong giây lát',
                    success: 'post successfully',
                    }
                )
                setInput('');
                setBase64URL([]);
                setImage([])
            })
            .catch(() => {
                const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
                toast.promise(
                    resolveAfter3Sec,
                    {
                    pending:'chờ đợi trong dây lat' ,
                    error: 'Error file nhiều quá load méo nổi'
                    }
                )
            });
       
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const deCodeBase64 = (files) => {
        var dataBase64 = [];
        for (var i = 0; i < files.length; i++) {
            getBase64(files[i])
                .then(result => {
                    dataBase64.push(result)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        return dataBase64
    }
    const handleChange = async (event) => {
        //convert base 64
        const files = event.target.files;
        const dataImg = await deCodeBase64(files)
        setBase64URL(dataImg);
        //show img
        if (files) {
            const fileArray = Array.from(files).map(file => URL.createObjectURL(file))
            setImage((prevImage) => prevImage.concat(fileArray));
        }
        if (files.length > 0) {
            Array.from(files).map((file) => {
                if (file.type.includes('image')) {
                    setIsImage(true);
                } else if (file.type.includes('video')) {
                    setIsImage(false);
                } else {
                    alert('Please select video or image')
                }
            })
        }
    }
    const choseEmoji = (emoji) => {
        let emojiXX = emoji.native;
        setInput(input + emojiXX);
    }
    return (
        <Card className={classes.postModalmobile} >
            <CardHeader
                avatar={
                    <Avatar src={user && user.photoURL ? user.photoURL : ''}
                    />
                }
                title={user && user.displayName ? user.displayName : ''}
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
                className={classes.inputArea}
            >
            </TextareaAutosize>
            {
                isImage ?
                    <div className="post-img">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 3, md: 12 }}>
                            {
                                image && image.length > 0 ?
                                    image.map((img, i) => {
                                        return (<Grid item xs={3} sm={4} md={4} key={i} 
                                        className={classes.modalPostGrid}>
                                            <IconButton aria-label="add to favorites" 
                                            className={classes.iconClose}
                                            value={i}
                                            onClick={(e) => handleCloseImgItem(e)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: -20
                                                }}
                                                color="secondaryDark"
                                            >
                                                <CancelSharpIcon />
                                            </IconButton>
                                            <img src={img} className="imgGridItem" />
                                        </Grid>)
                                    }) : ''
                            }
                        </Grid>
                    </div> :
                    (
                        <div className="post-img">
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{}}>
                                {
                                    image && image.length > 0 ?
                                        image.map((video, i) => {
                                            return (<Grid item xs={2} sm={4} md={4} key={i}>
                                                <CardActionArea width="auto"
                                                    sx={{
                                                        textAlign: '-webkit-center',
                                                        padding: '10px',
                                                    }}
                                                >
                                                    <CardMedia
                                                        component='video'
                                                        height="auto"
                                                        src={video}
                                                        alt="Paella dish"
                                                        controls
                                                        // autoPlay
                                                        sx={{
                                                            width: "auto",
                                                            height: "400px",
                                                            objectFit: 'cover',
                                                            borderRadius: '5px'
                                                        }}
                                                        className={classes.cartVideo}
                                                    />
                                                </CardActionArea>
                                            </Grid>)
                                        }) : ''
                                }
                            </Grid>
                        </div>
                    )
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
                <Button variant="contained" onClick={SubmitPost} className={classes.btnPost}>Đăng</Button>
            </Stack>
        </Card>
    );
}
