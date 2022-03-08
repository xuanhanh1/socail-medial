import React, { useEffect, useState, useContext } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Avatar from '@mui/material/Avatar';
import PeopleIcon from '@mui/icons-material/People';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VideocamTwoToneIcon from '@mui/icons-material/VideocamTwoTone';
import HomeIcon from '@mui/icons-material/Home';
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import { userLogin } from '../../App'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    '@media only screen and (max-width:1024px)': {

    }
});
function ListNav(props) {
    let trend = props.trend
    const userRef = useContext(userLogin);
    const [login, setLogin] = React.useState(true);
    const [user, setUser] = React.useState()
    const classes = useStyles();
    useEffect(() => {
        if (login) {
            setUser(userRef);
        } else {
            setUser()
        }
    }, [userRef])
    return (
        <nav aria-label="main mailbox folders">
            <List>
                {
                    user && user.displayName ?
                        (
                            <ListItem disablePadding>
                                <Link to="profile">

                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Avatar alt="Remy Sharp"
                                                src={user.photoURL ? user.photoURL : ''}
                                            >
                                            </Avatar>

                                        </ListItemIcon>
                                        <ListItemText primary={user.displayName} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ) : (
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <Link to="/">
                                        {/* <Button href='/trend'> */}
                                        {trend ?
                                            <ListItemText primary="home"
                                                sx={{ color: 'red' }}
                                            />
                                            : <ListItemText primary="home" />
                                        }
                                        {/* </Button> */}
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        )
                }

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <WhatshotIcon />
                        </ListItemIcon>
                        <Link to="trend">
                            {/* <Button href='/trend'> */}
                            {trend ?
                                <ListItemText primary="Trending"
                                    sx={{ color: 'red' }}
                                />
                                : <ListItemText primary="Trending" />
                            }
                            {/* </Button> */}
                        </Link>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <VideocamTwoToneIcon />
                        </ListItemIcon>
                        <Link to="watch">
                            {/* <Button href='/watch'> */}
                            <ListItemText primary="Watch" />
                            {/* </Button> */}
                        </Link>
                    </ListItemButton>
                </ListItem>
                {
                    user && user.displayName ?
                        (

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <Link to="friend">
                                        <ListItemText primary="Friend" />
                                    </Link>
                                </ListItemButton>
                            </ListItem>


                        ) : ''
                }
                {
                    user && user.displayName ?
                        (
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MapsUgcOutlinedIcon />
                                    </ListItemIcon>
                                    <Link to="/message">
                                        <ListItemText primary="Message" />
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        ) : ''
                }
                {
                    user && user.displayName ? (
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Setting" />
                            </ListItemButton>
                        </ListItem>
                    ) : ''
                }

            </List>
        </nav>
    )
}

export default ListNav