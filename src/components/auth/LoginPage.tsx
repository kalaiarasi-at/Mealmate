import React, { useState } from 'react';
import {
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  UtensilsCrossed,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginPage: React.FC = () => {
  const { login, navigateTo, switchUserRole } = useApp();

  const [identifier, setIdentifier] = useState('21CS1042');
  const [password, setPassword] = useState('student123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(identifier, password);
    if (res.success) {
      navigateTo('menu');
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleQuickDemoStudent = () => {
    setIdentifier('21CS1042');
    setPassword('student123');
    login('21CS1042', 'student123');
    navigateTo('menu');
  };

  const handleQuickDemoAdmin = () => {
    setIdentifier('canteen.manager@college.edu');
    setPassword('admin123');
    switchUserRole('admin');
    navigateTo('admin');
  };

  return (
    <div className="py-12 sm:py-20 bg-stone-50 min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-lg">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <UtensilsCrossed className="w-6 h-6 stroke-[2]" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-stone-900 tracking-tight">
            Student & Staff Login
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Access your active pre-orders, token vouchers, and favorite campus meals.
          </p>
        </div>

        {/* Demo Mode Notice Banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Academic Demonstration Environment</span>
          </div>
          <p className="text-[11px] text-amber-800">
            Click either button below to instantly sign in for grading:
          </p>
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={handleQuickDemoStudent}
              className="flex-1 py-1.5 px-2 bg-amber-200/70 hover:bg-amber-200 text-amber-950 rounded-lg text-[11px] font-bold transition-colors"
            >
              Sign In as Student
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="flex-1 py-1.5 px-2 bg-stone-800 hover:bg-stone-900 text-amber-300 rounded-lg text-[11px] font-bold transition-colors"
            >
              Sign In as Admin
            </button>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5">
              College Register Number or College Email
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 21CS1042 or arun@college.edu"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-orange-500 font-mono"
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-stone-700">Password</label>
              <span className="text-[11px] text-stone-400">Demo password: any 4+ chars</span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-orange-500"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to MealMate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom register link */}
        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
          <span>New student to campus? </span>
          <button
            onClick={() => navigateTo('register')}
            className="font-bold text-orange-600 hover:underline"
          >
            Create Student Account &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
