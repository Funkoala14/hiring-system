import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, IconButton, Collapse } from '@mui/material';
import { get } from '../../services/api';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row({user}) {
  const [open, setOpen] = React.useState(false);

  return (
      <React.Fragment>
          <TableRow>
              <TableCell>
                  <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.activated ? 'Yes' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0, wordBreak: "break-word"}} colSpan={4}>
                  <Collapse in={open} timeout='auto' unmountOnExit>
                    <Typography variant="subtitle1" sx={{mt: '0.5rem', fontWeight: "bold"}} component="div">Registration Link</Typography>
                    <Typography variant="body1" sx={{mb: '0.5rem'}} component="div">{user.registrationLink}</Typography>
                  </Collapse>
              </TableCell>
          </TableRow>
      </React.Fragment>
  );
}

const NewUserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
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

    fetchUsers();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        New Employee Registration Status
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Activated</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 && users.map((user) => (
              <Row key={user._id} user={user}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default NewUserList;
