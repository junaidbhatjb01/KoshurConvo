
import React from 'react';

interface SelectGroupProps<T extends string> {
  label: string;
  id: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly T[];
}

const SelectGroup = <T extends string,>({
  label,
  id,
  value,
  onChange,
  options,
}: SelectGroupProps<T>) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full mt-2 rounded-lg border-gray-600 bg-gray-700/50 text-gray-200 focus:border-teal-500 focus:ring-teal-500 transition duration-150 ease-in-out"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroup;
