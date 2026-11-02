import React, { useState } from 'react';
import { X, Camera, Upload, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const VisualSearchModal = () => {
  const {
    isVisualSearchOpen,
    setIsVisualSearchOpen,
    products,
    setSelectedProductForDetail,
    lang
  } = useStore();

  const [analyzing, setAnalyzing] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);

  if (!isVisualSearchOpen) return null;

  const sampleImages = [
    {
      id: 'sample-scissors',
      labelBn: 'প্রফেশনাল কাঁচি',
      labelEn: 'Pro Cutting Shears',
      category: 'scissors-razors',
      image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sample-clipper',
      labelBn: 'ক্লিপার ও ট্রিমার',
      labelEn: 'Barber Clipper',
      category: 'trimmers-clippers',
      image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sample-dryer',
      labelBn: 'আয়নিক ড্রায়ার',
      labelEn: 'Hair Dryer',
      category: 'hair-dryers',
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sample-color',
      labelBn: 'ব্ল্যাক হেয়ার কালার',
      labelEn: 'Black Hair Color',
      category: 'hair-color',
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const handleSimulateScan = (category, sample) => {
    setSelectedSample(sample);
    setAnalyzing(true);
    setMatchedProducts([]);

    setTimeout(() => {
      const matches = products.filter((p) => p.category === category);
      setMatchedProducts(matches);
      setAnalyzing(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsVisualSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <Camera size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {lang === 'bn' ? 'ছবি দিয়ে পণ্য খুঁজুন' : 'Visual Smart Camera Search'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'সেলুন আইটেমের ছবি আপলোড করে নিমেষেই ম্যাচিং পণ্য বের করুন' : 'Find salon equipment and tools by uploading or scanning a photo'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisualSearchOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="mt-5 border-2 border-dashed border-teal-300 dark:border-teal-800/60 rounded-2xl p-6 text-center bg-teal-50/40 dark:bg-teal-950/20 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform">
            <Upload size={22} />
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {lang === 'bn' ? 'এখানে ছবি আপলোড করুন' : 'Drop your photo here or browse'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            PNG, JPG, WEBP • Max 10MB
          </p>
        </div>

        {/* Or Try Sample Photos */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'bn' ? 'অথবা ডেমো নমুনা ছবি সিলেক্ট করুন:' : 'Or tap a demo sample:'}
            </span>
            {selectedSample && (
              <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1">
                <Check size={14} /> {lang === 'bn' ? selectedSample.labelBn : selectedSample.labelEn}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {sampleImages.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSimulateScan(sample.category, sample)}
                className={`relative rounded-xl overflow-hidden border-2 transition-all group aspect-square flex flex-col justify-end p-2 text-left ${
                  selectedSample?.id === sample.id 
                    ? 'border-teal-600 ring-2 ring-teal-500/30' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-teal-400'
                }`}
              >
                <img 
                  src={sample.image} 
                  alt={sample.labelEn}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="relative z-10 text-[11px] font-bold text-white leading-tight">
                  {lang === 'bn' ? sample.labelBn : sample.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Scan Results */}
        {analyzing && (
          <div className="mt-6 p-6 rounded-2xl bg-teal-50/60 dark:bg-slate-800 flex items-center justify-center gap-3 text-teal-800 dark:text-teal-300">
            <Sparkles className="animate-spin text-teal-600" size={20} />
            <span className="text-sm font-semibold">
              {lang === 'bn' ? 'ছবি স্ক্যান ও ক্যাটালগ ম্যাচিং হচ্ছে...' : 'Analyzing salon visual features & matching SKU...'}
            </span>
          </div>
        )}

        {matchedProducts.length > 0 && !analyzing && (
          <div className="mt-5 border-t border-slate-100 dark:border-slate-800 pt-4 animate-fade-in">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              {lang === 'bn' ? `পাওয়া গেছে (${matchedProducts.length}টি ম্যাচিং পণ্য)` : `Matched Products (${matchedProducts.length})`}
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {matchedProducts.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => {
                    setSelectedProductForDetail(p);
                    setIsVisualSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-500 hover:bg-teal-50/30 dark:hover:bg-teal-950/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-teal-600 transition-colors">
                        {lang === 'bn' ? p.nameBn || p.name : p.name}
                      </p>
                      <p className="text-[11px] text-teal-700 dark:text-teal-400 font-bold mt-0.5">
                        ৳ {p.discountPrice || p.price}
                      </p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{lang === 'bn' ? 'দেখুন' : 'View'}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
