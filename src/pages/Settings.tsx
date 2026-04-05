import React from 'react';
import { Button } from '../components/ui/Button';

export const Settings = () => {
  const toggleTheme = () => document.documentElement.classList.toggle('dark');

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-[#262626] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <span className="font-medium">Dark Mode Appearance</span>
        <Button onClick={toggleTheme} variant="secondary" fullWidth={false}>
          Toggle Theme
        </Button>
      </div>
    </div>
  );
};