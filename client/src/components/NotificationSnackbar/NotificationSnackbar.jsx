import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../../store/notificationSlice/notification.slice';

export const NotificationSnackbar = () => {
    const dispatch = useDispatch();
    const { open, message, severity } = useSelector((state) => state.notification);

    const handleClose = (event, reason) => {
        dispatch(clearNotification());
    };

    useEffect(() => {
        if (open) {
            console.log(123);

            const timer = setTimeout(() => {
                dispatch(clearNotification());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [open, dispatch]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
