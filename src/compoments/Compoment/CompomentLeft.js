import React, { useEffect, useState, useContext } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
import logoAvata from '../../image/avata.png';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import VideocamTwoToneIcon from '@mui/icons-material/VideocamTwoTone';
import HomeIcon from '@mui/icons-material/Home';
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import { userLogin } from '../../App'
import { makeStyles } from '@mui/styles';
import ListNav from './ListNav'
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {/* <Link color="inherit" href="https://mui.com/"> */}
            Great war dog cat
            {/* </Link>{' '} */}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
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
const useStyles = makeStyles({
    '@media only screen and (max-width:1024px)': {

    }
});
function CompomentLeft(props) {
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
        <>
            <Grid item xs className={classes.listHomePage}>
                <ElevationScroll {...props}>
                    <AppBar>
                        <Toolbar sx={{ position: 'fixed', top: 70, left: 180, }} >
                            <Typography sx={{ pr: 8 }} >
                                <Item sx={{ pr: 8 }} >
                                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>

                                        <ListNav />
                                    </Box>
                                </Item>

                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>

                <Copyright sx={{ position: 'fixed', bottom: 15, left: 180, ml: 5 }} />
            </Grid>
        </>
    )
}

export default CompomentLeft