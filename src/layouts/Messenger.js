import React, { useEffect, useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, Container, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MessItem from '../compoments/Compoment/MessItem'
import Header from '../containers/Header/Header';
import MessDetail from '../compoments/Compoment/MessDetail';
import { makeStyles } from '@mui/styles'
import './Layout.scss'



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const useStyles = makeStyles({
    '@media only screen and (max-width: 1024px)': {
        mess: {
            flexDirection: 'column !important',
        },
        messDetail: {
            maxWidth: '100% !important',
        }

    }
})
export default function Messenger() {
    const classes = useStyles();
    return (
        <div className="mess-body">
            <Header />
            <Container>
                <Box sx={{ flexGrow: 1, mt: 6, height: '100vh' }}>

                    <Grid container spacing={2} className={classes.mess}>
                        <Grid item xs={6} md={4} className={classes.messDetail}>
                            <div className="mess-header">
                                <h2>Messagener</h2>
                                <Divider
                                    sx={{ mb: 2 }}
                                />
                            </div>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search in messages"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>

                            <MessItem />
                        </Grid>
                        <Grid item xs={6} md={8} sx={{ position: 'relative' }} className={classes.messDetail}>
                            <MessDetail />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}
