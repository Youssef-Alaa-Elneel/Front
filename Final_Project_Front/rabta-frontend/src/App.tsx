import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Settings } from './pages/Settings';
import { ForgotPassword } from './pages/ForgotPassword';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <nav className="p-4 bg-gray-100 dark:bg-gray-800 flex gap-4 justify-center border-b border-gray-200 dark:border-gray-700">
        <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link>
        <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Signup</Link>
        <Link to="/settings" className="text-blue-600 dark:text-blue-400 hover:underline">Settings</Link>
        
      </nav>


      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;