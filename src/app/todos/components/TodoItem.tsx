import { Todo } from "../../types/Todo";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

type Props = {
  toggleTodo: (id: string) => void;
  todo: Todo;
  removeTodo: (todoId: string) => void;
  handleEdit: (todoId: string) => void;
};

const TodoItem = ({ toggleTodo, todo, removeTodo, handleEdit }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-2">
        <div
          className={`flex-1 cursor-pointer ${
            todo.isDone ? "line-through text-gray-500" : ""
          }`}
          onClick={() => toggleTodo(todo._id)}
        >
          {todo.txt}
        </div>
        <div className="flex items-center space-x-4">
          <MdEdit
            className="cursor-pointer text-blue-500"
            onClick={() => handleEdit(todo._id)}
          />
          <RiDeleteBin5Line
            className="cursor-pointer text-red-500"
            onClick={() => removeTodo(todo._id)}
          />
        </div>
      </div>
    </>
  );
};

export default TodoItem;
