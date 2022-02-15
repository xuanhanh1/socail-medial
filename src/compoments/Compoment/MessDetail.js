import React from 'react'
import { ListItem, AppBar, Toolbar, Box } from '@mui/material/';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import logoAvata from '../../image/avata.png'
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useScrollTrigger from '@mui/material/useScrollTrigger';
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
                }}
            >
                <AppBar >
                    <Toolbar>
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
                    </Toolbar>

                </AppBar>
            </Box>
        </>
    )
}

export default MessDetail