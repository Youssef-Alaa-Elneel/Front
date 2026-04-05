import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#171717]">
      <header className="w-full py-4 px-6 bg-white dark:bg-[#262626] shadow-sm flex items-center justify-between">
        <Link to="/login" className="text-[#7C3AED] dark:text-[#8B5CF6]"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></Link>
        <h1 className="text-xl font-bold">Reset Password</h1>
        <div className="w-6"></div>
      </header>
      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-[#262626] rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
          <Input label="Email Address" id="email" type="email" placeholder="Enter your email" required />
          <Button className="mt-4" isLoading={loading}>Send Reset Link</Button>
        </div>
      </main>
    </div>
  );
};