import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium">{label}</label>
      <input 
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        {...props} 
      />
    </div>
  );
};
