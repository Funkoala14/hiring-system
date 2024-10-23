import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Button, TextField, Box, Paper, CircularProgress,
  Breadcrumbs,
  Link
} from '@mui/material';

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/v1/api/onboarding/application/${id}`);
        const data = await response.json();
        setApplication(data);
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
      setLoading(false);
    };

    fetchApplication();
  }, [id]);

  const updateApplicationStatus = async (status) => {
    const updateData = { status };
    if (status === 'rejected' && feedback) {
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
        navigate('/hr/onboarding-review');
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

  if (!application) {
    return <Typography variant="h6">Application not found</Typography>;
  }

  return (
    <Box p={3}>
      <Breadcrumbs aria-label='breadcrumb' sx={{ margin: '16px 0' }}>
          <Link underline='hover' color='inherit' onClick={handleGoBack} sx={{ cursor: 'pointer' }}>
              Go Back
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Application detail</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Application Details
        </Typography>

        {/* Display application details */}
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Name:</strong> {application.name}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Email:</strong> {application.email}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Status:</strong> {application.status}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Feedback:</strong> {application.feedback || 'No feedback provided'}
          </Typography>
        </Box>

        {/* Approve/Reject section */}
        {application.status === 'pending' && (
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateApplicationStatus('approved')}
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
                  onClick={() => updateApplicationStatus('rejected')}
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
