import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  fullWidth = true,
  className = '',
  ...props 
}: ButtonProps) => {
  
  const baseStyles = "py-3 px-4 rounded-lg font-bold transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#7C3AED] dark:bg-[#8B5CF6] text-white hover:opacity-90 shadow-md",
    secondary: "bg-gray-100 dark:bg-[#262626] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700",
    outline: "border-2 border-[#7C3AED] dark:border-[#8B5CF6] text-[#7C3AED] dark:text-[#8B5CF6] hover:bg-[#7C3AED] hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Spinner size="sm" color="white" /> : children}
    </button>
  );
};