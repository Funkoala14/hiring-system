import { Box, Tab, Tabs, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApplicationTables from './ViewOnboardingApplications';
import SendLink from './SendRegistration';
import NewUserList from './NewUserList';
import { get } from '../../services/api';  // Import your API utility

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const HiringManagement = () => {
    const [value, setValue] = useState(0);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Function to fetch users
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await get('/user/all-users');
            setUsers(data);
        } catch (err) {
            setError('Error fetching users.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                <Tab label='Add New Employee' {...a11yProps(0)} />
                <Tab label='OnBoarding Applications' {...a11yProps(1)} />
            </Tabs>
            <Box
                index={0}
                role='tabpanel'
                hidden={value !== 0}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
            >
                <SendLink setUsers={setUsers} fetchUsers={fetchUsers} />
                <NewUserList users={users} />
            </Box>
            <ApplicationTables index={1} value={value} />
        </Box>
    );
};

export default HiringManagement;
