import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';

export const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5] transition-colors duration-300">
      <header className="w-full py-4 px-6 shadow-sm bg-[#FFFFFF] dark:bg-[#262626] transition-colors duration-300">
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity text-[#7C3AED] dark:text-[#8B5CF6]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </Link>
          <h1 className="text-xl font-bold tracking-tight">Log In</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-[#FFFFFF] dark:bg-[#262626] rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-500 dark:text-gray-400">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              
              <Input 
                label="Email or Phone" 
                id="email" 
                type="text" 
                placeholder="Enter your email or phone" 
              />

             
              <Input 
                label="Password" 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
              />

              <div className="text-right">
                <Link to="/forgot-password" className="text-sm font-medium text-[#7C3AED] dark:text-[#8B5CF6] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="w-full py-3 px-4 rounded-lg font-bold text-white bg-[#7C3AED] dark:bg-[#8B5CF6] hover:opacity-90 shadow-md transition-all">
                Log In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-bold text-[#7C3AED] dark:text-[#8B5CF6] hover:underline">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};