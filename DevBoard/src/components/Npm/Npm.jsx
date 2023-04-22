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
import Result from './Result';

function NpmSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobile] = useMediaQuery('(max-width: 600px)');
  const searchNpm = async () => {
    setLoading(true);
    const url = `https://registry.npmjs.com/-/v1/search?text=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setResults(data.objects);
    setLoading(false);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      searchNpm();
    }
  };

  return (
    <Flex
      w="98%"
      h="80vh"
      mt="10"
      p="4"
      flexDir="column"
      align="center"
      bgColor="bgPrimary"
      style={{ 'backdrop-filter': 'blur(15px)' }}
      borderRadius="md"
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
            placeholder="Search on Npm"
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
            style={{ backgroundColor: '#D8E5FF' }}
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
            <Spinner size="lg" style={{ color: '#D8E5FF' }} />
            <Text color="primary" fontWeight="600">
              Searching...
            </Text>
          </Stack>
        </Flex>
      ) /* // If the search has returned results, they are displayed in a Box component */
        : results.length > 0 ? (
          <Box
            w={!mobile ? '91%' : '100%'}
            h="100%"
            display="flex"
            flexDirection="column"
            gap={2}
            overflowY="auto"
          >
            {results.map((result, index) => (
              <Result
                key={index}
                name={result.package.name}
                link={result.package.links.npm}
                description={result.package.description}
                username={result.package.publisher.username}
                version={result.package.version}
                date={result.package.date}
              />
            ))}
          </Box>
        ) : (
          <Flex justify="center" align="center" w="100%" mt="4">
            <Text color="primary" fontWeight="600">
              Make a research.
            </Text>
          </Flex>
        )}
    </Flex>
  );
}

export default NpmSearch;
