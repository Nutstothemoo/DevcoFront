import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, ScaleFade, Textarea } from '@chakra-ui/react';
import { useTaskDragAndDrop } from './useTaskDragAndDrop';

function Task({ 
    index, 
    task,
    onUpdate: handleUpdate,
    onDropHover: handleDropHover,
    onDelete: handleDelete,
}) {

  const { ref, isDragging } = useTaskDragAndDrop(
    { task, index: index },
    handleDropHover,
  );

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        w='full'
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={task.color}
        opacity={isDragging ? 0.5 : 1}
      >
        <IconButton
            position="absolute"
            top={0}
            right={0}
            zIndex={100}
            aria-label="delete-task"
            size="md"
            colorScheme="solid"
            color={'gray.700'}
            icon={<DeleteIcon />}
            opacity={0}
            _groupHover={{
                opacity: 1,
            }}
          onClick={handleDeleteClick}
        />
        <Textarea
            value={task.title}
            fontWeight="semibold"
            cursor="inherit"
            border="none"
            p={0}
            resize="none"
            minH={70}
            maxH={200}
            focusBorderColor="none"
            color="gray.700"
            onChange={handleTitleChange}
        />
        </Box>
    </ScaleFade>
  );
}
 export default Task;
