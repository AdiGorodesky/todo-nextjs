"use client";

import { useState } from "react";
import TodoList from "./components/TodoList";
import { Todo } from "../types/Todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const toggleTodo = (id: string) => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      todo.isDone = !todo.isDone;
      setTodos((prev) =>
        prev.map((currTodo) => (currTodo._id === id ? todo : currTodo))
      );
    }
  };

  const removeTodo = (todoId: string) => {
    const updatedTodos = todos.filter((todo) => todo._id !== todoId);
    setTodos(updatedTodos);
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Todos</h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        setTodos={setTodos}
        removeTodo={removeTodo}
      />
    </main>
  );
}
