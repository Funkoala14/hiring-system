import React from 'react';
import { Drawer, Box, Typography, IconButton, TextField, Button, List, ListItem, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ChatBox = ({ open, onClose, comments, onAddComment }) => {
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

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: { xs: 300, sm: 400 }, padding: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Comments</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List sx={{ marginBottom: 2 }}>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <ListItem key={index}>
                                <Typography variant="body2" gutterBottom>
                                    <strong>{comment.createdBy?.username || 'Unknown'}: </strong> 
                                    {comment.description}
                                </Typography>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" sx={{ padding: 1 }}>
                            No comments yet.
                        </Typography>
                    )}
                </List>
                <TextField
                    label="Add a comment"
                    multiline
                    fullWidth
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button 
                    variant="contained" 
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
