import React from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import Modal from '@mui/material/Modal';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Button from '@mui/material/Button';
import { TextField, Box, Paper } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ModalPost from '../Popup/ModalPost'

const useStyles = makeStyles({
    iconClose: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Post() {
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    return (
        <Box sx={{
            display: 'flex',
            '& > :not(style)': {
                m: 1,
                width: '100%',
                height: 180,
            },
        }}>
            <Paper variant="outlined" onClick={handleOpen} >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <TextField
                        helperText=" "
                        id="demo-helper-text-aligned-no-helper"
                        label="Xuân Hạnh ơi, bạn đang nghỉ gì thế? "
                        fullWidth
                    />
                </ListItem>
                <Divider variant="inset" />
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{
                        mt: 2,
                        justifyContent: 'space-around',
                        height: 'auto'
                    }}
                    spacing={2}
                >
                    <Button variant="outlined">Video/Hình ảnh</Button>
                    <Button variant="outlined">Cảm xúc/ Hoạt động </Button>
                    <Button variant="outlined">Trục tiếp</Button>
                </BottomNavigation>
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} >
                    <IconButton aria-label="add to favorites" className={classes.iconClose}>
                        <CancelSharpIcon />
                    </IconButton>
                    <ModalPost />
                </Box>
            </Modal>
        </Box>
    )
}

export default Post