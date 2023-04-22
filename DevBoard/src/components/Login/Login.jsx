/* eslint-disable react/react-in-jsx-scope */
// Import necessary components and libraries
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
  Box,
  Stack,
  Text,
  Heading,
  Link,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'; // Importing two hooks from Redux
import { useState } from 'react'; // Importing useState hook
import { useNavigate } from 'react-router-dom';
import {changeEmailValue, changePasswordValue, login, modifyUser} from '../../features/user/user'; // Importing Redux actions
import PasswordInput from './Password/Password';
import Notification from "../Notification/Notification.jsx";
import Email from "./Email/Email.jsx";
import PropTypes from "prop-types"; // Importing a custom component

function Login({setShowDiv, setShowLogin}) {
  const navigateto = useNavigate();
  // Use the useDispatch and useSelector hooks to access the store and dispatch actions
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.login);
  const { email, password } = user;

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  // Create state variables for email and password validation
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  if(status === true) {
    navigateto('/repositories');
  }

  // Event handler for email input change
  const handleEmailChange = (evt) => {
    dispatch(changeEmailValue(evt.target.value));
    // Dispatch the email change action to the store
    setIsEmailValid(true); // Reset the email validation state variable
  };

  // Event handler for password input change
  const handlePasswordChange = (evt) => {
    dispatch(changePasswordValue(evt.target.value));
    // Dispatch the password change action to the store
  };

  // Event handler for form submission
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (email.trim() === '' || !email.includes('@')) {
      setIsEmailValid(false);
      // Set the email validation state variable to false if the email is not valid
      return;
    }

    if (password.trim() === '') {
      setPasswordValid(false);
      // Set the password validation state variable to false if the password is not valid
      return;
    }

    setIsEmailValid(true); // Reset the email validation state variable
    setPasswordValid(true); // Reset the password validation state variable
    // Dispatch the login action to the store with the email and password as arguments
    if (isLoading) return;
    setIsLoading(true);
    dispatch(login({ email, password }));
    setTimeout(() => {
      setIsLoading(false);
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 300); // Masquer la notification après 3 secondes
    }, 500);
  };

  const handleRegister = () => {
    setShowDiv(true);
    setShowLogin(false);
  }
  // Render the login form using Chakra-UI components
  return (
    <Flex
      w={["100%", "100%", "100%", "452px"]}
      h="100vh"
      align="center"
      justify="space-around"
      bgColor="rgba(247, 250, 252, 0.8)"
      py={[0, 0, 12, 12]} px={[0, 0, 6, 6]}
      flexDirection="column"
    >
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Sign In
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          to get acces to your Dashboard 📊
        </Text>
      </Stack>
      <Box w="100%" h="70%" display="flex" justifyContent="space-around" alignItems="center" bgColor="gray.50" flexDirection="column" borderRadius="md" boxShadow="md">

        <Box w="90%" h="85%" display="flex" justifyContent="center">
          <FormControl isInvalid={!isEmailValid || !isPasswordValid} w="80%" h="100%" display="flex" flexDirection="column" justifyContent="space-around">
            <Box>
              <Email />
              {!isEmailValid && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </Box>

            <Box>
              <PasswordInput />
              {' '}
              {/* Use a custom password input component */}
              {!isPasswordValid && (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </Box>

            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              width="100%"
              size="lg"
              display="flex"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Submit
            </Button>

            <Text align="center">
              You don't have an account ?
              {' '}
              <Link onClick={handleRegister} color="blue.400">
                Register here
              </Link>
            </Text>

          </FormControl>
        </Box>
      </Box>
      {notification && <Notification title="Oupss..." description="Your email/password are incorrect..." status="error" />}
    </Flex>
  );
}

Login.propTypes = {
  setShowDiv: PropTypes.func,
  setShowLogin: PropTypes.func
};

export default Login;
