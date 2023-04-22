import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../posts/Post";
import {Box, Flex, useMediaQuery} from "@chakra-ui/react";
import {getLikedPosts} from "../../features/Post/post.js";
import Loader from "../Loader/Loader.jsx";

const Likes = () => {

    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.login);
    const {liked_posts} = useSelector((state) => state.post);
    const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');

    useEffect(() => {
        setIsLoading(true)
            dispatch(getLikedPosts(user)).then(() => {
                setIsLoading(false);
            })
    }, [update]);

    return (
        <Flex w={isSmallerThan1000 ? '100%' : '70%'}
              h="80vh" mt={10}
              style={{'backdrop-filter': 'blur(15px)'}}
              borderRadius="md"
              boxShadow="lg"
              bgColor="bgPrimary"
              p="4"
              overflow="hidden"
              zIndex={1}
              >
            <Box width="100%"
                 h="100%"
                 overflowY="auto">
                {isLoading ? (
                        <Loader />
                    ) : liked_posts &&
                    liked_posts.map((post) => (
                        <Post key= {post.id}
                              postId={post.id}
                              title={post.title}
                              content ={post.content}
                              imageuser={post.image_path}
                              username={post.username}
                              date={post.date}
                              like={post.like}
                              isLiked={true}
                              load={update}
                              onLoad={setUpdate} /> ))}
            </Box>

        </Flex>
    );
};

export default Likes;