/* eslint-disable react/react-in-jsx-scope */
import { useDispatch, useSelector } from 'react-redux'; // Importing two hooks from Redux
import { Text, Input } from '@chakra-ui/react';
import { FaEdit, FaCheck, FaWindowClose } from 'react-icons/fa';
import img from '../../../assets/profile.png';
import { changeFirstnameValue } from '../../../features/user/user';

function Firstname() {
  const dispatch = useDispatch();
  const { firstname } = useSelector((state) => state.login.user);
  const handleFirstnameChange = (evt) => {
    dispatch(changeFirstnameValue(evt.target.value));
  };
  return (
    <>
      <Text pl="0"
            mt="10"
            color="primary"
            fontWeight="600">
          First name
      </Text>
      <Input variant="filled"
             placeholder="First name"
             mt="5"
             value={firstname}
             onChange={handleFirstnameChange}
             bgColor="secondary"
             fontWeight="600"
             color="#505E7B"
             focusBorderColor="primary"
             _focus={{ bg: 'secondary' }}/>
    </>
  );
}

export default Firstname;
