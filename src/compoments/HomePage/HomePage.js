import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Home from './Home/Home'
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Header from '../Header/Header';
import CompomentLeft from "../Compoment/CompomentLeft"
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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



function HomePage() {

    return (
        <>
            <Header />
            <Box sx={{ flexGrow: 1, mt: 6 }}>
                <CssBaseline />

                <Grid container spacing={1}>

                    <CompomentLeft />

                    <Grid item xs={9} sx={{ alignItems: 'center' }}>
                        <Item>
                            <Home />
                            <Home />
                            <Home />

                        </Item>
                    </Grid>

                </Grid>
            </Box>
        </>
    )

}

export default HomePage;
