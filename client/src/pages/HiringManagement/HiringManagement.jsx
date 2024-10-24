import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import ApplicationTables from './ViewOnboardingApplications';
import SendLink from './SendRegistration';
import NewUserList from './NewUserList';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const HiringManagement = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                <Tab label='Add New Employee' {...a11yProps(0)} />
                <Tab label='OnBoarding Applications' {...a11yProps(1)} />
            </Tabs>
            <Box
                index={0}
                role='tabpane0'
                hidden={value !== 0}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
            >
                <SendLink />
                <NewUserList />
            </Box>
            <ApplicationTables index={1} value={value} />
        </Box>
    );
};

export default HiringManagement;
