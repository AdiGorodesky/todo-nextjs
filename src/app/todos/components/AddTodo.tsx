import React, { useState } from "react";
import { text } from "stream/consumers";

type Props = {
  handleAddTodo: (txt: string, description?: string) => void;
};

const AddTodo = ({ handleAddTodo }: Props) => {
  const [todoText, setTodoText] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!todoText.trim()) return;
    handleAddTodo(todoText.trim(), todoDescription.trim());
    setTodoText("");
    setTodoDescription("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between mb-5"
    >
      <div className="flex-1 mr-4">
        <label
          htmlFor="txt"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Task:
        </label>
        <input
          id="txt"
          type="text"
          placeholder="Enter task..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div className="flex-1 mr-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description:
        </label>
        <input
          id="description"
          type="text"
          placeholder="Enter description..."
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
