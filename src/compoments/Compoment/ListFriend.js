import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { Typography, Grid, Divider, ListItemButton, ListItemIcon } from '@mui/material/';
import logoAvata from '../../image/avata.png';
import EmailIcon from '@mui/icons-material/Email';
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles({
    '@media only screen and (max-width:740px)': {
        listFriend: {
            flexDirection: 'column !important',
        },
        itemFriend: {
            maxWidth: '100% !important',
        }
    }
})

export default function ListFriend() {
    const classes = useStyles();
    return (
        <Box
            sx={{
                marginBottom: '10px',
            }}
        >
            <div className="friend-header">
                <h1 >Danh sách bạn bè</h1>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={classes.listFriend}>
                <Grid item xs={6} className={classes.itemFriend} >
                    <Paper sx={{ mb: '10px' }} >
                        <ListItem alignItems="flex-start">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src={logoAvata} />

                                </ListItemIcon>
                                <ListItemText primary="Xuân Hạnh" />
                            </ListItemButton>

                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MapsUgcIcon />
                                </ListItemIcon>
                                <ListItemText primary="Nhắn tin" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CancelIcon />
                                </ListItemIcon>
                                <ListItemText primary="Hủy kết bạn" />
                            </ListItemButton>
                        </ListItem>
                    </Paper>
                </Grid>
                <Grid item xs={6} className={classes.itemFriend}>
                    <Paper >
                        <ListItem alignItems="flex-start">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src={logoAvata} />

                                </ListItemIcon>
                                <ListItemText primary="Xuân Hạnh" />
                            </ListItemButton>

                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MapsUgcIcon />
                                </ListItemIcon>
                                <ListItemText primary="Nhắn tin" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CancelIcon />
                                </ListItemIcon>
                                <ListItemText primary="Hủy kết bạn" />
                            </ListItemButton>
                        </ListItem>
                    </Paper>
                </Grid>

            </Grid>
            <Divider />
            <div className="friend-header">
                <h1 >Thêm bạn mới </h1>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={classes.listFriend}>
                <Grid item xs={6} className={classes.itemFriend}>
                    <Paper >
                        <ListItem alignItems="flex-start">

                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src={logoAvata} />

                                </ListItemIcon>
                                <ListItemText primary="Xuân Hạnh" />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Thêm bạn mới" />
                            </ListItemButton>
                        </ListItem>
                    </Paper>
                </Grid>
                <Grid item xs={6} className={classes.itemFriend}>
                    <Paper >
                        <ListItem alignItems="flex-start">

                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src={logoAvata} />

                                </ListItemIcon>
                                <ListItemText primary="Xuân Hạnh" />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Thêm bạn mới" />
                            </ListItemButton>
                        </ListItem>
                    </Paper>
                </Grid>

            </Grid>
        </Box >
    );
}
