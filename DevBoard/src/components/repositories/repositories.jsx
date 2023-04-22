/* eslint-disable react/react-in-jsx-scope */
import {
  Flex, Text, SimpleGrid, Card, CardHeader, CardBody,
  CardFooter, Heading, Button, IconButton, Center, Box, useMediaQuery, Image,
} from '@chakra-ui/react';
import { SlRefresh } from 'react-icons/sl';
import { FaGithub } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {getRepo, getUserGithubData, getUserGithubRepos} from '../../features/user/user';
import Notification from '../Notification/Notification';
import folderImg from '../../assets/folder-svgrepo-com.svg'
import {useEffect, useState} from "react";

function Repositories() {
  const [rerender, setRerender] = useState(false);
  const { repositories } = useSelector((state) => state.login.user);
  const { status } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const localStoragePopup = localStorage.getItem('popupDisplayed');
  const githubLogged = localStorage.getItem('accessToken');
  const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');

  useEffect(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  if (codeParam && localStorage.getItem('accessToken') === null) {
    async function getAccessToken() {
      try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/getAccessToken?code=${codeParam}`,
        )
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                localStorage.setItem('accessToken', data.access_token);
                setRerender(!rerender);
                getUserGithubData();
                loadRepo()
              }
            });
      } catch (err) {
        console.error(err);
      }
    }
    getAccessToken()

  }
  }, []);
  const HandleGitHubAuth = async () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`,
    );
  };

  const loadRepo = async () => {
    const repo = await getUserGithubRepos();
    dispatch(getRepo(repo));
  };

  const popup = () => {
    if (!localStoragePopup && status !== 'loading') {
      if (status === true) {
        localStorage.setItem('popupDisplayed', true);
        return (
          <Notification
            title="Successfully Connected"
            description="You are now connected !"
            status="info"
          />
        );
      }
    }
  };
  return (
    // Flex container to center and add margin to the grid of Cards
    <Flex w={isSmallerThan1000 ? '100%' : '98%'}
          h="80vh"
          mt={10}
          bgColor="bgPrimary"
          style={{'backdrop-filter': 'blur(15px)'}}
          borderRadius="md"
          boxShadow="lg"
          p="4"
          zIndex={1}>
      <Box h="100%" w="100%" overflowY="auto">

      {githubLogged ? (
        <> 
          <Box display="flex" flexDirection='flex-row' justifyContent='space-between' mb="20px">
          <Text color="primary"
                fontWeight="600"> Overview </Text>
          <IconButton aria-label="refresh repo" icon={<SlRefresh />} onClick={loadRepo} bgColor="secondary" />
          </Box>

          <SimpleGrid spacing={4}
                      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                      w="100%"
                      h="31%">
            {repositories
            && repositories.map((repo) => (
              <Card key={repo.id} w="100%" bgColor="bgPrimary">
                <CardHeader display="flex" justifyContent="center" pb="0">
                  <Heading size="md" color="primary">{repo.name}</Heading>
                </CardHeader>
                <CardBody display="flex" flexDirection="column" alignItems="center" pb="0">
                  <Image src={folderImg} boxSize="120px"></Image>
                  <Text textAlign="center" mt="5" fontSize="14px" color="primary" fontWeight="600">{repo.description}</Text>
                </CardBody>
                <CardFooter display="flex" justifyContent="center">
                  <Button as="a" href={repo.html_url} style={{backgroundColor: '#D8E5FF'}} color="black200" target="_blank">View here</Button>
                </CardFooter>
              </Card>
            ))}

          </SimpleGrid>      

        </>

      ) : (
        <Flex w="100%" justifyContent="center" pt="10">
          <Box w={isSmallerThan1000 ? "100%" : "50%"} h="30%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" bgColor="bgPost" borderRadius="md" boxShadow="md" p="4">
            <Text fontWeight="600" fontSize="lg" color="black100" textAlign="center">
              You are not logged with GitHub,
              make sure you are connected to see your repositories.

            </Text>
            <Button
              loadingText="Submitting"
              mt="10"
              bg="gray.900"
              size="lg"
              color="white"
              leftIcon={<FaGithub />}
              _hover={{
                bg: 'black',
                border: 'transparent',
              }}
              onClick={HandleGitHubAuth}
            >
              <Center>
                <Text>Sign in with Github</Text>
              </Center>
            </Button>
          </Box>
        </Flex>
      )}
      </Box>
      {popup()}
    </Flex>

  );
}

export default Repositories;
