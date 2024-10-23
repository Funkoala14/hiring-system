import React, { useEffect } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    List,
    ListItem,
    Divider,
    styled,
    Card,
    Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate, formatDateTime } from '../utils/publicUtils';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const ChatBox = ({ open, onClose, comments, onAddComment, report }) => {
    const [newComment, setNewComment] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleCommentSubmit = () => {
        if (newComment.trim() && !isSubmitting) {
            setIsSubmitting(true);
            onAddComment(newComment);
            setNewComment('');
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        console.log(report);
    }, [report]);

    return (
        <Drawer anchor='right' open={open} onClose={onClose}>
            <DrawerHeader />
            <Box sx={{ width: { xs: 400, sm: 600 }, padding: 2 }}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6'>Comments</Typography>
                </Box>
                <Divider />
                <List sx={{ marginBottom: 2 }}>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <ListItem key={index}>
                                <Typography variant='body2' gutterBottom>
                                    <strong>{comment.createdBy?.username || 'Unknown'} <span style={{fontWeight: 'normal'}}>({formatDateTime(comment.createdAt)})</span>: </strong>
                                    {comment.description}
                                </Typography>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant='body2' sx={{ padding: 1 }}>
                            No comments yet.
                        </Typography>
                    )}
                </List>
                <TextField
                    label='Add a comment'
                    multiline
                    fullWidth
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                    variant='contained'
                    sx={{ mt: 2 }}
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim() || isSubmitting}
                >
                    Submit
                </Button>
            </Box>
        </Drawer>
    );
};

export default ChatBox;
