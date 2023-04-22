import React from 'react';
import {
    Input, InputGroup, InputRightElement, Button, FormLabel, Box,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordValue } from '../../../features/user/user';

function PasswordInput() {
  // initialize 'show' state to false, which will determine whether the password is shown or hidden
  const [show, setShow] = React.useState(false);

  // toggle 'show' state when the user clicks the button
  const handleClick = () => setShow(!show);

  // retrieve the password from the Redux store using the 'useSelector' hook
  const password = useSelector((state) => state.login.password);

  // retrieve the 'dispatch' function from the Redux store using the 'useDispatch' hook
  const dispatch = useDispatch();

  // handle changes to the input field by dispatching a 'changePasswordValue' action
  const handleChange = (evt) => {
    dispatch(changePasswordValue(evt.target.value));
  };

  return (

      <Box>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
              <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={handleChange}
                  required
              />
              <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick} >
                      {show ? 'Hide' : 'Show'}
                  </Button>
              </InputRightElement>
          </InputGroup>
      </Box>

  );
}

// export the PasswordInput component as the default export of this module
export default PasswordInput;
