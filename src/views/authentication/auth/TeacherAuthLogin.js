import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import Cookies from 'universal-cookie';
import StudentLogin from '../../../api/auth/studentLogin';
import TeacherLoginFunction from '../../../api/auth/teacherLogin';
import swal from 'sweetalert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { userSchema } from '../../../validations/UserValidation';

const TeacherAuthLogin = ({ title, subtext }) => {
  const cookies = new Cookies();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessege, setErrorMessege] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [alignment, setAlignment] = useState('Teacher');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };
    if (alignment === 'Teacher') {
      try {
        await userSchema.validate(loginData, { abortEarly: false });
      } catch (error) {
        console.log(error);
      }
      try {
        const responseData = await TeacherLoginFunction(loginData);

        if (responseData.access_token) {
          swal({
            title: 'Done!',
            text: 'Login as an teacher.',
            icon: 'success',
            timer: 1000,
            button: false,
          });

          // Use setTimeout to wait for 2 seconds before executing the following code
          setTimeout(() => {
            cookies.set('token', responseData.access_token, { path: '/' });
            window.location.href = `/home`;
          }, 1000); // Also set the delay here to 2000 milliseconds (2 seconds)
        } else {
          setErrorMessege(responseData.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      const userSchemaResponse = await userSchema.validate(loginData, { abortEarly: false });
      console.log(userSchemaResponse);

      if (userSchemaResponse.error) {
        setErrorMessege(userSchemaResponse.message[0]);
        return;
      }
      try {
        const responseData = await StudentLogin(loginData);
        console.log(responseData);
        if (responseData.access_token) {
          swal({
            title: 'Done!',
            text: 'Login as a Student.',
            icon: 'success',
            timer: 1000, // Set the timer to 2000 milliseconds (2 seconds)
            button: false,
          });

          // Use setTimeout to wait for 2 seconds before executing the following code
          setTimeout(() => {
            cookies.set('student_token', responseData.access_token, { path: '/' });
            window.location.href = `/student/home`;
          }, 1000); // Also set the delay here to 2000 milliseconds (2 seconds)
        } else {
          setErrorMessege(responseData.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Teacher">Teacher</ToggleButton>
          <ToggleButton value="Student">Student</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Typography
        fontWeight="700"
        variant="h6"
        mb={1}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          fontFamily: 'Roboto',
        }}
      >
        Ready to dive back in? Log in as {alignment}!
      </Typography>
      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email Address
          </Typography>
          <CustomTextField id="email" onChange={handleEmailChange} variant="outlined" fullWidth />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            type="password" // Set the input type to "password"
            onChange={handlePasswordChange}
          />
        </Box>

        {alignment !== 'Admin' ? (
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/auth/forgotpassword"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
            }}
          ></div>
        )}
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit" // Use type="submit" to trigger form submission
          sx={{ backgroundColor: '#210F56' }}
        >
          Sign In
        </Button>
        <Typography style={{ color: 'red' }}>{errorMessege}</Typography>
      </Box>
      <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
        <Typography color="textSecondary" variant="h6" fontWeight="500">
          Want to become a {alignment}?
        </Typography>
        <Typography
          component={Link}
          to="/auth/register"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
          }}
        >
          Create an account
        </Typography>
      </Stack>
    </form>
  );
};

export const getAuthToken = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  return token;
};

export default TeacherAuthLogin;
