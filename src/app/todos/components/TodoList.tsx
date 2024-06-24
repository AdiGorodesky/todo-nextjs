"use client";

import { useState } from "react";
import { Todo } from "../../types/Todo";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import EditableCell from "./EditableCell";
import Filter from "./Filter";
import AddTodo from "./AddTodo";

type Props = {
  data: Todo[];
};

const TodoList = ({ data }: Props) => {
  const [todos, setTodos] = useState<Todo[]>(data);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "txt", value: "" },
  ]);

  const columnHelper = createColumnHelper<Todo>();
  const columns = [
    columnHelper.accessor("isDone", {
      cell: (props) => (
        <input
          type="checkbox"
          checked={props.row.original.isDone}
          onChange={() => toggleTodo(props.row.original._id)}
        />
      ),
      header: "",
      size: 50,
    }),
    columnHelper.accessor("txt", {
      cell: (props) => (
        <EditableCell
          getValue={props.getValue}
          isDone={props.row.original.isDone}
        />
      ),
      header: "Task",
      size: 230,
      filterFn: "includesString",
    }),
    columnHelper.accessor("description", {
      cell: (props) => (
        <EditableCell
          getValue={props.getValue}
          isDone={props.row.original.isDone}
        />
      ),
      header: "Description",
      size: 350,
    }),
  ];

  const table = useReactTable({
    columns,
    data: todos,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
  });

  const toggleTodo = (id: string) => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      todo.isDone = !todo.isDone;
      setTodos((prev) =>
        prev.map((currTodo) => (currTodo._id === id ? todo : currTodo))
      );
    }
  };

  const handleAddTodo = (txt: string, description?: string) => {
    const newTodo: Todo = {
      _id: Math.floor(Math.random() * 100).toString(),
      isDone: false,
      txt,
      description,
    };

    setTodos([...todos, newTodo]);
  };

  const removeTodo = (todoId: string) => {
    const updatedTodos = todos.filter((todo) => todo._id !== todoId);
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="p-5 overflow-x-auto">
        <AddTodo handleAddTodo={handleAddTodo} />
        <Filter
          value={String(
            columnFilters.find((filter) => filter.id === "txt")?.value || ""
          )}
          onChange={(value) =>
            setColumnFilters((prev) =>
              prev.map((filter) =>
                filter.id === "txt" ? { ...filter, value } : filter
              )
            )
          }
        />
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="p-3 border-b border-gray-300 text-sm font-medium text-gray-600 uppercase relative"
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex items-center justify-between">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className="w-2 h-full bg-gray-300 cursor-col-resize absolute top-0 right-0"
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="p-3 whitespace-no-wrap text-sm text-gray-800"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
                <td className="p-3 whitespace-no-wrap text-sm text-gray-800">
                  <button
                    onClick={() => removeTodo(row.original._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodoList;
