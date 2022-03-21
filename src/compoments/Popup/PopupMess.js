import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import ListItemButton from '@mui/material/ListItemButton';
import { Divider } from '@mui/material';
import {Link, Navigate, useNavigate  } from 'react-router-dom'

export default function PopupMess() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
     let navigate = useNavigate();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        navigate("/message")
    };
    return (
        <Box sx={{
            width: 360,
            maxWidth: 720,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: '80vh',
            '& ul': { padding: 0 },
        }} 
            subheader={<li />}>
            <List component="nav" aria-label="main mailbox folders">
                <div className="popupnotifi-header" >
                    <h3 style={{ paddindLeft: '10px', textAlign: 'center' }} >Mesenger </h3>
                </div>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItemButton>

                <Divider />
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Xuân Hạnh" secondary="Jan 9, 2014" />
                </ListItemButton>

                <Divider />
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItemButton>

                <Divider />
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItemButton>

                <Divider />
            </List>

        </Box>
    );
}
