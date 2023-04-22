/* eslint-disable react/react-in-jsx-scope */
import { useDispatch, useSelector } from 'react-redux'; // Importing two hooks from Redux
import {
  Text, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import img from '../../../assets/profile.png';

function Github() {
  const { github } = useSelector((state) => state.login.user);

  return (
    <>
      <Text pl="0"
            mt="10"
            mb="5"
            color="primary"
            fontWeight="600">
          GitHub
      </Text>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FaGithub color="grey" />}
        />
        <Input variant="filled"
               placeholder="username"
               isDisabled
               value={github}
               bgColor="secondary"
               fontWeight="600"
               color="#505E7B"  />
      </InputGroup>
    </>
  );
}

export default Github;
