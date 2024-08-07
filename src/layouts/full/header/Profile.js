import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import jwt from 'jwt-decode';
import { IconUser } from '@tabler/icons';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import Cookies from 'universal-cookie';
import getTeacher from 'src/api/profile/get_teacher';

export const clearAuthToken = () => {
  // Clear the 'token' cookie by setting its value to an empty string and specifying a past expiration date
  const cookies = new Cookies();
  cookies.set('token', null, { path: '/' });
};

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [teacher, setTeacher] = useState({});
  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const id = jwt(token).id;

      const response = await getTeacher(id, token);
      setTeacher(response);
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    clearAuthToken();
    window.location.href = '/auth/teacherLogin';
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        {teacher.photo === undefined ? (
          <Avatar
            src={ProfileImg}
            alt={ProfileImg}
            sx={{
              width: 35,
              height: 35,
            }}
          />
        ) : (
          <Avatar
            src={teacher.photo}
            alt={teacher.photo}
            sx={{
              width: 35,
              height: 35,
            }}
          />
        )}
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem component={Link} to="/profile">
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText link="profile">My Profile</ListItemText>
        </MenuItem>

        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
