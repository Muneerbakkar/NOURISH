import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', isSignUp ? name : 'Alex Doe');
    window.dispatchEvent(new Event('auth-change'));
    const from = location.state?.from?.pathname || '/';
    navigate(from);
  };

  return (
    <div className="pt-8 md:pt-16 lg:pt-24 pb-12 lg:pb-24 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-md w-full mx-4">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors mt-4 shadow-sm">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="text-center text-slate-500 text-sm mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"} <span className="text-emerald-600 font-semibold cursor-pointer hover:underline" onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Log in' : 'Sign up'}</span>
        </p>
      </div>
    </div>
  );
}
