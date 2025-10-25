
import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  required?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}) => {
  const commonProps = {
    id,
    value,
    onChange,
    placeholder,
    required,
    className:
      'block w-full mt-2 rounded-lg border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500 transition duration-150 ease-in-out',
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={4} />
      ) : (
        <input {...commonProps} type="text" />
      )}
    </div>
  );
};

export default InputGroup;
