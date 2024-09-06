import { useCallback } from 'react';
import { useTodo } from '../../context/TodoProvider';
import Toast from 'react-native-toast-message';

const useDoneToDo = () => {
  const { doneTodoItem } = useTodo();

  const handleDoneToDo = useCallback(async (item) => {
    try {
      item.done = !item.done;
      const newState = item.done;
      const updatedMsg = newState ? 'marked DONE !!!' : 'marked NOT-DONE!!!';
      await doneTodoItem({ ...item, done: newState });
      Toast.show({
        type: 'success',
        text1: 'Todo Done',
        text2: `${truncateText(item.title, 20)} has been ${updatedMsg}`,
      });
    } catch (error) {
      console.error('Error Doneing todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error Doneing the todo item.',
      });
    }
  }, [doneTodoItem]);

  return handleDoneToDo;
};

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
};

export default useDoneToDo;
