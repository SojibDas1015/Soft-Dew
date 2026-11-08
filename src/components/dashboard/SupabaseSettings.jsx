import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  UploadCloud, 
  Key, 
  Link2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { 
  getSupabaseSettings, 
  saveSupabaseSettings, 
  testSupabaseConnection,
  isSupabaseConfigured
} from '../../lib/supabase';

export const SupabaseSettings = () => {
  const { 
    isSupabaseActive, 
    syncAllToSupabase, 
    products, 
    orders, 
    bookings, 
    refreshDataFromSupabase,
    lang 
  } = useStore();

  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [testingStatus, setTestingStatus] = useState(null); // { success, message }
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    const config = getSupabaseSettings();
    setUrl(config.url || '');
    setAnonKey(config.key || '');
  }, []);

  const handleSaveAndTest = async (e) => {
    e.preventDefault();
    setIsTesting(true);
    setTestingStatus(null);

    saveSupabaseSettings(url, anonKey);
    const result = await testSupabaseConnection();
    setTestingStatus(result);
    setIsTesting(false);

    if (result.success) {
      await refreshDataFromSupabase();
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm(
      lang === 'bn' 
        ? 'আপনি কি বর্তমান সমস্ত পণ্য, অর্ডার এবং বুকিং সুপাবেস ডাটাবেজে আপলোড/সিঙ্ক করতে চান?' 
        : 'Do you want to sync all current products, orders, and inquiries to Supabase database?'
    )) return;

    setIsSyncing(true);
    try {
      const res = await syncAllToSupabase();
      setTestingStatus(res);
    } catch (err) {
      setTestingStatus({ success: false, message: err.message });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopySqlHint = () => {
    setCopiedSql(true);
    navigator.clipboard.writeText('-- Supabase Schema file is located at ./supabase_schema.sql in the project root');
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Status Card */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isSupabaseActive 
          ? 'bg-gradient-to-r from-teal-900/10 via-emerald-900/5 to-transparent border-teal-500/40 dark:border-teal-500/30' 
          : 'bg-amber-500/5 border-amber-500/30'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
              isSupabaseActive 
                ? 'bg-teal-700 text-white' 
                : 'bg-amber-500 text-white'
            }`}>
              <Database size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {lang === 'bn' ? 'সুপাবেস ডাটাবেজ ইন্টিগ্রেশন স্ট্যাটাস' : 'Supabase Database Integration Status'}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                  isSupabaseActive
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isSupabaseActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {isSupabaseActive 
                    ? (lang === 'bn' ? 'ডাটাবেজ সংযুক্ত ও সক্রিয়' : 'Supabase Live Connected') 
                    : (lang === 'bn' ? 'লোকাল স্টোরেজ মোড (ডেমো)' : 'Local Fallback / Standby')}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSupabaseActive 
                  ? (lang === 'bn' ? 'সমস্ত পণ্য, নতুন অর্ডার ও বুকিং সরাসরি ক্লাউড ডাটাবেজে সিনক্রোনাইজ হচ্ছে।' : 'All catalog products, customer orders, and salon inquiries sync in real-time to Supabase.')
                  : (lang === 'bn' ? 'নিচে আপনার Supabase Project URL এবং API Anon Key দিয়ে সহজেই কানেক্ট করুন।' : 'Provide your Supabase URL & Anon Key below to enable cloud live database.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSeedData}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm shadow-teal-700/20 active:scale-95 transition-all disabled:opacity-50"
            >
              <UploadCloud size={15} />
              <span>
                {isSyncing 
                  ? (lang === 'bn' ? 'সিঙ্ক হচ্ছে...' : 'Syncing...') 
                  : (lang === 'bn' ? 'ডাটাবেজে সমস্ত ডাটা সিঙ্ক করুন' : 'Sync All Data to Supabase')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Test / Alert Banner */}
      {testingStatus && (
        <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
          testingStatus.success 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' 
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
        }`}>
          {testingStatus.success ? (
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <span className="font-bold">{testingStatus.message}</span>
          </div>
        </div>
      )}

      {/* Supabase Connection Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: 2 Cols */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Key size={16} className="text-teal-700 dark:text-teal-400" />
              <span>{lang === 'bn' ? 'সুপাবেস প্রজেক্ট ক্রেডেনশিয়ালস' : 'Supabase Project Credentials'}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn' 
                ? 'আপনার Supabase ড্যাশবোর্ডের Settings > API থেকে প্রাপ্ত তথ্য দিন।' 
                : 'Enter your project credentials from Supabase Dashboard > Settings > API'}
            </p>
          </div>

          <form onSubmit={handleSaveAndTest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Project URL (VITE_SUPABASE_URL)
              </label>
              <div className="relative">
                <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Anon Public Key (VITE_SUPABASE_ANON_KEY)
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isTesting}
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-teal-700/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {isTesting ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={14} />
                )}
                <span>
                  {isTesting 
                    ? (lang === 'bn' ? 'কানেকশন চেক হচ্ছে...' : 'Verifying Connection...') 
                    : (lang === 'bn' ? 'সংরক্ষণ করুন ও সংযোগ পরীক্ষা করুন' : 'Save & Test Supabase')}
                </span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  setUrl('');
                  setAnonKey('');
                  saveSupabaseSettings('', '');
                  await refreshDataFromSupabase();
                  setTestingStatus({ success: true, message: 'সুপাবেস ক্রেডেনশিয়ালস রিসেট করা হয়েছে (লোকাল মোড সক্রিয়)' });
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
              >
                {lang === 'bn' ? 'রিসেট / লোকাল মোড' : 'Reset to Local Mode'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Info: 1 Col */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Info size={16} className="text-teal-700 dark:text-teal-400" />
            <span>{lang === 'bn' ? 'ডাটাবেজ টেবিল সংক্ষেপ' : 'Database Tables Overview'}</span>
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-teal-700 dark:text-teal-400">products</span>
                <span className="text-slate-400">• ক্যাটালগ</span>
              </div>
              <strong className="text-slate-900 dark:text-white font-mono">{products.length} আইটেম</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-teal-700 dark:text-teal-400">orders</span>
                <span className="text-slate-400">• কাস্টমার অর্ডার</span>
              </div>
              <strong className="text-slate-900 dark:text-white font-mono">{orders.length} অর্ডার</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-teal-700 dark:text-teal-400">bookings</span>
                <span className="text-slate-400">• সেলুন ইনকোয়ারি</span>
              </div>
              <strong className="text-slate-900 dark:text-white font-mono">{bookings.length} রেকর্ড</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 text-xs">
              <span className="font-bold text-teal-900 dark:text-teal-200 block mb-1">
                {lang === 'bn' ? 'সহজ ৩ ধাপের সেটআপ:' : 'Quick 3-Step Setup:'}
              </span>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                <li>Supabase.com এ প্রজেক্ট খুলুন</li>
                <li>`supabase_schema.sql` ফাইলটি SQL Editor-এ রান করুন</li>
                <li>Settings &gt; API থেকে URL ও Anon Key এখানে দিন</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

