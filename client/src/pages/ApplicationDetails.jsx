import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Button, TextField, Box, Paper, CircularProgress,
  Breadcrumbs, Link
} from '@mui/material';

const ApplicationDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/v1/api/onboarding/application/${id}`);
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
      setLoading(false);
    };

    fetchEmployee();
  }, [id]);

  const updateApplicationStatus = async (status) => {
    const updateData = { status };
    if (status === 'Rejected' && feedback) {
      updateData.feedback = feedback;
    }

    try {
      const response = await fetch(`http://localhost:5000/v1/api/onboarding/application/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        navigate('/hr/hiring-management');
      } else {
        console.error('Error updating status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!employee) {
    return <Typography variant="h6">Employee not found</Typography>;
  }

  return (
    <Box p={3}>
      <Breadcrumbs aria-label='breadcrumb' sx={{ margin: '16px 0' }}>
        <Link underline='hover' color='inherit' onClick={handleGoBack} sx={{ cursor: 'pointer' }}>
          Go Back
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Employee Details</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Employee Details
        </Typography>

        <Box mb={2}>
          <Typography variant="body1">
            <strong>Full Name:</strong> {`${employee.firstName} ${employee.middleName || ''} ${employee.lastName}`}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Preferred Name:</strong> {employee.preferredName || 'N/A'}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Email:</strong> {employee.email}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString() || 'N/A'}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Gender:</strong> {employee.gender || 'N/A'}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="body1">
            <strong>Cell Phone:</strong> {employee.cellPhone || 'N/A'}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Work Phone:</strong> {employee.workPhone || 'N/A'}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="body1">
            <strong>Address:</strong> {`${employee.address.street}, ${employee.address.city}, ${employee.address.state} ${employee.address.zipCode}`}
          </Typography>
        </Box>

        {employee.emergencyContacts && employee.emergencyContacts.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Emergency Contacts
            </Typography>
            {employee.emergencyContacts.map((contact, index) => (
              <Box mb={2} key={index}>
                <Typography variant="body1">
                  <strong>Name:</strong> {`${contact.firstName} ${contact.lastName}`}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {contact.phone || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {contact.email || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Relationship:</strong> {contact.relationship || 'N/A'}
                </Typography>
              </Box>
            ))}
          </>
        )}


        <Box mb={2}>
          <Typography variant="body1">
            <strong>Car Info:</strong> {`${employee.carInfo?.make || 'N/A'}, ${employee.carInfo?.model || 'N/A'}, ${employee.carInfo?.color || 'N/A'}`}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="body1">
            <strong>Onboarding Status:</strong> {employee.onboardingStatus?.status}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Feedback:</strong> {employee.onboardingStatus?.feedback || 'No feedback provided'}
          </Typography>
        </Box>

        {employee.onboardingStatus?.status === 'Pending' && (
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateApplicationStatus('Approved')}
              sx={{ mr: 2 }}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowFeedbackInput(true)}
            >
              Reject
            </Button>

            {showFeedbackInput && (
              <Box mt={3}>
                <TextField
                  id="feedback"
                  label="Rejection Feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => updateApplicationStatus('Rejected')}
                  sx={{ mt: 2 }}
                >
                  Submit Rejection
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ApplicationDetails;
