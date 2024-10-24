import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { post } from '../../services/api';

const SendLink = ({ setUsers, fetchUsers }) => {
    const form = useRef();
    const [tokenLink, setTokenLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generateTokenLink = async (name, email) => {
        try {
            const response = await post('/user/generate-token', { name, email });
            const { data } = response;
            const { registrationLink } = data;
            setTokenLink(registrationLink);
            return registrationLink;
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const email = form.current.email.value;
        const name = form.current.name.value;

        const link = await generateTokenLink(name, email);

        if (link) {
            emailjs
                .send(
                    'service_iqdpwpd',
                    'template_d0bz8dv',
                    {
                        name: name,
                        email: email,
                        token_link: link,
                    },
                    'PvjUfrObRxDIj_W7e'
                )
                .then(
                    async () => {
                        alert('Email sent successfully!');
                        setIsLoading(false);

                        await fetchUsers();
                    },
                    (error) => {
                        alert(`Failed to send email: ${error.text}`);
                        setIsLoading(false);
                    }
                );
        } else {
            console.error('Token link was not generated. Email not sent.');
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box mt={8} display='flex' flexDirection='column' alignItems='center'>
                <Typography component='h1' variant='h5'>
                    Send Registration Link
                </Typography>
                <form ref={form} onSubmit={sendEmail} style={{ width: '100%', marginTop: '1rem' }}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        label='Name'
                        name='name'
                        required
                        style={{ backgroundColor: '#fff' }}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        label='Email'
                        name='email'
                        type='email'
                        required
                        style={{ backgroundColor: '#fff' }}
                    />
                    <input type='hidden' name='token_link' value={tokenLink} />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        style={{ marginTop: '1rem' }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color='inherit' /> : 'Send'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SendLink;
