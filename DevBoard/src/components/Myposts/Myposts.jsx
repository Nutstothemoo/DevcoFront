import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import {Box, Flex, useMediaQuery, IconButton, Text} from '@chakra-ui/react';
import { getUserPosts } from '../../features/user/user.js';
import Loader from "../Loader/Loader.jsx";

const MyPosts = () => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, posts } = useSelector((state) => state.login);
  const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');

  useEffect(() => {
    setIsLoading(true)
      dispatch(getUserPosts(user)).then(() => {
        setIsLoading(false);
          }
      )

  }, [update]);


  return (
    <Flex
      w={isSmallerThan1000 ? '100%' : '70%'}
      h="80vh"
      mt={10}
      bgColor="bgPrimary"
      style={{'backdrop-filter': 'blur(15px)'}}
      borderRadius="md"
      boxShadow="lg"
      p="4"
      overflow="hidden"
      zIndex={1}>
      <Box width="100%" h="100%" overflowY="scroll">
        {isLoading ? (
            <Loader />
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (

                  <Post
                    title={post.title}
                    content={post.content}
                    imageuser={post.image_path}
                    username={post.username}
                    date={new Date(post.created_at).toLocaleDateString()} // format date
                    like={post.like}
                    postId={post.id}
                    load={update}
                    onLoad={setUpdate}
                  />

          ))
        ) : (
          // Si l'utilisateur n'a pas publié de posts, affiche un message d'erreur
            <Box w="100%">
              <Text
                  textAlign="center"
                  fontWeight="600"
                  color="primary">Oupss there is no post here...</Text>
            </Box>
            )}
      </Box>
    </Flex>
  );
};

export default MyPosts;
