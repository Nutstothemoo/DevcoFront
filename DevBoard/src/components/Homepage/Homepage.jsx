import {Box, Button, Flex, Text, useMediaQuery} from '@chakra-ui/react';
import Lottie from 'lottie-react';
import homepage from '../../assets/homepage.json';
import login from '../../assets/security6.json';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { motion } from "framer-motion"
import {useEffect, useState} from 'react';



function Homepage() {

    // Homepage
    const [isRegisterSuccess, setRegisterSuccess] = useState(false);
    const [showDiv, setShowDiv] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showHomepage, setShowHomepage]= useState(true)
    const [isSmallerThan1050] = useMediaQuery('(max-width: 1050px)');

    const showRegister = () => {
      setShowDiv(!showDiv);
      setShowHomepage(!showHomepage);
    };

    const showLoginComponent = () => {
      setShowLogin(!showLogin);
      setShowHomepage(!showHomepage);
    };

    useEffect(() => {
        {isRegisterSuccess &&
            setShowLogin(true)
            setShowDiv(false)
        }
    },[isRegisterSuccess])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: homepage,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
      <Flex zIndex={1}
            w="100%" h="100%"
            flexDirection={['column', 'column','column', 'row']}>

          {showHomepage && (
            <motion.div
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap'}}
                    >


        <Box w={['100%', '100%', '100%', '50%']}
              h={['50%', '50%', '50%', '100%']}
              display="flex"
              justifyContent={['center', 'center', 'center', 'flex-end']}
              alignItems="center"
              pr={['0', '0', '0', '10']}>

          <Box display="flex"
                flexDirection="column"
                w={['90%', '90%', '80%', '60%']} h="100%"
                alignItems="center"
                justifyContent={['flex-start', 'flex-start', 'flex-start', 'center']}
                mb={["0", "0", "0", "10"]}>

            <Text
                fontSize="70px"
                fontWeight="700"
                bgGradient='linear(to-l, #59a3ff, #9ae9ff)'
                bgClip='text'
                mb="5">
              Dev Co
            </Text>

            <Text fontSize="lg"
                  color="gray.300"
                  textAlign="center">
                  Streamline your workflow and stay organized with
                  our dashboard, designed specifically for developers. Collaborate with team members,
                  and access key metrics and analytics
                  all in one place.
                  Take your development to the next level with Dev Co today!
            </Text>
            <Box w="100%" display="flex" justifyContent="center" gap={2}>
                <Button onClick={showRegister}
                        w={['150px', '150px', '200px', '150px']}
                        mt="6" colorScheme="blue"
                >Get started
                </Button>
                <Button onClick={showLoginComponent}
                        w={['150px', '150px', '200px', '150px']}
                        mt="6" colorScheme="blue"
                >Login
                </Button>
            </Box>

          </Box>

        </Box>
        <Box  w={['100%', '100%', '100%', '50%']}
              h={['55%', '50%', '50%', '100%']}
              display="flex"
              alignItems={['flex-end', 'center', 'flex-start', 'center']}
              justifyContent={['center', 'center', 'center', 'flex-start']}
              pl={['0', '0', '0', '10']}>

          <Lottie
              animationData={homepage}
              style={{ width: '550px', height: '100%' }}/>
        </Box>
      </motion.div>
        )}

          {showLogin && (
              <motion.div
                  initial={{ x:-150, opacity:0 }}
                  animate={{ x:0, opacity:1 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0 }}
              >
                  <Login setShowLogin={setShowLogin} setShowDiv={setShowDiv} />
              </motion.div>
          )}

        {showDiv && (
                <motion.div
                  initial={{ x:-150, opacity:0 }}
                  animate={{ x:0, opacity:1 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0 }}
                >
                  <Register setShowDiv={setShowDiv} setShowLogin={setShowLogin} onRegisterSuccess={setRegisterSuccess} />
                </motion.div>
        )}
          {!showHomepage && (
              <Flex w="100%"justifyContent="center" display={isSmallerThan1050 ? "none" : "flex"}>
              <motion.div
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0 }}
              >
              <Lottie
                  animationData={login}
                  style={{ width: '500px', height: '100%', opacity: '0.8' }}/>
              </motion.div>
              </Flex>
          )}
      </Flex>
  );
}

export default Homepage;
