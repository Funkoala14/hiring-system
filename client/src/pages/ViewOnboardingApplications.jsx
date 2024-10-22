import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tabs, Tab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Button, Typography, Box
} from '@mui/material';

const ApplicationTables = () => {
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchApplications = async (status) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/v1/api/onboarding/${status.toLowerCase()}`);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications(activeTab);
  }, [activeTab]);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const renderTableRows = () => {
    return applications.map((app) => (
      <TableRow key={app._id}>
        <TableCell sx={{ width: '30%' }}>{app.name}</TableCell>
        <TableCell sx={{ width: '50%' }}>{app.email}</TableCell>
        <TableCell sx={{ width: '20%', textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/hr/application/${app._id}`)}>
            View Application
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  const getTableTitle = () => {
    switch (activeTab) {
      case 'pending':
        return 'Pending Applications';
      case 'rejected':
        return 'Rejected Applications';
      case 'approved':
        return 'Approved Applications';
      default:
        return '';
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Onboarding Application Review
      </Typography>

      <Paper elevation={3} sx={{ marginBottom: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Pending" value="pending" />
          <Tab label="Rejected" value="rejected" />
          <Tab label="Approved" value="approved" />
        </Tabs>
      </Paper>

      <Typography variant="h5" gutterBottom>
        {getTableTitle()}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Full Name</TableCell>
                <TableCell sx={{ width: '50%' }}>Email</TableCell>
                <TableCell sx={{ width: '20%', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.length > 0 ? (
                renderTableRows()
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">No applications found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ApplicationTables;
