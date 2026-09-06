import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth, DEMO_PRESET_USER } from '../../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, setAuthModalMode, closeAuthModal, logIn, signUp, demoLogin } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (authModalMode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      try {
        signUp(name, email, password);
        setSuccess('Account created successfully! Welcome to AgriShield AI.');
        setTimeout(() => closeAuthModal(), 1000);
      } catch (err) {
        setError(err.message);
      }
    } else {
      if (!email.trim() || !password) {
        setError('Please provide both email and password.');
        return;
      }
      try {
        logIn(email, password);
        setSuccess('Signed in successfully! Redirecting...');
        setTimeout(() => closeAuthModal(), 800);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDemoClick = () => {
    demoLogin();
    setSuccess('Logged in with Demo Farmer credentials!');
    setTimeout(() => closeAuthModal(), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#081C15]/95 border border-[#40916C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#40916C]/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#40916C]/20 blur-[60px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1B4332]/60 hover:bg-[#1B4332] text-[#74C69D] hover:text-white border border-[#40916C]/30 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-[#1B4332] text-[#B9FBC0]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B9FBC0]">
            SIH26131 Farmer Portal
          </span>
        </div>

        <h3 className="text-2xl font-extrabold text-white">
          {authModalMode === 'signup' ? 'Create Farmer Account' : 'Welcome Back'}
        </h3>
        <p className="text-xs text-[#74C69D] mt-1 mb-6">
          {authModalMode === 'signup'
            ? 'Sign up to persist diagnostic crop scans and sync with your local KVK.'
            : 'Access your saved crop scans, treatments, and vernacular audio advice.'}
        </p>

        {/* Quick Demo Login Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-[#1B4332]/90 to-[#2D6A4F]/60 border border-[#B9FBC0]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🌾</span>
            <div>
              <p className="text-xs font-bold text-white">Hackathon Evaluator?</p>
              <p className="text-[10px] text-[#B9FBC0]/90">1-click instant demo profile</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDemoClick}
            className="px-3.5 py-1.5 rounded-xl bg-[#B9FBC0] hover:bg-white text-[#081C15] font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            Quick Login
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex rounded-xl bg-[#081C15] p-1 border border-[#40916C]/30 mb-5">
          <button
            type="button"
            onClick={() => { setAuthModalMode('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authModalMode === 'login'
                ? 'bg-[#40916C] text-white shadow-md'
                : 'text-[#74C69D] hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalMode('signup'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authModalMode === 'signup'
                ? 'bg-[#40916C] text-white shadow-md'
                : 'text-[#74C69D] hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error / Success Notifications */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-[#1B4332] border border-[#B9FBC0]/60 text-[#B9FBC0] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#B9FBC0]" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#74C69D] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#74C69D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#081C15] border border-[#40916C]/50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#74C69D]/50 focus:outline-none focus:border-[#B9FBC0]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#74C69D] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#74C69D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="farmer@agrishield.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#081C15] border border-[#40916C]/50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#74C69D]/50 focus:outline-none focus:border-[#B9FBC0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#74C69D] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#74C69D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#081C15] border border-[#40916C]/50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#74C69D]/50 focus:outline-none focus:border-[#B9FBC0]"
              />
            </div>
          </div>

          {authModalMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#74C69D] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#74C69D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#081C15] border border-[#40916C]/50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#74C69D]/50 focus:outline-none focus:border-[#B9FBC0]"
                />
              </div>
            </div>
          )}

          {authModalMode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setForgotSent(true)}
                className="text-[11px] text-[#74C69D] hover:text-[#B9FBC0] transition-colors cursor-pointer"
              >
                {forgotSent ? 'Password reset link simulated to email' : 'Forgot password?'}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#40916C] to-[#52B788] hover:from-[#52B788] hover:to-[#74C69D] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#40916C]/30 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <span>{authModalMode === 'signup' ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-center text-[#74C69D]/70 mt-4">
          Prototype Authentication Mode • Ready for Firebase Auth SDK Integration
        </p>
      </div>
    </div>
  );
}
