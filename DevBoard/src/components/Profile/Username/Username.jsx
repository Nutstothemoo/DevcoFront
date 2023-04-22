/* eslint-disable react/react-in-jsx-scope */
import { useDispatch, useSelector } from 'react-redux'; // Importing two hooks from Redux
import { Text, Input } from '@chakra-ui/react';
import { FaEdit, FaCheck, FaWindowClose } from 'react-icons/fa';
import img from '../../../assets/profile.png';
import { changeUsernameValue } from '../../../features/user/user';

function Username() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.login.user);
  const handleUsernameChange = (evt) => {
    dispatch(changeUsernameValue(evt.target.value));
  };

  return (
    <>
      <Text pl="0"
            mt="10"
            color="primary"
            fontWeight="600">
          Username
      </Text>
      <Input variant="filled"
             placeholder="Last name"
             mt="5"
             value={username}
             onChange={handleUsernameChange}
             bgColor="secondary"
             fontWeight="600"
             color="#505E7B"
             focusBorderColor="primary"
             _focus={{ bg: 'secondary' }} />
    </>
  );
}

export default Username;
