"use client";

import { useState } from "react";
import { Todo } from "../../types/Todo";
import AddOrEditTodo from "./AddOrEditTodo";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  setTodos: (value: Todo[]) => void;
  removeTodo: (todoId: string) => void;
};

const TodoList = ({ todos, toggleTodo, setTodos, removeTodo }: Props) => {
  const [changedTodo, setChangedTodo] = useState<Todo | null>(null);

  const handleAddTodo = (txt: string) => {
    const newTodo: Todo = {
      _id: Math.floor(Math.random() * 100).toString(),
      isDone: false,
      txt,
    };

    setTodos([...todos, newTodo]);
    setChangedTodo(null);
  };

  const handleChangedTodo = (changedTodo: Todo) => {
    const changedTodos = todos.map((todo) =>
      todo._id === changedTodo._id ? { ...todo, ...changedTodo } : todo
    );
    setTodos(changedTodos);
  };

  const handleAddOrEdit = (todo: Todo | string) => {
    if (typeof todo === "string") {
      handleAddTodo(todo);
    } else {
      handleChangedTodo(todo);
    }
  };

  const handleEdit = (todoId: string) => {
    const selectedTodo = todos.find((todo) => todo._id === todoId) || null;
    setChangedTodo(selectedTodo);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AddOrEditTodo
        handleAddOrEdit={handleAddOrEdit}
        changedTodo={changedTodo}
      />
      <div className="mt-8">
        {todos?.map((todo) => (
          <TodoItem
            key={todo._id}
            toggleTodo={toggleTodo}
            todo={todo}
            removeTodo={removeTodo}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
