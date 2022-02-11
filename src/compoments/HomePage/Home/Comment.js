import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import avataHome from "../../../image/avata.png";
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';

export default function Comment() {
    return (
        <>
            <div className="card-comment">
                <Avatar
                    alt="Cindy Baker"
                    src={avataHome}
                    sx={{
                        display: 'flex',
                        width: "40px",
                        height: "40px",
                    }}
                />
                <TextField
                    id="standard-basic"
                    placeholder="Viết bình luận tại đây..."
                    variant="standard"
                    fullWidth
                    width="65%"
                    padding="50px"
                />

                <Stack direction="row" spacing={2}>
                    <DriveFileMoveOutlinedIcon
                        sx={{
                            fontSize: "2rem",

                        }}
                    />
                    <SendOutlinedIcon
                        sx={{
                            fontSize: "2rem",
                            color: "#2563eb"
                        }}
                    />

                </Stack>
            </div>
            <List sx={{ bgcolor: 'background.paper', ml: 7 }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </>
    );
}
