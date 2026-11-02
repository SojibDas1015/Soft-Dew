import React from 'react';
import { ShieldCheck, Truck, Banknote, Headphones } from 'lucide-react';
import { TRUST_BADGES } from '../../data/categories';
import { useStore } from '../../context/StoreContext';

export const TrustBanner = () => {
  const { lang } = useStore();

  const iconMap = {
    ShieldCheck: ShieldCheck,
    Truck: Truck,
    Banknote: Banknote,
    Headphones: Headphones
  };

  return (
    <section className="py-6 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_BADGES.map((b, idx) => {
            const Icon = iconMap[b.icon] || ShieldCheck;
            return (
              <div 
                key={idx}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                    {lang === 'bn' ? b.titleBn : b.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {lang === 'bn' ? b.descBn : b.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
