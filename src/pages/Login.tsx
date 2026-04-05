import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // تجربة الـ Loading
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5]">
      <header className="w-full py-4 px-6 bg-white dark:bg-[#262626] shadow-sm">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-[#7C3AED] dark:text-[#8B5CF6]"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></Link>
          <h1 className="text-xl font-bold">Log In</h1>
          <div className="w-6"></div>
        </div>
      </header>
      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-[#262626] rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-center mb-8">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Email or Phone" id="email" type="text" placeholder="Enter your email" required />
            <Input label="Password" id="password" type="password" placeholder="Enter password" required />
            <div className="text-right">
              <Link to="/forgot-password" testimonials-className="text-sm font-medium text-[#7C3AED] dark:text-[#8B5CF6] hover:underline">Forgot Password?</Link>
            </div>
            <Button type="submit" isLoading={loading}>Log In</Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <Link to="/signup" className="font-bold text-[#7C3AED] dark:text-[#8B5CF6] hover:underline">Sign Up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};