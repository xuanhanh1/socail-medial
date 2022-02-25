import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import './Header.scss';
import Logo from '../../image/logoFB.png';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { blue } from '@mui/material/colors';
import { Search, ChatBubbleOutline, NotificationsActive } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PopupNotifi from "../Popup/PopupNotifi"
import PopupMess from "../Popup/PopupMess"
import firebase from "firebase"
import { db, auth, provider } from "../../firebase";

function notificationsLabel(count) {
    if (count === 0) {
        return 'no notifications';
    }
    if (count > 99) {
        return 'more than 99 notifications';
    }
    return `${count} notifications`;
}
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

var userLocal = JSON.parse(localStorage.getItem('user'));
console.log(userLocal)
export default function Header() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const ariaLabel = { 'aria-label': 'description' };
    const [user, setUser] = React.useState(userLocal)

    useEffect(() => {
        console.log('compoment mound', userLocal)
        setUser(userLocal);
    }, [])
    //open setting
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {

    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setUser()
            localStorage.removeItem('user', user);
        }).catch((error) => {
            // An error happened.
        });
    }
    console.log('begin');
    return (
        <div>
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
                }}
            >
                <AppBar sx={{ bgcolor: 'white', justifyContent: 'center' }}>
                    <Toolbar sx={{ justifyContent: 'center', width: '100%' }}>
                        <div className="header">
                            <div className="header-left">
                                <Link to="/home">
                                    <div className="logo">
                                        <img src={Logo}></img>
                                    </div>
                                </Link>
                            </div>
                            <div className="header-center">
                                <div className="search">
                                    <div className="search-input">
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '35ch' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <Input placeholder="Search..." inputProps={ariaLabel} />
                                        </Box>

                                        <Search className="search-icon" color="primary" fontSize="large" />
                                    </div>
                                </div>
                            </div>
                            <div className="header-right">
                                <PopupState variant="popover" popupId="demo-popup-popover">
                                    {(popupState) => (
                                        <div>
                                            <IconButton aria-label={notificationsLabel(100)}
                                                sx={{ mr: 3 }}
                                                variant="contained"
                                                {...bindTrigger(popupState)} >
                                                <Badge badgeContent={10} color="secondary" sx={{ color: blue[400] }}>
                                                    <ChatBubbleOutline />
                                                </Badge>
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
                                                <PopupMess />
                                            </Popover>
                                        </div>
                                    )}
                                </PopupState>

                                <PopupState variant="popover" popupId="demo-popup-popover">
                                    {(popupState) => (
                                        <div>
                                            <IconButton aria-label={notificationsLabel(100)}
                                                sx={{ mr: 3 }}
                                                variant="contained"
                                                {...bindTrigger(popupState)} >
                                                <Badge badgeContent={100} color="secondary">
                                                    <NotificationsActive />
                                                </Badge>
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
                                                <PopupNotifi />
                                            </Popover>
                                        </div>
                                    )}
                                </PopupState>
                                <div className="file">
                                    {/* <img src={Logo}></img> */}
                                    <div>
                                        <Stack direction="row" spacing={2}>

                                            <div>
                                                <Button
                                                    ref={anchorRef}
                                                    id="composition-button"
                                                    aria-controls={open ? 'composition-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleToggle}
                                                >
                                                    {
                                                        user && user.displayName ? user.displayName :
                                                            <div>
                                                                <Link to="/login">
                                                                    <Button>Login</Button>
                                                                </Link>
                                                                <Link to="/register">
                                                                    <Button>Sign Up</Button>
                                                                </Link>
                                                            </div>
                                                    }
                                                </Button>
                                                {
                                                    user && user.displayName ?
                                                        <Popper
                                                            open={open}
                                                            anchorEl={anchorRef.current}
                                                            role={undefined}
                                                            placement="bottom-start"
                                                            transition
                                                            disablePortal
                                                        >
                                                            {({ TransitionProps, placement }) => (
                                                                <Grow
                                                                    {...TransitionProps}
                                                                    style={{
                                                                        transformOrigin:
                                                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                                    }}
                                                                >
                                                                    <Paper>
                                                                        <ClickAwayListener onClickAway={handleClose}>
                                                                            <MenuList
                                                                                autoFocusItem={open}
                                                                                id="composition-menu"
                                                                                aria-labelledby="composition-button"
                                                                                onKeyDown={handleListKeyDown}
                                                                            >
                                                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                                                <MenuItem onClick={signOut}>Logout</MenuItem>
                                                                            </MenuList>
                                                                        </ClickAwayListener>
                                                                    </Paper>
                                                                </Grow>
                                                            )}
                                                        </Popper>
                                                        : ''
                                                }
                                            </div>
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box >
        </div >
    );
}