import React from 'react';
import { Scissors, Phone, Mail, MapPin, ShieldCheck, Truck, Headphones, ExternalLink } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer = () => {
  const { setActiveView, setSelectedCategory, setIsTrackOrderOpen, lang } = useStore();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-bold">
                <Scissors size={18} />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                Soft<span className="text-emerald-400">Dew</span> BD
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {lang === 'bn' 
                ? 'বাংলাদেশের সর্ববৃহৎ সেলুন আইটেম বিক্রয়ের নির্ভরযোগ্য অনলাইন শপ। সেলুনের প্রয়োজনীয় কাঁচি, ট্রিমার, হেয়ার কালার ও ফার্নিচার এখন এক জায়গায়।'
                : "Bangladesh's largest reliable online marketplace for professional barber tools, scissors, hair care, and salon setups."}
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-slate-300">
              <a href="tel:+8801511008100" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone size={14} className="text-emerald-400" />
                <span>+880 1511-008100 (Hotline)</span>
              </a>
              <a href="https://wa.me/8801511008100" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <span className="text-emerald-400 font-bold">WA</span>
                <span>WhatsApp Order & Support</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400" />
                <span>Mirpur-10, Dhaka - 1216, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-3">
              {lang === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Product Categories'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActiveView('store'); setSelectedCategory('scissors-razors'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'bn' ? 'কাঁচি ও রেজর ব্লেড' : 'Pro Scissors & Razors'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('store'); setSelectedCategory('trimmers-clippers'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'bn' ? 'ট্রিমার ও ক্লিপার' : 'Trimmers & Hair Clippers'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('store'); setSelectedCategory('hair-color'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'bn' ? 'সেলুন হেয়ার কালার' : 'Salon Hair Colors'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('store'); setSelectedCategory('hair-dryers'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'bn' ? 'হেয়ার ড্রায়ার ও স্ট্রেইটনার' : 'Hair Dryers & Straighteners'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('store'); setSelectedCategory('salon-furniture'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'bn' ? 'সেলুন সেটআপ ও ফার্নিচার' : 'Salon Chairs & Setup'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-3">
              {lang === 'bn' ? 'গ্রাহক সেবা' : 'Customer Service'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="hover:text-emerald-400 transition-colors text-emerald-400 font-bold"
                >
                  {lang === 'bn' ? 'লাইভ অর্ডার ট্র্যাকিং' : 'Live Order Tracking'}
                </button>
              </li>
              <li>
                <a href="#products-catalog-section" className="hover:text-emerald-400 transition-colors">
                  {lang === 'bn' ? 'ফ্ল্যাশ ডিল ও অফার' : 'Flash Deals & Offers'}
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'bn' ? 'ক্লায়েন্ট সেলার ড্যাশবোর্ড' : 'Client Vendor Center'}
                </button>
              </li>
              <li>
                <a href="https://wa.me/8801511008100?text=I%20want%20to%20apply%20as%20a%20supplier" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  {lang === 'bn' ? 'সেল অন সফট ডিউ (ভেন্ডর অনবোর্ডিং)' : 'Sell on Soft Dew'}
                </a>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {lang === 'bn' ? 'রিফান্ড ও রিটার্ন পলিসি' : 'Refund & Return Policy'}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment Methods & Trust */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-3">
              {lang === 'bn' ? 'পেমেন্ট ও ডেলিভারি পার্টনার' : 'Payment & Delivery'}
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              {lang === 'bn' 
                ? 'আমরা সারা বাংলাদেশে ক্যাশ অন ডেলিভারি, বিকাশ ও নগদের মাধ্যমে পেমেন্ট গ্রহণ করি।' 
                : '100% Secure checkout via Cash on Delivery, bKash, and Nagad.'}
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center font-bold text-rose-500 text-[11px]">
                bKash
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center font-bold text-amber-500 text-[11px]">
                Nagad
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center font-bold text-teal-400 text-[11px]">
                COD ৳
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-white font-bold block mb-0.5">
                {lang === 'bn' ? 'কুরিয়ার পার্টনার:' : 'Courier Partners:'}
              </span>
              Pathao Express • Steadfast Courier • RedX
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Soft Dew BD. All Rights Reserved. Inspired by salonixbd.com with Next-Gen Aesthetics.</p>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-white">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
