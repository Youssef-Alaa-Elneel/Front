import React, { forwardRef } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // دي عشان لو فيه إيرور نعرضه تحت الحقل
}

export const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] transition-all placeholder-gray-400 dark:placeholder-gray-500"
        {...props}
      />
    </div>
  );
};
