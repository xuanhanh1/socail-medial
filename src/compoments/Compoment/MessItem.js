import React, { useEffect, useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import CustomScrollbars from '../Compoment/Scrollbar'
// import { userLogin } from '../../App'
import { db, } from '../../firebase'
const useStyles = makeStyles({
    messItem: {
        overflow: 'scroll',
        height: '60vh'
    },
    active: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    '@media only screen and (max-width:1024px)': {
        inbox: {
            // display: 'none'
        }
    }

})
const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',

});


export default function MessItem() {
    const [user, setUser] = React.useState()
    const classes = useStyles();
    const [isActive, setIsActive] = useState();
    const listFriend = (user) => {
        console.log(user)
        let friendRef = db.collection("chat").doc("M2uarcOxNarLdCpVk4mI")
        friendRef.onSnapshot((doc) => {
            // console.log("Current data: ", doc.data());
        });
    }

    const handleSeleted = (e) => {
        let currentValue = e.currentTarget.value;
        setIsActive(currentValue)
    }
    return (
        <React.Fragment>

            <CssBaseline />
            <Paper square sx={{ pb: '50px' }} className={classes.inbox}>
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    Inbox
                </Typography>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <List sx={{ mb: 2 }} className={classes.messItem}>
                        {messages.map(({ id, primary, secondary, person }) => (
                            <React.Fragment key={id}>
                                <ListItem disablePadding onClick={(e) => { handleSeleted(e) }} value={id}
                                    className={isActive === id ? classes.active : ''}
                                >
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar alt="Profile Picture" src={person} />
                                        </ListItemAvatar>
                                        <ListItemText primary={primary} secondary={secondary} />
                                    </ListItem>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </CustomScrollbars>
            </Paper>
        </React.Fragment >
    );
}

const messages = [
    {
        id: 1,
        primary: 'xuân hạnh',
        secondary: "I'll be in the neighbourhood ",
        person: '/static/images/avatar/5.jpg',
    },
    {
        id: 2,
        primary: 'Birthday Gift',
        secondary: `Do you have a suggestion for a `,
        person: '/static/images/avatar/1.jpg',
    },
    {
        id: 3,
        primary: 'Recipe to try',
        secondary: 'I am try out this new ',
        person: '/static/images/avatar/2.jpg',
    },
    {
        id: 4,
        primary: 'Yes!',
        secondary: 'I have the tickets',
        person: '/static/images/avatar/3.jpg',
    },
    {
        id: 5,
        primary: "Doctor's Appointment",
        secondary: 'My appointment for ',
        person: '/static/images/avatar/4.jpg',
    },
    {
        id: 6,
        primary: 'Discussion',
        secondary: `Menus that are `,
        person: '/static/images/avatar/5.jpg',
    },
    {
        id: 7,
        primary: 'Summer BBQ',
        secondary: `Who wants to have a `,
        person: '/static/images/avatar/1.jpg',
    },
];
