import React from 'react';
import {
    Input, InputGroup, InputRightElement, Button, FormLabel, Box,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {changeEmailValue} from '../../../features/user/user';

function Email() {


    // retrieve the password from the Redux store using the 'useSelector' hook
    const email = useSelector((state) => state.login.email);

    // retrieve the 'dispatch' function from the Redux store using the 'useDispatch' hook
    const dispatch = useDispatch();

    // handle changes to the input field by dispatching a 'changePasswordValue' action
    const handleChange = (evt) => {
        dispatch(changeEmailValue(evt.target.value));
    };

    return (

        <Box>
            <FormLabel>Email address</FormLabel>
            <Input
                type="email"
                placeholder="Devboarduser@email.com"
                value={email}
                onChange={handleChange}
                required
            />
        </Box>

    );
}

// export the PasswordInput component as the default export of this module
export default Email;
