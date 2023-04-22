import React, { useState } from 'react';
import {
  Input,
  Button,
  Stack,
  Box,
  Text,
  Spinner,
  Flex,
  useMediaQuery,
} from '@chakra-ui/react';
import { TiInputChecked } from 'react-icons/ti';
import Result from "./result.jsx";
// This function component is called StackOverflowSearch
function StackOverflowSearch() {
  // The state variables 'query', 'results' and 'loading' are declared using the useState hook
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobile] = useMediaQuery('(max-width: 600px)');
  // This function is used to search StackOverflow using the 'query' state variable
  const searchStackOverflow = async () => {
    setLoading(true);
    const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=relevance&intitle=${query}&site=stackoverflow&pagesize=20&filter=withbody`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // The 'results' state variable is updated with the data obtained from the search
    setResults(data.items);
    setLoading(false);
  };
  // This function is called whenever the value of the search input changes
  const handleQueryChange = (event) => {
    // The 'query' state variable is updated with the new value of the input
    setQuery(event.target.value);
  };
  // This function is called when the search form is submitted
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // If the 'query' state variable is not empty, then the 'searchStackOverflow' function is called
    if (query.trim() !== '') {
      searchStackOverflow();
    }
  };
  // The component returns JSX that renders a search form and displays the search results
  return (
    <>
      <Flex
        w="98%"
        h="80vh"
        mt="10"
        p="4"
        flexDir="column"
        align="center"
        style={{'backdrop-filter': 'blur(15px)'}}
        borderRadius="md"
        bgColor="bgPrimary"
        boxShadow="lg"
        zIndex={1}
      >
        <form
          onSubmit={handleFormSubmit}
          style={{ width: '90%', marginBottom: '2rem' }}
        >
          <Stack direction="row" align="center">
            <Input
              type="text"
              placeholder="Search Stack Overflow"
              value={query}
              onChange={handleQueryChange}
              size="lg"
              bgColor="secondary"
              fontWeight="600"
              color="#505E7B"
              focusBorderColor="primary"
              _focus={{ bg: 'secondary' }}
              _hover={{ borderColor: 'blue.500' }}
            />
            <Button
              type="submit"
              style={{backgroundColor: '#D8E5FF'}}
              color="black200"
              size="lg"
              isLoading={loading}
              loadingText="Searching"
            >
              Search
            </Button>
          </Stack>
        </form>
        {/* If the search is currently loading, a Spinner and a Text component are displayed  */}

        {loading ? (
          <Flex justify="center" align="center" w="90%">
            <Stack align="center">
              <Spinner size="lg" style={{color: "#D8E5FF"}} />
              <Text color="primary"
                    fontWeight="600">Searching...</Text>
            </Stack>
          </Flex>
        ) : /* // If the search has returned results, they are displayed in a Box component */
        results.length > 0 ? (
         <Box w={!mobile ? "91%" : "100%"} h="100%" display="flex" flexDirection="column" gap={2} overflowY="auto">
           {results.map((result) => (
               <Result questionId={result.question_id}
                       link={result.link}
                       score={result.score}
                       answerCount={result.answer_count}
                       viewCount={result.view_count}
                       title={result.title}
                       body={result.body}
                       tags={result.tags}
                       ownerprofileImage={result.owner.profile_image}
                       ownerName={result.owner.display_name}
                       ownerReputation={result.owner.reputation} />
           ))}
         </Box>
        ) : (
          <Flex justify="center" align="center" w="100%" mt="4">
            <Text color="primary"
                  fontWeight="600">Make a research.</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default StackOverflowSearch;
