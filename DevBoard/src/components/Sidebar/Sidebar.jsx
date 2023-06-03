// Import React and useState hooks from the react library
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Import various Chakra-UI components, as well as a few React icons
import {
  Box,
  Flex,
  Spacer,
  useDisclosure,
  Text,
  Button,
  Slide,
  SlideFade,
} from '@chakra-ui/react';
import {
  FaChartLine,
  FaNewspaper,
  FaComments,
  FaFolderOpen,
  FaColumns,
  FaThumbsUp,
  FaUser,
  FaPlusSquare,
  FaRegNewspaper,
  FaCode,
  FaNpm,
} from 'react-icons/fa';
import { BsStackOverflow } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Badge } from '@chakra-ui/react';

function Sidebar({ isOpen, setIsLoading }) {
  // Destructure the isOpen property from the useDisclosure hook
  const { isOpen: isSubOpen, onToggle: onSubToggle } = useDisclosure();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  const handleLinkClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <Box
      h="100vh"
      boxShadow="base"
      overflowY="hidden"
      transition="ease-in-out .2s"
      transform={isOpen ? 'translateX(0)' : '-translateX(100%)'}
      bgColor="bgPrimary"
      style={{ 'backdropFilter': 'blur(15px)' }}
      zIndex={1}
      borderRadius="lg"
      w={['100%']}
    >
      <Flex p="4" alignItems="center" justify="center" gap={"4"}>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
        <path d="M32 4L4 20v24l28 16 28-16V20L32 4zm0 2.828L55.172 20 32 35.172 8.828 20 32 6.828zM6 22.5v19L32 59l26-17.5v-19L32 39.5 6 22.5z" fill="#ffffff"/>
      </svg> 
        <Text fontSize="30px" fontWeight="700" mt="5" color="primary">
          DevGO
        </Text>
      </Flex>
      <Box
        w="100%"
        p="4"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Box
          _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
          mb="5px"
          pl="4"
          display="flex"
          alignItems="center"
          w="100%"
          h="50px"
          borderRadius="md"
          cursor="pointer"
          onClick={() => {
            setActiveRoute('/dashboard');
          }}
          boxShadow={activeRoute === '/dashboard' ? 'md' : ''}
          color={activeRoute === '/dashboard' ? 'secondary' : 'primary'}
          bgColor={activeRoute === '/dashboard' ? 'bgPrimary' : ''}
        >
          <Flex justifyContent="space-around" alignItems="center">
            <FaChartLine />
            <Text pl="4" color="primary" fontWeight="600">
              Dashboard
              <Badge colorScheme="purple">v2</Badge>
            </Text>
          </Flex>
        </Box>

        <Box
          _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
          mb="5px"
          cursor="pointer"
          pl="4"
          display="flex"
          alignItems="center"
          w="100%"
          h="50px"
          borderRadius="md"
          color="primary"
          onClick={onSubToggle}
        >
          <Flex justifyContent="space-around" alignItems="center">
            <FaNewspaper />
            <Text pl="4" color="primary" fontWeight="600">
              News
            </Text>
          </Flex>
        </Box>

        {/* Render the Add Post button inside a slide fade */}
        <Box w="220px">
          <SlideFade in={isSubOpen}>
            {isSubOpen && (
              <Box>
                <Link
                  to="/addpost"
                  style={{ width: '100%', height: '50px', marginBottom: '5px' }}
                >
                  <Box
                    _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
                    pl="8"
                    display="flex"
                    alignItems="center"
                    w="100%"
                    h="50px"
                    borderRadius="md"
                    onClick={() => {
                      handleLinkClick();
                      setActiveRoute('/addpost');
                    }}
                    boxShadow={activeRoute === '/addpost' ? 'md' : ''}
                    color={activeRoute === '/addpost' ? 'secondary' : 'primary'}
                    bgColor={activeRoute === '/addpost' ? 'bgPrimary' : ''}
                  >
                    <Flex justifyContent="space-around" alignItems="center">
                      <FaPlusSquare />
                      <Text pl="4" color="primary" fontWeight="600">
                        Add Post
                      </Text>
                    </Flex>
                  </Box>
                </Link>
                <Link
                  to="/posts"
                  style={{ width: '100%', height: '50px', marginBottom: '5px' }}
                >
                  <Box
                    _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
                    pl="8"
                    display="flex"
                    alignItems="center"
                    w="100%"
                    h="50px"
                    borderRadius="md"
                    onClick={() => {
                      handleLinkClick();
                      setActiveRoute('/posts');
                    }}
                    boxShadow={activeRoute === '/posts' ? 'md' : ''}
                    color={activeRoute === '/posts' ? 'secondary' : 'primary'}
                    bgColor={activeRoute === '/posts' ? 'bgPrimary' : ''}
                  >
                    <Flex justifyContent="space-around" alignItems="center">
                      <FaRegNewspaper />
                      <Text pl="4" color="primary" fontWeight="600">
                        Posts
                      </Text>
                    </Flex>
                  </Box>
                </Link>

                <Link
                  to="/mypost"
                  style={{ width: '100%', height: '50px', marginBottom: '5px' }}
                >
                  <Box
                    _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
                    pl="8"
                    display="flex"
                    alignItems="center"
                    w="100%"
                    h="50px"
                    borderRadius="md"
                    onClick={() => {
                      handleLinkClick();
                      setActiveRoute('/mypost');
                    }}
                    boxShadow={activeRoute === '/mypost' ? 'md' : ''}
                    color={activeRoute === '/mypost' ? 'secondary' : 'primary'}
                    bgColor={activeRoute === '/mypost' ? 'bgPrimary' : ''}
                  >
                    <Flex justifyContent="space-around" alignItems="center">
                      <FaRegNewspaper />
                      <Text pl="4" color="primary" fontWeight="600">
                        My posts
                      </Text>
                    </Flex>
                  </Box>
                </Link>
              
                <Link
                  to="/feed"
                  style={{ width: '100%', height: '50px', marginBottom: '5px' }}
                >
                  <Box
                    _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
                    pl="8"
                    display="flex"
                    alignItems="center"
                    w="100%"
                    h="50px"
                    borderRadius="md"
                    onClick={() => {
                      handleLinkClick();
                      setActiveRoute('/feed');
                    }}
                    boxShadow={activeRoute === '/feed' ? 'md' : ''}
                    color={activeRoute === '/feed' ? 'secondary' : 'primary'}
                    bgColor={activeRoute === '/feed' ? 'bgPrimary' : ''}
                  >
                    <Flex justifyContent="space-around" alignItems="center">
                      <FaRegNewspaper />
                      <Text pl="4" color="primary" fontWeight="600">
                        RSS Feed
                      </Text>
                    </Flex>
                  </Box>
                </Link>
              </Box>
            )}
          </SlideFade>
        </Box>

        <Link
          to="/repositories"
          style={{ width: '100%', height: '50px', marginBottom: '5px' }}
        >
          <Box
            _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
            pl="4"
            display="flex"
            alignItems="center"
            w="100%"
            h="50px"
            borderRadius="md"
            onClick={() => {
              handleLinkClick();
              setActiveRoute('/repositories');
            }}
            boxShadow={activeRoute === '/repositories' ? 'md' : ''}
            color={activeRoute === '/repositories' ? 'secondary' : 'primary'}
            bgColor={activeRoute === '/repositories' ? 'bgPrimary' : ''}
          >
            <Flex justifyContent="space-around" alignItems="center">
              <FaFolderOpen />
              <Text pl="4" color="primary" fontWeight="600">
                Git Projects
              </Text>
            </Flex>
          </Box>
        </Link>

        <Link
            to="/npm"
            style={{ width: '100%', height: '50px', marginBottom: '5px' }}
        >
          <Box
              _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
              pl="4"
              display="flex"
              alignItems="center"
              w="100%"
              h="50px"
              borderRadius="md"
              onClick={() => {
                handleLinkClick();
                setActiveRoute('/npm');
              }}
              boxShadow={activeRoute === '/npm' ? 'md' : ''}
              color={activeRoute === '/npm' ? 'secondary' : 'primary'}
              bgColor={activeRoute === '/npm' ? 'bgPrimary' : ''}
          >
            <Flex justifyContent="space-around" alignItems="center">
              <FaNpm />
              <Text pl="4" color="primary" fontWeight="600">
                Npm
              </Text>
            </Flex>
          </Box>
        </Link>

        <Link
          to="/stackoverflow"
          style={{ width: '100%', height: '50px', marginBottom: '5px' }}
        >
          <Box
            _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
            pl="4"
            display="flex"
            alignItems="center"
            w="100%"
            h="50px"
            borderRadius="md"
            onClick={() => {
              handleLinkClick();
              setActiveRoute('/stackoverflow');
            }}
            boxShadow={activeRoute === '/stackoverflow' ? 'md' : ''}
            color={activeRoute === '/stackoverflow' ? 'secondary' : 'primary'}
            bgColor={activeRoute === '/stackoverflow' ? 'bgPrimary' : ''}
          >
            <Flex justifyContent="space-around" alignItems="center">
              <BsStackOverflow />
              <Text pl="4" color="primary" fontWeight="600">
                Stackoverflow
              </Text>
            </Flex>
          </Box>
        </Link>

        <Link
          to="/playground"
          style={{ width: '100%', height: '50px', marginBottom: '5px' }}
        >
          <Box
            _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
            pl="4"
            display="flex"
            alignItems="center"
            w="100%"
            h="50px"
            borderRadius="md"
            onClick={() => {
              handleLinkClick();
              setActiveRoute('/playground');
            }}
            boxShadow={activeRoute === '/playground' ? 'md' : ''}
            color={activeRoute === '/playground' ? 'secondary' : 'primary'}
            bgColor={activeRoute === '/playground' ? 'bgPrimary' : ''}
          >
            <Flex justifyContent="space-around" alignItems="center">
              <FaCode />
              <Text pl="4" color="primary" fontWeight="600">
                Playground
              </Text>
            </Flex>
          </Box>
        </Link>
        <Link
          to="/kanban"
          style={{ width: '100%', height: '50px', marginBottom: '5px' }}
        >
        <Box
          _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
          pl="4"
          display="flex"
          alignItems="center"
          w="100%"
          h="50px"
          mb="5px"
          borderRadius="md"
          cursor="pointer"
          onClick={() => {
            handleLinkClick();
            setActiveRoute('/kanban');
          }}
          boxShadow={activeRoute === '/kanban' ? 'md' : ''}
          color={activeRoute === '/kanban' ? 'secondary' : 'primary'}
          bgColor={activeRoute === '/kanban' ? 'bgPrimary' : ''}
        >
          <Flex justifyContent="space-around" alignItems="center">
            <FaColumns />
            <Text pl="2" color="primary" fontWeight="600">
              Kanban
            </Text>
          </Flex>
        </Box>
      </Link>
        <Link
          to="/likes"
          style={{ width: '100%', height: '50px', marginBottom: '5px' }}
        >
          <Box
            _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
            pl="4"
            display="flex"
            alignItems="center"
            w="100%"
            h="50px"
            borderRadius="md"
            onClick={() => {
              handleLinkClick();
              setActiveRoute('/likes');
            }}
            boxShadow={activeRoute === '/likes' ? 'md' : ''}
            color={activeRoute === '/likes' ? 'secondary' : 'primary'}
            bgColor={activeRoute === '/likes' ? 'bgPrimary' : ''}
          >
            <Flex justifyContent="space-around" alignItems="center">
              <FaThumbsUp />
              <Text pl="4" color="primary" fontWeight="600">
                Likes
              </Text>
            </Flex>
          </Box>
        </Link>

        <Link
          to="/profile"
          style={{ width: '100%', height: '50px', marginBottom: '5px' }}
        >
          <Box
            _hover={{ backgroundColor: 'bgSecondary', boxShadow: 'lg' }}
            pl="4"
            display="flex"
            alignItems="center"
            w="100%"
            h="50px"
            borderRadius="md"
            onClick={() => {
              handleLinkClick();
              setActiveRoute('/profile');
            }}
            boxShadow={activeRoute === '/profile' ? 'md' : ''}
            color={activeRoute === '/profile' ? 'secondary' : 'primary'}
            bgColor={activeRoute === '/profile' ? 'bgPrimary' : ''}
          >
            <Flex justifyContent="space-around" alignItems="center">
              <FaUser />
              <Text pl="4" color="primary" fontWeight="600">
                Profile
              </Text>
            </Flex>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  setIsLoading: PropTypes.func,
};

export default Sidebar;
