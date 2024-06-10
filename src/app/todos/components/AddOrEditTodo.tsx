"use client";

import React, { useEffect, useState } from "react";
import { Todo } from "../../types/Todo";
type Props = {
  handleAddOrEdit: (todo: Todo | string) => void;
  changedTodo: Todo | null;
};

const AddOrEditTodo = ({ handleAddOrEdit, changedTodo }: Props) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (changedTodo) {
      setText(changedTodo.txt);
    } else {
      setText("");
    }
  }, [changedTodo]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!text.trim()) return;

    if (changedTodo) {
      handleAddOrEdit({ ...changedTodo, txt: text });
    } else {
      handleAddOrEdit(text);
    }

    setText("");
  };
  return (
    <>
      <form onSubmit={submit} className="flex flex-col space-y-4">
        <label htmlFor="text" className="text-lg font-semibold">
          Text:
        </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          id="text"
          name="text"
          placeholder="Enter Todo..."
          className="p-2 border rounded"
        />
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {changedTodo?._id ? "Save Changes" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AddOrEditTodo;
