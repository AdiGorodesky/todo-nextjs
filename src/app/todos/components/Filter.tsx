import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Filter = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded mb-3"
      placeholder="Filter tasks"
    />
  );
};

export default Filter;
