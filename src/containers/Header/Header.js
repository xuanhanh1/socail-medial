import React, { useEffect, useState, useContext } from "react";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import { Paper, ListItemButton, Avatar } from '@mui/material';
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
import PopupNotifi from "../../compoments/Popup/PopupNotifi"
import PopupMess from "../../compoments/Popup/PopupMess"
import firebase from "firebase"
import { db, auth, provider } from "../../firebase";
import { userLogin } from '../../App'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import ListNav from "../../compoments/Compoment/ListNav";
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux'

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
const linkStyle = {
    '@media only screen and (max-width:1024px)': {
        display: 'none'
    },

};
const useStyles = makeStyles({
    searchIcon: {
        position: 'absolute',
        top: 0,
        right: '5px',
        cursor: 'pointer'
    },
    iconHeader: {
        color: '#F20519 !important'
    },
    avataLogin: {
        display: 'none !important'
    },
    nameLogin: {
        fontSize: '18px !important'
    },
    searchHeader: {
        fontSize: '18px'
    },
    '@media only screen and (max-width:1024px)': {
        avataLogin: {
            display: 'block !important'
        },
        nameLogin: {
            display: 'none !important'
        }
    },
    '@media only screen and (max-width:740px)': {
        search: {
            display: 'none',
            transform: 'translate(-100%)',

        },
        searchMobile: {
            position: 'fixed',
            top: 0,
            left: 0,
            transform: 'translate(0)',
            transition: 'all 0.5s',
            backgroundColor: '#fff',
            width: '100%',
            zIndex: 1000
        },
        searchIcon: {
            top: '-15px'
        },
        popupLogin: {

        }
    }
});
export default function Header(props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const ariaLabel = { 'aria-label': 'description' };
    const userInfor = useSelector(state => state.userInfor);
    const [login, setLogin] = React.useState(true);
    const [user, setUser] = React.useState()
    const [show, setShow] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);
    const classes = useStyles();

    useEffect(() => {
        setUser(userInfor)
    }, userInfor)

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setLogin(false);

        }).catch((error) => {
            // An error happened.
        });
    }
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
    const showList = () => {
        setShow(!show)
    }
    const hireSearch = () => {
        setShowSearch(!showSearch)
    }
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
                                <label for="nav-input" className="nav-bar">
                                    <ListItemButton>
                                        <FormatListBulletedIcon />
                                    </ListItemButton>
                                </label>
                                <Link to="/" >
                                    <div className="logo">
                                        <img src={Logo}></img>
                                    </div>
                                </Link>
                            </div>
                            <input id="nav-input" hidden className="nav-input" type="checkbox" onChange={showList}></input>
                            <label for="nav-input" className="nav-over"></label>
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
                                            className={showSearch ? classes.searchMobile : classes.search}
                                        >
                                            <Input placeholder="Search..." 
                                            className={classes.searchHeader} 
                                            inputProps={ariaLabel} 
                                            onBlur={hireSearch}
                                            />
                                        </Box>
                                        <Search className={classes.searchIcon} color="primary"
                                            fontSize="large" onMouseOver={hireSearch} />
                                    </div>
                                </div>
                            </div>
                            <div className="header-right">
                                <PopupState variant="popover" popupId="demo-popup-popover">
                                    {(popupState) => (
                                        <div className="header-icon">
                                            <IconButton aria-label={notificationsLabel(100)}
                                                className={classes.iconHeader}
                                                sx={{ mr: 3 }}
                                                variant="contained"
                                                {...bindTrigger(popupState)} >
                                                <Badge badgeContent={10} color='primary' sx={{ color: blue[400] }}>
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
                                        <div className="header-icon">
                                            <IconButton aria-label={notificationsLabel(100)}
                                                sx={{ mr: 3 }}
                                                className={classes.iconHeader}
                                                variant="contained"
                                                {...bindTrigger(popupState)} >
                                                <Badge badgeContent={3} color="primary" sx={{ color: blue[400] }}>
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
                                                    className={classes.btnLogin}
                                                >
                                                    {
                                                        user && user.displayName ?
                                                            (
                                                                <>
                                                                    <Typography variant="caption" display="block" className={classes.nameLogin} gutterBottom>
                                                                        {user.displayName}
                                                                    </Typography>
                                                                    <Avatar src={user && user.photoURL ? user.photoURl : ''}
                                                                        className={classes.avataLogin}
                                                                    />
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>
                                                                    <div className="btn-login">
                                                                        <Link to="/login">
                                                                            <Button>Login</Button>
                                                                        </Link>
                                                                        <Link to="/register" style={linkStyle} >
                                                                            <Button>Sign Up</Button>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="btn-login-mobile">
                                                                        <Link to="/login">
                                                                            <Button>Login</Button>
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                            )
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
                                                                    <Paper className={classes.popupLogin} >
                                                                        <ClickAwayListener onClickAway={handleClose} >
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
            <div className={show ? "list-active" : " list-notactive"}>
                <div className="list-mobile-icon" onClick={showList}>
                    <ListItemButton>
                        <CloseIcon />
                    </ListItemButton>
                </div>
                <ListNav />

            </div>
        </div >
    );
}