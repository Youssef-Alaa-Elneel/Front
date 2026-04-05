import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';

export const Signup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5] transition-colors duration-300">
      <header className="w-full py-4 px-6 shadow-sm bg-[#FFFFFF] dark:bg-[#262626] transition-colors duration-300">
        <div className="flex items-center justify-between">
          <Link to="/login" className="hover:opacity-80 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </Link>
          <h1 className="text-xl font-semibold">Sign Up</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-[#FFFFFF] dark:bg-[#262626] rounded-2xl shadow-lg p-8 transition-colors duration-300 border border-gray-100 dark:border-gray-800">
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-500 dark:text-gray-400">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <Input 
                label="Full Name" 
                id="fullname" 
                type="text" 
                placeholder="Enter your full name" 
                required 
              />

              <Input 
                label="Email" 
                id="email" 
                type="email" 
                placeholder="Enter your email address" 
                required 
              />

              <Input 
                label="Phone Number" 
                id="phone" 
                type="tel" 
                placeholder="Enter your phone number" 
                required 
              />

              <Input 
                label="Password" 
                id="password" 
                type="password" 
                placeholder="Create a strong password" 
                required 
              />

              <Input 
                label="Confirm Password" 
                id="confirm-password" 
                type="password" 
                placeholder="Re-enter your password" 
                required 
              />

              <button 
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-lg font-medium transition-opacity hover:opacity-90 bg-[#7C3AED] dark:bg-[#8B5CF6] text-white dark:text-[#F5F5F5]"
              >
                Sign Up
              </button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#7C3AED] dark:text-[#8B5CF6] hover:underline transition-opacity">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};