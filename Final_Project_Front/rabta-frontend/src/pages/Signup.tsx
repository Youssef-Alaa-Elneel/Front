import React from 'react';
import { Link } from 'react-router-dom';

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
          <div className="bg-[#FFFFFF] dark:bg-[#262626] rounded-2xl shadow-lg p-8 transition-colors duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-500 dark:text-gray-400">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" id="fullname" placeholder="Enter your full name" className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input type="email" id="email" placeholder="Enter your email address" className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <input type="password" id="password" placeholder="Create a strong password" className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all" />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Re-enter your password" className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all" />
              </div>

              <button type="submit" className="w-full mt-2 py-3 px-4 rounded-lg font-medium transition-opacity hover:opacity-90 bg-[#7C3AED] dark:bg-[#8B5CF6] text-white dark:text-[#F5F5F5]">
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#7C3AED] dark:text-[#8B5CF6] hover:underline transition-opacity">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};