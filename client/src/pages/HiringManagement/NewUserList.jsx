import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const NewUserList = ({ users }) => {
  if (users.length === 0) {
    return <Typography variant="h6">No users found.</Typography>;
  }

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        New Employee Registration Status
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Register Link</strong></TableCell>
              <TableCell><strong>Activated</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.registrationLink}</TableCell>
                <TableCell>{user.activated ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default NewUserList;
