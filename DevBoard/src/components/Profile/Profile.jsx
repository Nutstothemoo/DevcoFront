/* eslint-disable react/react-in-jsx-scope */
import {
  Flex,
  Box,
  Image,
  Button,
  Tag,
  TagLabel,
  Avatar,
  Input,
  Icon,
  IconButton,
  Divider,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, useMediaQuery,
} from '@chakra-ui/react';
import { FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Firstname from './Firstname/Firstname';
import Lastname from './Lastname/Lastname';
import img from '../../assets/profile.png';
import Username from './Username/Username';
import Github from './Github/Github';
import Email from './Email/Email';
import {deleteUser, modifyUser} from '../../features/user/user';
import Notification from '../Notification/Notification';
import { modifyUserPicture } from '../../features/user/user';
import {useNavigate} from "react-router-dom";

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.login);
  const { role, image_path, id } = user;
  const navigateto = useNavigate();
  

  const handleFileSelect = (e) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    console.log(id);
    dispatch(modifyUserPicture({formData, id}));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    dispatch(modifyUser({ user }));
    setTimeout(() => {
      setIsLoading(false);
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 100); // Masquer la notification après 3 secondes
    }, 500);
  };

  const handleDelete = (evt) => {
    if (isLoading) return;
    setIsLoading(true);
    dispatch(deleteUser({ id }));
    setTimeout(() => {
      setIsLoading(false);
      setNotification(true);
      navigateto('/homepage')
      setTimeout(() => {
        setNotification(false);
      }, 100); // Masquer la notification après 3 secondes
    }, 500);
  }

  return (
    <Flex w="98%"
          mt={['5', '5', '10']}
          h={['100%', '100%', '100%', '80%', '80%']}>

      <Box w="100%"
           display="flex"
           flexDirection={['column', 'column', 'column', 'row']}
           bgColor="bgPrimary"
           style={{'backdrop-filter': 'blur(15px)'}}
           borderRadius="md"
           boxShadow="lg"
           zIndex={1}>

        <Box w={['100%', '100%', '100%', '35%', '20%']}
             pr={['0', '0', '0', '0', '10']}>

          <Box display="flex"
               flexDirection="column"
               alignItems={['center', 'center', 'center', 'flex-start']}
               p={['3','10']}>

            <Image
              maxW={['350px', '400px', '400xpx', '200px', '200px']}
              src={`http://tessfanny-server.eddi.cloud:8080/images/${image_path}`}
              fallbackSrc={img}
              borderRadius="md"
              mb="10"
            />
            <IconButton
              aria-label="Upload"
              icon={<FaUpload />}
              size="sm"
              borderRadius="md"
              bg="primary"
              color="black200"
              _hover={{ bg: "secondary" }}
              _active={{ bg: "gray.500" }}
              onClick={() => document.getElementById("fileInput").click()}
            >
            </IconButton>
            <Input
              id="fileInput"
              variant="unstyled"
              type="file"
              onChange={handleFileSelect}
              display="none"
            />
            {!isSmallerThan1000 && (
                <>
                  <Divider bgColor='secondary' h="1px" mt="3.5" mb="3.5" />
                  <Text color="primary" fontWeight="600">Role</Text>
                </>
            )}

            {role && (
              <Tag size="lg"
                   colorScheme="telegram"
                   borderRadius="full"
                   mt="5">

                <Avatar
                  bg="telegram.500"
                  size="xs"
                  ml={-1}
                  mr={2}
                />
                <TagLabel>{role}</TagLabel>
              </Tag>
            )}
            {!isSmallerThan1000 && (
                <>
                  <Divider bgColor='secondary'
                           h="1px" mt="3.5"
                           mb="3.5" />

                  <Text color="primary"
                        fontWeight="600">Account</Text>
                  <Button colorScheme="red" mt="3.5" onClick={onOpen}>Delete</Button>
                </>
            )}

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>If you delete your account, you will no longer be able to access DevBoard unless you create another one.</Text>
                </ModalBody>
                <ModalFooter display="flex" justifyContent="center">
                  <Button onClick={handleDelete} isLoading={isLoading} colorScheme="red">I understand and I want to delete my account</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>



          </Box>
        </Box>

        <Box w={['100%', '100%', '100%', '65%', '45%']}
             display="flex"
             pl={['0', '0', '0', '0', '100']}>

          <Box w="100%"
               display="flex"
               flexDirection="column"
               alignItems="flex-end"
               justifyContent="flex-start"
               height="100%">

            <Box display="flex"
                 justifyContent="space-between"
                 alignItems="flex-start"
                 flexDirection={['column', 'column', 'column', 'row', 'row']}
                 w="100%" pl={['3', '3', '3', '0']}
                 pr={['3', '3', '3', '10']} >

              <Box w={['100%', '100%', '100%', '47%', '47%']}>
                <Username />
                <Email />
                <Github />
              </Box>
              <Box w={['100%', '100%', '100%', '47%', '47%']}>
                <Firstname />
                <Lastname />
              </Box>
            </Box>
            <Box w="100%"
                 display="flex"
                 justifyContent="center"
                 pl={['3', '3', '3', '0']}
                 pr={['3', '3', '3', '10']}
                 pb={['3', '3', '3', '0']}>

              <Box w="100%">
                <Button mt="10" w="100%" style={{backgroundColor: '#D8E5FF'}} color="black200" onClick={handleSubmit} isLoading={isLoading}>Submit</Button>
              </Box>
            </Box>
            </Box>
        </Box>
      </Box>
      {notification && <Notification title="Saved !" description="Your changes have been saved" status="success" />}
    </Flex>
  );
}

export default Profile;
