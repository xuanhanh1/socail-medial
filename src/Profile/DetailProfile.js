import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoAvata from '../image/avata.png';
import Avatar from '@mui/material/Avatar';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Home from '../containers/HomePage/Home/Home'
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    mobileProfileItem:{
        display: 'none',
    },
    '@media only screen and (max-width: 1024px)':{
        profileItem:{
            display: 'none !important',
        },
        mobileProfileItem:{
            display: 'block'
        }
    }
   
})
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function DetailProfile(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const { user } = props;
    const classes = useStyles();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} className={classes.profileItem}>
                <Grid item xs={4} >
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <div className="detail-header">
                            <h3 style={{ paddindLeft: '10px', textAlign: 'center' }}>Giới thiệu</h3>
                        </div>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src={user && user.photoURL ? user.photoURL : ''} />
                                </ListItemIcon>
                                <ListItemText primary={user && user.displayName ? user.displayName : ''} />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1)}
                            >
                                <ListItemIcon>
                                    <ApartmentSharpIcon color="backgroundColorDark" />
                                </ListItemIcon>
                                <ListItemText primary="Phú Hòa, Phú Yên" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2)}
                            >
                                <ListItemIcon>
                                    <WorkIcon color="backgroundColorDark" />
                                </ListItemIcon>
                                <ListItemText primary="133 Tân Cảng, Bình Thạnh" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 4}
                                onClick={(event) => handleListItemClick(event, 4)}
                            >
                                <ListItemIcon>
                                    <SchoolIcon color="backgroundColorDark" />
                                </ListItemIcon>
                                <ListItemText primary="Đh Công Nghệ Thông Tin" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 3}
                                onClick={(event) => handleListItemClick(event, 3)}
                            >
                                <ListItemIcon>
                                    <SportsEsportsIcon color="backgroundColorDark" />
                                </ListItemIcon>
                                <ListItemText primary="Chơi game, nuôi chó" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={8} >
                    <Home />
                </Grid>
            </Grid>
            <Grid item xs={12}  container spacing={2} className={classes.mobileProfileItem} >
                    <Home />
            </Grid>
        </Box>
    );
}
