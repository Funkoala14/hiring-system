import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isLoggedIn, role } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({username, password}));
    };

    // redirect if logged in
    if (isLoggedIn) {
        if (role === 'HR') {
            navigate('hr/dashboard'); // Hr redirect
        } else {
            navigate('/employee/personal-info'); // employee redirect
        }
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in..' : 'Login'}
                </button>

            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </>
    );
};

export default Login;