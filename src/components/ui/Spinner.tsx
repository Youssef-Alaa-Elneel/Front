import React from 'react';


interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}

export const Spinner = ({ size = 'md', color = 'primary' }: SpinnerProps) => {
  
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  
  const colorClasses = {
    primary: 'border-gray-200 border-t-[#7C3AED] dark:border-gray-700 dark:border-t-[#8B5CF6]',
    white: 'border-white/30 border-t-white',
  };

  return (
    <div 
      className={`rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};