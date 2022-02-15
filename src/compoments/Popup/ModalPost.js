import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, TextField } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import catanddoc from '../../image/catanddog.jpg';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ModalPost() {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{
            width: 720
        }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }

                title="Bạn đang nghỉ gì?"

            />

            <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
                style={{ width: '100%', height: 360 }}
            />

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <AttachFileIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <InsertEmoticonIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained">Đăng</Button>
            </Stack>
        </Card>
    );
}
