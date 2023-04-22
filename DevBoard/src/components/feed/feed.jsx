import {Box, Flex, Text, useMediaQuery} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {getFeeds} from "../../features/user/user.js";
import Article from "./article.jsx";

const Feed = () => {
    const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
    const [isSmallerThan500] = useMediaQuery('(max-width: 500px)');
    const dispatch = useDispatch();
    const { feeds } = useSelector((state) => state.login);

   useEffect(() => {
       !feeds && (
       dispatch(getFeeds()));
   }, [])

return (
    <Flex w={isSmallerThan1000 ? '100%' : '98%'}
          h="80vh"
          mt={10}
          justifyContent="center"
          bgColor="bgPrimary"
          style={{'backdrop-filter': 'blur(15px)'}}
          borderRadius="md"
          boxShadow="lg"
          p={isSmallerThan500 ? "0" : "4"}
          zIndex={1}>
            <Tabs w={isSmallerThan500 ? "100%" : "90%"} color="primary" bg="bgPrimary" borderRadius="md" boxShadow="lg" p={isSmallerThan500 ? "1" : "10"} colorScheme="blue">
                <TabList mb="10" h="60px">
                    {feeds &&
                        feeds.map(feed => <Tab borderTopRadius="md" fontWeight="600" fontSize={isSmallerThan500 ? "15" : "lg"} key={feed?.title}> {feed?.title}</Tab>)}
                </TabList>
                <Box w="100%" h="85%" overflowY="auto">
                    <TabPanels>
                        {feeds && feeds.map(feed =>
                            <TabPanel key={feed?.title} p="0">
                                <Text fontSize="sm">{feed?.description}</Text>
                                <Link fontSize="sm">{feed?.link}</Link>
                                {feed.items.map((item) => (

                                    <Article link={item.link}
                                             pubDate={item.pubDate}
                                             title={item.title}
                                             creator={item.creator} />
                                ))}
                            </TabPanel>
                        )}
                    </TabPanels>
                </Box>
            </Tabs>

    </Flex>
  );
};

export default Feed

  
