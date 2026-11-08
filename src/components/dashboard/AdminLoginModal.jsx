import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLoginModal = () => {
  const { 
    isAdminLoginModalOpen, 
    setIsAdminLoginModalOpen, 
    loginAdmin, 
    isSupabaseActive,
    lang 
  } = useStore();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে ইউজারনেম এবং পাসওয়ার্ড দিন।' : 'Please enter your username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginAdmin(identifier, password, rememberMe);
      if (!res.success) {
        setErrorMsg(res.message || (lang === 'bn' ? 'ভুল ইউজার বা পাসওয়ার্ড! সঠিক তথ্য দিন।' : 'Invalid credentials.'));
      } else {
        // Clear fields on success
        setIdentifier('');
        setPassword('');
      }
    } catch {
      setErrorMsg(lang === 'bn' ? 'লগইন করার সময় ত্রুটি দেখা দিয়েছে। আবার চেষ্টা করুন।' : 'Login error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsAdminLoginModalOpen(false);
    setErrorMsg('');
    setIdentifier('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-fade-in">
        {/* Top Header Glow */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 p-6 text-white text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center mb-3 shadow-lg shadow-teal-900/40">
            <Lock size={26} className="text-amber-300" />
          </div>

          <h3 className="text-xl font-black tracking-tight">
            {lang === 'bn' ? 'সফট ডিউ অ্যাডমিন পোর্টাল' : 'Soft Dew Admin Portal'}
          </h3>
          <p className="text-xs text-teal-100/90 mt-1">
            {lang === 'bn' 
              ? 'ড্যাশবোর্ড, সেলুন ইনভেন্টরি ও অর্ডার নিয়ন্ত্রক কেন্দ্র' 
              : 'Secure Management & Inventory Control Center'}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold text-white mt-3">
            <ShieldCheck size={13} className="text-emerald-300" />
            <span>
              {isSupabaseActive 
                ? (lang === 'bn' ? 'সুপাবেস সিকিউর্ড ডাটাবেজ' : 'Supabase Cloud Database Secured') 
                : (lang === 'bn' ? 'সুরক্ষিত অ্যাডমিন অ্যাক্সেস' : 'Protected Admin Access')}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Error Message if any */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Username / Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {lang === 'bn' ? 'ইউজারনেম বা অ্যাডমিন ইমেইল' : 'Username or Admin Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার ইউজারনেম বা ইমেইল লিখুন...' : 'Enter your username or email...'}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {lang === 'bn' ? 'পাসওয়ার্ড (Password)' : 'Password'}
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={lang === 'bn' ? 'পাসওয়ার্ড লিখুন...' : 'Enter password...'}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <span>{lang === 'bn' ? 'এই ডিভাইসে লগইন মনে রাখুন' : 'Remember me on this device'}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-700/25 active:scale-98 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{lang === 'bn' ? 'ড্যাশবোর্ডে প্রবেশ করুন' : 'Sign In to Dashboard'}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck size={13} className="text-teal-600" />
              <span>{lang === 'bn' ? 'শুধুমাত্র অনুমোদিত সফট ডিউ অ্যাডমিনদের জন্য সংরক্ষিত' : 'Restricted to authorized Soft Dew administrators only'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
