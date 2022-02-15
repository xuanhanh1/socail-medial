import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Container, CardMedia, Button } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import catanddog from '../image/catanddog.jpg';
import SettingsIcon from '@mui/icons-material/Settings';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import Header from '../compoments/Header/Header'
import PostAddIcon from '@mui/icons-material/PostAdd';
import Avata from '../image/avata.png';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import './Profile.scss';
import DetailProfile from './DetailProfile';

function Profile(props) {
    const [expanded, setExpanded] = React.useState(false);
    const { sx, ...other } = props;
    return (<div>
        <Header />
        <Container>
            <Card sx={{
                ml: 2,
                mr: 2,
                alignItems: 'center',
                mb: 5,
                mt: 10,
                // height: '95vh'

            }} elevation={8}>
                <div className="profile-header">
                    <div className="profile-header-img">
                        <img src={catanddog} />
                    </div>
                    <div className="profile-header-icon">
                        <ListItemButton sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            fontSize: '28px',
                            backgroundColor: 'white',
                        }}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Thay đổi" />
                        </ListItemButton>
                    </div>
                </div>
                <div className="profile-content" >
                    <div className="profile-content-left">
                        <div className="profile-content-img">
                            <img src={Avata} />
                        </div>
                        <div className="profile-content-lable">
                            <h3> Xuân hạnh</h3>
                            <AvatarGroup total={24}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        </div>
                    </div>
                    <div className="profile-content-right">
                        <Button variant="contained"
                            sx={{ mr: 2 }}
                        >Contained</Button>
                        <Button variant="contained">
                            <BorderColorTwoToneIcon />
                            Chỉnh sửa Profile
                        </Button>
                    </div>

                </div>
                <hr></hr>
                <div className="profile-action">
                    <Button variant="outlined">
                        <ListItemButton>
                            <ListItemIcon>
                                <PostAddIcon />
                            </ListItemIcon>
                            Post
                        </ListItemButton>
                    </Button>
                    <ListItemIcon>
                        <LensBlurIcon />
                        <LensBlurIcon />
                    </ListItemIcon>

                    <Button variant="outlined">
                        <ListItemButton>
                            <ListItemIcon>
                                <BookmarkAddedIcon />
                            </ListItemIcon>
                            Save
                        </ListItemButton>

                    </Button>
                </div>
                <hr></hr>
                <DetailProfile ></DetailProfile>

            </Card >
        </Container>
    </div>)
}

export default Profile;
