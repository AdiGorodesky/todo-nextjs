import React, { useState } from "react";

type Props = {
  getValue: () => string | undefined;
  isDone: boolean;
};

const EditableCell = ({ getValue, isDone }: Props) => {
  const initialVal = getValue();
  const [val, setVal] = useState(initialVal);
  return (
    <div className="relative w-full">
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md min-w-0 
            focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none ${
              isDone ? "line-through" : ""
            }`}
      />
    </div>
  );
};

export default EditableCell;
