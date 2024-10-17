import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/v1/api/user/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.ok) {
          setEmail(data.email);
          setIsTokenValid(true);
        } else {
          console.error('Token validation failed:', data.message);
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    // Not completed just a simple log
    e.preventDefault();
    alert('Registered successfully!');
  };

  return (
    <div>
      {isTokenValid ? (
        <>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="string" name="username" style={{ backgroundColor: '#fff', color: '#333' }}/>
            <label>Email</label>
            <input type="email" name="email" value={email} readOnly style={{ backgroundColor: '#fff', color: '#333' }}/>
            <label>Password</label>
            <input type="password" name="password" required style={{ backgroundColor: '#fff', color: '#333' }}/>
            <input type="submit" value="Register" />
          </form>
        </>
        
      ) : (
        <p>Invalid or expired registration link. Please request a new one.</p>
      )}
    </div>
  );
};

export default RegistrationPage;
