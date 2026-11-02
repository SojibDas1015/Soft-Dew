import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Sparkles, 
  Image as ImageIcon, 
  ShieldCheck, 
  Tag, 
  DollarSign, 
  Layers, 
  Zap, 
  Scissors,
  Check,
  Eye
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRESET_IMAGE_OPTIONS } from '../../data/initialProducts';
import { CATEGORIES, BRANDS } from '../../data/categories';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export const AddProductModal = () => {
  const {
    isAddProductModalOpen,
    setIsAddProductModalOpen,
    editingProduct,
    setEditingProduct,
    addProduct,
    updateProduct,
    lang,
    currency
  } = useStore();

  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [brand, setBrand] = useState('Soft Dew BD');
  const [category, setCategory] = useState('scissors-razors');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('30');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState(PRESET_IMAGE_OPTIONS[0].url);
  const [customImage, setCustomImage] = useState('');
  const [description, setDescription] = useState('');
  const [specsNotes, setSpecsNotes] = useState('Pro Japanese Steel • Ergonomic Crane Grip');
  const [howToUse, setHowToUse] = useState('');
  const [variantsStr, setVariantsStr] = useState('Standard Size, Pro Edition');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isFlashDeal, setIsFlashDeal] = useState(false);

  // Populate when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || '');
      setNameBn(editingProduct.nameBn || '');
      setBrand(editingProduct.brand || 'Soft Dew BD');
      setCategory(editingProduct.category || 'scissors-razors');
      setPrice(editingProduct.price ? String(editingProduct.price) : '');
      setDiscountPrice(editingProduct.discountPrice ? String(editingProduct.discountPrice) : '');
      setStock(editingProduct.stock ? String(editingProduct.stock) : '25');
      setSku(editingProduct.sku || '');
      setImage(editingProduct.image || PRESET_IMAGE_OPTIONS[0].url);
      setDescription(editingProduct.description || '');
      setSpecsNotes(editingProduct.trustNotes || '');
      setHowToUse(editingProduct.howToUse || '');
      setVariantsStr(editingProduct.variants ? editingProduct.variants.join(', ') : 'Standard');
      setIsFeatured(editingProduct.isFeatured || false);
      setIsFlashDeal(editingProduct.isFlashDeal || false);
    } else {
      resetForm();
    }
  }, [editingProduct, isAddProductModalOpen]);

  const resetForm = () => {
    setName('');
    setNameBn('');
    setBrand('Soft Dew BD');
    setCategory('scissors-razors');
    setPrice('');
    setDiscountPrice('');
    setStock('30');
    setSku('');
    setImage(PRESET_IMAGE_OPTIONS[1].url);
    setCustomImage('');
    setDescription('');
    setSpecsNotes('Pro Japanese Steel • Ergonomic Crane Grip');
    setHowToUse('');
    setVariantsStr('Standard Size, Pro Edition');
    setIsFeatured(false);
    setIsFlashDeal(false);
  };

  if (!isAddProductModalOpen) return null;

  const handleClose = () => {
    setIsAddProductModalOpen(false);
    setEditingProduct(null);
  };

  const activeImg = customImage.trim() || image;
  const discountPct = calculateDiscount(Number(price) || 0, Number(discountPrice) || null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !price) {
      alert(lang === 'bn' ? 'পণ্যের নাম ও মূল্য পূরণ করা বাধ্যতামূলক।' : 'Product name and price are required.');
      return;
    }

    const variantsArray = variantsStr.split(',').map((v) => v.trim()).filter(Boolean);

    const productPayload = {
      name: name.trim(),
      nameBn: nameBn.trim() || name.trim(),
      brand,
      category,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : null,
      stock: Number(stock) || 0,
      sku: sku.trim() || `SLX-${category.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      image: activeImg,
      gallery: [activeImg],
      trustNotes: specsNotes || 'High performance salon specification standard',
      description: description || 'Professional salon-grade item curated for barber shops and beauty parlors.',
      howToUse: howToUse || 'Use according to salon equipment operating guidelines.',
      variants: variantsArray.length > 0 ? variantsArray : ['Standard'],
      isFeatured,
      isFlashDeal
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 z-10 animate-fade-in max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <Scissors size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {editingProduct 
                  ? (lang === 'bn' ? 'পণ্য তথ্য সংশোধন করুন' : 'Edit Salon Product') 
                  : (lang === 'bn' ? 'নতুন সেলুন পণ্য যুক্ত করুন' : 'Add New Salon Product')}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'এখানে পণ্য যোগ করলেই সরাসরি সফট ডিউ স্টোরফ্রন্টে লাইভ হবে' : 'New products will immediately appear on the live customer storefront'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Inputs (2 Columns on large screens) */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4 text-xs">
            {/* Title (English) */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'bn' ? 'পণ্যের নাম (ইংরেজি) *' : 'Product Title (English) *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. BS Professional Hair Cutting Scissors 6.0 Inch"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {/* Title (Bangla) */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'bn' ? 'পণ্যের নাম (বাংলা)' : 'Product Title (Bangla)'}
              </label>
              <input
                type="text"
                placeholder="যেমন: বিএস প্রফেশনাল হেয়ার কাটিং কাঁচি ৬.০ ইঞ্চি"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {/* Category & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {lang === 'bn' ? 'ক্যাটাগরি *' : 'Category *'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none font-semibold"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {lang === 'bn' ? c.nameBn : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {lang === 'bn' ? 'ব্র্যান্ড' : 'Brand Name'}
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none font-semibold"
                >
                  {BRANDS.map((b) => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Regular Price & Discount Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {lang === 'bn' ? 'নিয়মিত মূল্য (টাকা ৳) *' : 'Regular Price (৳) *'}
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 600"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {lang === 'bn' ? 'ছাড়কৃত অফার মূল্য (টাকা ৳)' : 'Special Sale Price (৳)'}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 429"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Stock & SKU */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {lang === 'bn' ? 'স্টক ইনভেন্টরি পরিমাণ *' : 'Stock Quantity *'}
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 25"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  SKU Code (Auto / Custom)
                </label>
                <input
                  type="text"
                  placeholder="e.g. SLX-SCI-002"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono uppercase focus:outline-none"
                />
              </div>
            </div>

            {/* Preset Images Gallery Picker */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                {lang === 'bn' ? 'পণ্যের ছবি বাছাই করুন (প্রিসেট গ্যালারি):' : 'Select Product Photo (Preset Salon Gallery):'}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-2">
                {PRESET_IMAGE_OPTIONS.map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => { setImage(opt.url); setCustomImage(''); }}
                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      image === opt.url && !customImage
                        ? 'border-teal-600 ring-2 ring-teal-500/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={opt.url} alt={opt.name} className="w-full h-full object-cover" />
                    {image === opt.url && !customImage && (
                      <div className="absolute inset-0 bg-teal-600/30 flex items-center justify-center text-white">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <input
                type="url"
                placeholder={lang === 'bn' ? "অথবা কাস্টম ইমেজ লিংক (URL) দিন..." : "Or paste custom image URL..."}
                value={customImage}
                onChange={(e) => setCustomImage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs focus:outline-none"
              />
            </div>

            {/* Technical Specs Notes */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'bn' ? 'টেকনিক্যাল স্পেক্স ও সেলুন নোটস' : 'Technical Specifications & Salon Notes'}
              </label>
              <input
                type="text"
                placeholder="যেমন: 2200W Copper AC Motor • 440C Stainless Steel • 1 Year Warranty"
                value={specsNotes}
                onChange={(e) => setSpecsNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'bn' ? 'পণ্যের বিবরণ' : 'Product Description'}
              </label>
              <textarea
                rows={2}
                placeholder={lang === 'bn' ? "সেলুন ও পার্লারে ব্যবহারের সুবিধা ও গুণগত মান..." : "Key salon benefits and features..."}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            {/* Toggles: Flash Deal & Featured */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-slate-50 dark:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={isFlashDeal}
                  onChange={(e) => setIsFlashDeal(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'bn' ? '⚡ ফ্ল্যাশ ডিল সেকশনে দেখান' : '⚡ Add to Flash Deals'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-slate-50 dark:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'bn' ? '★ নির্বাচিত বেস্টসেলার' : '★ Featured Bestseller'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 active:scale-98 transition-all mt-4"
            >
              <Plus size={16} />
              <span>
                {editingProduct 
                  ? (lang === 'bn' ? 'আপডেট সংরক্ষণ করুন' : 'Save Changes') 
                  : (lang === 'bn' ? 'ক্যাটালগে পণ্য যুক্ত করুন' : 'Publish Product to Store')}
              </span>
            </button>
          </form>

          {/* Right Column: Live Card Preview */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-3">
                <Eye size={14} />
                <span>{lang === 'bn' ? 'লাইভ প্রিভিউ কার্ড' : 'Storefront Live Preview'}</span>
              </div>

              {/* Mock Product Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md">
                <div className="relative aspect-square bg-slate-100 dark:bg-slate-800">
                  <img src={activeImg} alt="Preview" className="w-full h-full object-cover" />
                  {discountPct > 0 && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-rose-600 text-white font-extrabold text-[10px]">
                      -{discountPct}%
                    </span>
                  )}
                  {isFlashDeal && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[10px]">
                      ⚡ FLASH
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-semibold text-teal-700 dark:text-teal-400">{brand}</span>
                    <span>★ 5.0</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 mb-2">
                    {name || 'Product Title Preview'}
                  </h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-black text-sm text-teal-800 dark:text-teal-300">
                      {formatPrice(discountPrice || price || 0, currency, lang)}
                    </span>
                    {discountPrice && price && (
                      <span className="font-mono text-[10px] text-slate-400 line-through">
                        {formatPrice(price, currency, lang)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 text-[11px] text-teal-900 dark:text-teal-200">
              <span className="font-bold block mb-0.5">{lang === 'bn' ? 'তাত্ক্ষণিক সিঙ্ক:' : 'Instant Sync:'}</span>
              {lang === 'bn' 
                ? 'পণ্য যুক্ত করার সাথে সাথে এটি স্টোরফ্রন্ট, সার্চ বার ও ক্যাটাগরিতে শো করবে।' 
                : 'Products added here instantly sync to the customer storefront and search index.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
