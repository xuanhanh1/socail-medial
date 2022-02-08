import * as React from 'react';
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
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { blue } from '@mui/material/colors';
import { Search, ChatBubbleOutline, NotificationsActive } from '@mui/icons-material';

export default function Header() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const ariaLabel = { 'aria-label': 'description' };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
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

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <div className="logo">
                        <img src={Logo}></img>
                    </div>


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
                    <ChatBubbleOutline className="header-icon" sx={{ color: blue[400] }} />
                    <NotificationsActive className="header-icon" sx={{ color: blue[400] }} />
                    <span className="header-right-span"> 1</span>
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
                                        Xuân Hạnh
                                    </Button>
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
                                                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}