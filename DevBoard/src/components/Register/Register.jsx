/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeEmailValue,
  changePasswordValue,
  changeConfirmPasswordValue,
  changeUsernameValue,
  registerUser,
} from '../../features/register/register';
import { getUserGithubData } from '../../features/user/user';
import PropTypes from "prop-types";
import Notification from "../Notification/Notification.jsx";
// Hooks for state management
function Register({setShowDiv, setShowLogin, onRegisterSuccess}) {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPasswordConfirmed, setPasswordConfirmed] = useState(true);
  const [isUsernameValid, setUsernameValid] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');

  const dispatch = useDispatch();
  const {
    username, email, password, confirmPassword,
  } = useSelector(
    (state) => state.register,
  );
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    switch (true) {
      case username.trim() === '':
        setUsernameValid(false);
        return;
      case !emailRegex.test(email):
        setUsernameValid(true);
        setEmailValid(false);
        return;
      case !passwordRegex.test(password):
        setEmailValid(true);
        setPasswordValid(false);
        return;
      case password !== confirmPassword:
        setPasswordValid(true);
        setPasswordConfirmed(false);
        return;
      default:
        setUsernameValid(true);
        setEmailValid(true);
        setPasswordValid(true);
        setPasswordConfirmed(true);
        setIsLoading(true);
        try {
          const response = await dispatch(registerUser({
            username, email, password, passwordConfirm: confirmPassword,
          }));

          if (response?.payload?.status === 201) {
            setNotificationMessage('Your account has been registered successfully');
            setNotificationStatus('info');
            setNotification(true);
            onRegisterSuccess(true);
            setIsLoading(false);
          } else {
            setNotificationMessage('Usarname or email incorrect');
            setNotificationStatus('error');
            setNotification(true);
            setIsSubmitted(false)
            setIsLoading(false);
            setTimeout(() => {
              setNotification(false);
            }, 1000);
          }
          } catch (error) {
          setIsLoading(false);
          setNotificationMessage('Serveur Error');
          setNotificationStatus('error');
          setNotification(true);
          setTimeout(() => {
            setNotification(false);
          }, 1000);
        }
    }
  };
  const handleInputChange = (dispatch, actionCreator) => (evt) => {
    dispatch(actionCreator(evt.target.value));
  };

  const handleLogin = () => {
    setShowDiv(false);
    setShowLogin(true);
  }
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
            Sign Up
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center">
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box w="100%" h="70%" display="flex" justifyContent="space-around" alignItems="center" bgColor="gray.50" flexDirection="column" borderRadius="md" boxShadow="md">
          <Box w="90%" h="85%" display="flex" justifyContent="center">
            <Stack spacing={4} w="80%" h="100%">
              <FormControl id="firstName" isRequired isInvalid={!isUsernameValid} >
                <FormLabel mx="auto">Username</FormLabel>
                <Input
                    type="text"
                    onChange={handleInputChange(dispatch, changeUsernameValue)}

                />
                {!isUsernameValid && (
                    <FormErrorMessage>Username is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="email" isRequired isInvalid={!isEmailValid}>
                <FormLabel>Email address</FormLabel>
                <Input
                    type="email"
                    placeholder="Devboarduser@email.com"
                    value={email}
                    onChange={handleInputChange(dispatch, changeEmailValue)}
                    required
                />
                {!isEmailValid && (
                    <FormErrorMessage>Email is invalid.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="password" isRequired isInvalid={!isPasswordValid}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleInputChange(dispatch, changePasswordValue)}
                  />
                  <InputRightElement h="full">
                    <Button
                        variant="ghost"
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                {!isPasswordValid && (
                    // eslint-disable-next-line max-len
                    <FormErrorMessage>
                      Your password must contain at least one uppercase letter, one
                      number, and one special character, and must not be empty and
                      have min 8 characters.
                    </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                  id="confirmpassword"
                  isRequired
                  isInvalid={!isPasswordConfirmed}
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleInputChange(
                          dispatch,
                          changeConfirmPasswordValue,
                      )}
                  />
                  <InputRightElement h="full">
                    <Button
                        variant="ghost"
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!isPasswordConfirmed && (
                    <FormErrorMessage>Password does not match.</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    loadingText="Submitting"
                    size="lg"
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: 'blue.500',
                      border: 'transparent',
                    }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align="center">
                  Already a user?
                  {' '}
                  <Link onClick={handleLogin} color="blue.400">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Box>
        {notification && (
            <Notification
              title={notificationStatus === 'info' ? 'Congratulations !' : 'Error'}
              description={notificationMessage}
              status={notificationStatus}
            />
          )}
      </Flex>
  );
}

Register.propTypes = {
  setShowDiv: PropTypes.func,
  setShowLogin: PropTypes.func,
  onRegisterSuccess: PropTypes.func,
};

export default Register;

