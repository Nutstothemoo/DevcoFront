/* eslint-disable react/react-in-jsx-scope */
import { useDispatch, useSelector } from 'react-redux'; // Importing two hooks from Redux
import { Text, Input } from '@chakra-ui/react';
import { FaEdit, FaCheck, FaWindowClose } from 'react-icons/fa';
import img from '../../../assets/profile.png';
import { changeLastnameValue } from '../../../features/user/user';

function Lastname() {
  const dispatch = useDispatch();
  const { lastname } = useSelector((state) => state.login.user);
  const handleLastnameChange = (evt) => {
    dispatch(changeLastnameValue(evt.target.value));
  };
  return (
    <>
      <Text pl="0" mt="10" color="primary" fontWeight="600" >Last name</Text>
      <Input variant="filled"
             placeholder="Lastname"
             mt="5"
             value={lastname}
             onChange={handleLastnameChange}
             bgColor="secondary"
             fontWeight="600"
             color="#505E7B"
             focusBorderColor="primary"
             _focus={{ bg: 'secondary' }}/>
    </>
  );
}

export default Lastname;
