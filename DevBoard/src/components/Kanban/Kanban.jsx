import { Container, SimpleGrid } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column.jsx';
import { Flex } from '@chakra-ui/react';
import {useMediaQuery} from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

function Kanban() {

    const ColumnType = {
        TO_DO: 'Todo',
        IN_PROGRESS: 'In Progress',
        BLOCKED: 'Blocked',
        COMPLETED: 'Completed'
        };

    const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');  

    return (
        <Flex w={isSmallerThan1000 ? '100%' : '98%'}
        h="80vh"
        mt={10}
        flexDirection="column"
        gap={5}
        bgColor="bgPrimary"
        style={{'backdrop-filter': 'blur(15px)'}}
        borderRadius="md"
        boxShadow="lg"
        p="4"
        zIndex={1}
        display='flex' >
            <Box    width="100%"
                    h="100%"
                    overflowY="auto">
            <DndProvider backend={HTML5Backend}>
            <Container maxWidth="container.lg" px={4} py={4}>
            <SimpleGrid
                columns={{ base: 1, md: 4 }}
                spacing={{ base: 16, md: 4 }}
            >
                <Column column={ColumnType.TO_DO} />
                <Column column={ColumnType.IN_PROGRESS} />
                <Column column={ColumnType.BLOCKED} />
                <Column column={ColumnType.COMPLETED} />
            </SimpleGrid>
            </Container>
        </DndProvider>
        </Box>
        </Flex>
    );
}

export default Kanban;     


















