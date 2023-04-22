import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { pickChakraRandomColor, swap } from './helper';
import useTaskCollection from './useTaskCollection';

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column) {

    const ColumnType = {
                TO_DO: 'TO_DO',
                IN_PROGRESS: 'IN_PROGRESS',
                BLOCKED: 'BLOCKED',
                COMPLETED: 'COMPLETED'
                };
    const [tasks, setTasks] =useTaskCollection();
   


    const addEmptyTask = useCallback(() => {
        const columnTasks = tasks[column];
        setTasks((allTasks) => {
            const columnTasks = allTasks[column];

            if (columnTasks.length > MAX_TASK_PER_COLUMN) {
                return allTasks;
            }

            const newColumnTask = {
                id: uuidv4(),
                title: `New ${column} task`,
                color: pickChakraRandomColor('.300'),
                column,
            };
            return {
                ...allTasks,
                [column]: [newColumnTask, ...columnTasks],
            };
            });
        }, [column, setTasks]);


    const deleteTask = useCallback(
        (id) => {
        setTasks((allTasks) => {
            const columnTasks = allTasks[column];
            return {
            ...allTasks,
            [column]: columnTasks.filter((task) => task.id !== id),
            };
        });
        },
        [column, setTasks],
    );

    const updateTask = useCallback(
        (id, updatedTask) => {
        setTasks((allTasks) => {
            const columnTasks = allTasks[column];
            return {
            ...allTasks,
            [column]: columnTasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task,
            ),
            };
        });
        },
        [column, setTasks],
    );

        const dropTaskFrom = useCallback(
            (from, id) => {
            setTasks((allTasks) => {
                const fromColumnTasks = allTasks[from];
                const toColumnTasks = allTasks[column];
                const movingTask = fromColumnTasks.find((task) => task.id === id);

                console.log(`Moving task ${movingTask?.id} from ${from} to ${column}`);

                if (!movingTask) {
                return allTasks;
                }

                // remove the task from the original column and copy it within the destination column
                return {
                    ...allTasks,
                    [from]: fromColumnTasks.filter((task) => task.id !== id),
                    [column]: [{ ...movingTask, column }, ...toColumnTasks],
                    };
                });
            },
            [column, setTasks],
            );

    const swapTasks = useCallback(
    (i, j) => {
        setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
            ...allTasks,
            [column]: swap(columnTasks, i, j),
        };
        });
    },
    [column, setTasks],
    );

    return {
        tasks,
        addEmptyTask,
        updateTask,
        dropTaskFrom,
        deleteTask,
        swapTasks,
    };
}

export default useColumnTasks;