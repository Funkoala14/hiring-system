import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/auth/auth.selector';

const useUsername = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extract username from query params
  const queryUsername = queryParams.get('username');

  // Extract username from Redux state
  const { username: reduxUsername } = useSelector(selectIsLoggedIn);

  // Use queryUsername if available, otherwise use reduxUsername
  const username = queryUsername || reduxUsername;

  return username;
};

export default useUsername;
