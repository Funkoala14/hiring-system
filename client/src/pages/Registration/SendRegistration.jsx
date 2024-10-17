import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


export const SendLink = () => {
  const form = useRef();
  const [tokenLink, setTokenLink] = useState('');

  const generateTokenLink = async (name, email) => {
    try {
      const response = await fetch('http://localhost:5000/v1/api/user/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email}),
      });
      
      const data = await response.json();
      if (response.ok) {
        const link = `http://localhost:3000/register?token=${data.token}`;
        setTokenLink(link);
        return link;
      } else {
        console.error('Failed to generate token:', data.message);
      }
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

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
          () => {
            alert('Email sent successfully!');
          },
          (error) => {
            alert(`Failed to send email: ${error.text}`);
          }
        );
    } else {
      console.error('Token link was not generated. Email not sent.');
    }
  };

  return (
    <>
      <h1>Send Link</h1>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" required style={{ backgroundColor: '#fff', color: '#333' }}/>
        <label>Email</label>
        <input type="email" name="email" required style={{ backgroundColor: '#fff', color: '#333' }}/>
        <input type="hidden" name="token_link" value={tokenLink} />
        <input type="submit" value="Send" />
      </form>
    </>
    
  );
};

export default SendLink;
