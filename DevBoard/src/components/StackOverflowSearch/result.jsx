import React, {useState} from 'react'
import {Card, CardHeader, CardBody, CardFooter, IconButton, Link, useMediaQuery} from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Avatar} from '@chakra-ui/react'
import {BiLike} from "react-icons/bi";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {deleteLike, likePost} from "../../features/Post/post.js";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import {BsCheckLg} from "react-icons/bs";


function Result({ questionId,
                    link,
                    score,
                    answerCount
                    , viewCount,
                    title,
                    body,
                    tags,
                    ownerprofileImage,
                    ownerName,
                    ownerReputation }) {
    const [mobile] = useMediaQuery('(max-width: 600px)');

    return (

        <Link href={link} isExternal _hover={{ textDecoration: 'none' }}>
            <Box w="100%" bgColor="bgPost" boxShadow="md" borderRadius="md" display="flex" flexDirection={!mobile ? 'row' : 'column' } p="10px" pt="17px" gap={2} key={questionId} _hover={{ backgroundColor: 'secondary' }}>
                <Box w={!mobile ? "100px" : "100%"} display="flex" flexDirection={!mobile ? "column" : "row"} alignItems="center" justifyContent={mobile && "flex-start"} gap={1}>
                    {!mobile && <Text fontWeight="600" color="black100">{score} votes</Text>}
                    <Box display="flex" w={!mobile ? "100%" : "90px"} width={mobile ? "120px" : "100%"} h="35px" bgColor="blue100"  borderRadius="md" alignItems="center" justifyContent="space-around">
                        <BsCheckLg color="#D8E5FF" />

                        <Text fontSize="13px" fontWeight="600" color="primary">{answerCount} {mobile && "Answers"}</Text>
                            {!mobile && (
                                <Text fontSize="13px" fontWeight="600" color="primary">Answers</Text>
                            )}

                    </Box>
                    {mobile && <Text mr="10px" fontWeight="600" color="black100">{score} votes</Text>}
                    <Text fontSize="sm" fontWeight="600" color="black100">{viewCount} views</Text>
                </Box>
                <Box w="92%">
                    <Text fontSize="lg" fontWeight="600" color="black100" mb="15px">{title}</Text>

                    <Text
                        fontSize={['12px', '12px', 'lg', 'lg', 'lg', 'lg']}

                    >
                        {new window.DOMParser()
                            .parseFromString(body, "text/html")
                            .documentElement.textContent
                            .slice(0, 250)}{body.length > 200 && '...'}
                    </Text>

                    {!mobile && (
                        <Box w="100%" display="flex" mt="10px" gap={[100, 100, 200, 300, 300, 400]} >
                            <Box display="flex" gap={3} w="40%" flexWrap="wrap">
                                {tags.map((tag) => (
                                    <Box display="flex" alignItems="center" >
                                        <Text bgColor="secondary" p={1.5} pl="3" pr="3" fontSize="sm" borderRadius="md" color="black100">{tag}</Text>
                                    </Box>
                                ))}
                            </Box>
                            <Box display="flex"  flexDirection={["column", "column", "column", "column", "column", "row"]} w="30%" justifyContent="flex-start" alignItems="center" gap={3}>
                                <Avatar src={ownerprofileImage} mr={2} />
                                <Text fontSize="md" fontWeight="600" color="black100">{ownerName}</Text>
                                <Text fontSize="md" fontWeight="600" color="black100">Reputation: {ownerReputation}</Text>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Link>

    )
}


export default Result;



