import {Box, Link, Text} from "@chakra-ui/react";
import PropTypes from "prop-types";
const Article = ({ link, pubDate, title, creator }) => {
    return (
        <Link href={link}  isExternal _hover={{ textDecoration: 'none' }}>
            <Box w="100%"
                 p="4"
                 _hover={{ backgroundColor: 'secondary' }}
                 display="flex"
                 flexDirection="column"
                 gap={2}
                 mt="10px"
                 bgColor="bgPost" borderRadius="md" boxShadow="md">
                <Text fontSize="12px" fontWeight="600" color="black100">{pubDate}</Text>
                <Text fontSize="md" fontWeight="600" color="black100">{title}</Text>
                <Text fontSize="sm" textAlign="end" fontWeight="600" color="black100">Creator: {creator}</Text>
            </Box>
        </Link>
    )
}

Article.proptypes = {
    link: PropTypes.string,
    pubDate: PropTypes.string,
    title: PropTypes.string,
    creator: PropTypes.string,
}

export default Article;