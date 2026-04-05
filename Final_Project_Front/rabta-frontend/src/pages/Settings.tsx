import { Button } from '../components/ui/Button';

export const Settings = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <span className="font-medium">Appearance</span>
        <Button onClick={toggleTheme} variant="secondary">
          Toggle Dark Mode
        </Button>
      </div>
    </div>
  );
};
