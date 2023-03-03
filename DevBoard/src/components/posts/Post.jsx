import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Avatar} from '@chakra-ui/react'
import {BiLike} from "react-icons/bi";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function Post({title,content, like, date, imageuser, username}) {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    // const dispatch = useDispatch();
    // const token = useSelector((state) => state.token);
    // const loggedInUserId = useSelector((state) => state.user._id);

    // const patchLike = async () => {
    //   const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userId: loggedInUserId }),
    //   });
    //   const updatedPost = await response.json();
    //   dispatch(setPost({ post: updatedPost }))

    return (
        
        <Card mb="5" boxShadow="md">
            <CardHeader w="100%" pb="0">
                <Box display="flex" alignItems="center" w="100%" mb="3">
                    <Avatar name={username} src={`${VITE_BACKEND_URL}/images/${imageuser}`}/>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Text fontSize="sm" ml="3">{username}</Text>
                        <Text fontSize="sm" ml="3">Date : {date} </Text>
                    </Box>

                </Box>

                <Heading size='md'>{title}</Heading>
            </CardHeader>
            <CardBody pt="0">
                {/* <Stack divider={<StackDivider />} spacing='4'> */}
                <Box>
                <Text pt='2' fontSize='sm'>
                    <div> <ReactMarkdown children={content} className="react-markdown-test" remarkPlugins={[remarkGfm]} />
                    </div>
                </Text>
                    
                </Box>
                <Box mt="10" display="flex" alignItems="center">
                    <BiLike />
                    <Text ml="1">{like}</Text>
                </Box>

            </CardBody>

        </Card>
)
}

export default Post




// const Post = ({

// }) => {

;

        

