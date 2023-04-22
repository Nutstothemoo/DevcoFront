import { AddIcon } from '@chakra-ui/icons';
import {
    Badge,
    Box,
    Heading,
    IconButton,
    Stack,
} from '@chakra-ui/react';
import useColumnDrop from './useColumnDrop';
import useColumnTasks from './useColumnTasks';
import Task from './Task';

function Column({ column }) {

    const {
        tasks,
        addEmptyTask,
        deleteTask,
        dropTaskFrom,
        swapTasks,
        updateTask,
        } = useColumnTasks(column);

    const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

    const ColumnColorScheme = {
        Todo: 'gray',
        'In Progress': 'blue',
        Blocked: 'red',
        Completed: 'green',
        };

        const ColumnTasks = tasks[column].map((task, index) => (
        <Task
            key={task.id}
            task={task}
            index={index}
            opacity='0.8'
            onDropHover={swapTasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
        />
    ));

  return (
    <Box>
      <Heading fontSize="md" mb={3} letterSpacing="wide">
        <Badge
            px={3}
            py={1}
            rounded="lg"
            opacity='0.8'
            colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={'gray.900'}
        bgColor={'gray.100'}
        _hover={{ bgColor: 'gray.200'}}
        py={2}
        variant="solid"
        opacity='0.75'
        onClick={addEmptyTask}
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
      />
      <Stack
        ref={dropRef}
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        opacity='0.7'
        bgColor='gray.50'
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
      </Stack>
    </Box>
  );
}

export default Column;