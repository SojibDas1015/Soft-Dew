import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Scissors,
  ArrowUpDown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { formatPrice, toBengaliDigits } from '../../utils/formatters';

export const ProductManagement = () => {
  const {
    products,
    deleteProduct,
    updateStock,
    setEditingProduct,
    setIsAddProductModalOpen,
    setSelectedProductForDetail,
    currency,
    lang
  } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter((prod) => {
    const matchSearch =
      prod.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (prod.nameBn && prod.nameBn.includes(searchFilter)) ||
      prod.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (prod.sku && prod.sku.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchCat = categoryFilter === 'all' || prod.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddProductModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(lang === 'bn' ? `আপনি কি নিশ্চিত যে "${name}" পণ্যটি ক্যাটালগ থেকে মুছে ফেলতে চান?` : `Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder={lang === 'bn' ? "পণ্য নাম, ব্র্যান্ড অথবা SKU দিয়ে খুঁজুন..." : "Filter by title, brand, or SKU..."}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none"
          >
            <option value="all">
              {lang === 'bn' ? `সব ক্যাটাগরি (${products.length})` : `All Categories (${products.length})`}
            </option>
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {lang === 'bn' ? c.nameBn : c.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Add Product Button (Primary Client Action) */}
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddProductModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm shadow-teal-700/20 active:scale-95 transition-all"
        >
          <Plus size={16} />
          <span>{lang === 'bn' ? 'নতুন পণ্য যুক্ত করুন' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">{lang === 'bn' ? 'পণ্য ও ছবি' : 'Product & Thumbnail'}</th>
                <th className="p-4">{lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                <th className="p-4">{lang === 'bn' ? 'মূল্য (৳)' : 'Price (৳)'}</th>
                <th className="p-4">{lang === 'bn' ? 'স্টক পরিমাণ' : 'Stock Level'}</th>
                <th className="p-4">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="p-4 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    {lang === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি।' : 'No products found matching filters.'}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLow = (p.stock || 0) < 15 && (p.stock || 0) > 0;
                  const isOut = (p.stock || 0) === 0;

                  return (
                    <tr 
                      key={p.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Product Thumbnail & Title */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                              {p.name}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                              <span className="font-semibold text-teal-700 dark:text-teal-400">{p.brand}</span>
                              <span>•</span>
                              <span className="font-mono">{p.sku}</span>
                              {p.isFlashDeal && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-bold text-[9px]">
                                  FLASH
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium capitalize text-[11px]">
                          {p.category.replace('-', ' ')}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                        <div>
                          {formatPrice(p.discountPrice || p.price, currency, lang)}
                        </div>
                        {p.discountPrice && (
                          <div className="text-[10px] text-slate-400 line-through font-normal">
                            {formatPrice(p.price, currency, lang)}
                          </div>
                        )}
                      </td>

                      {/* Quick Stock Controls */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateStock(p.id, -1)}
                            className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-mono font-bold">
                            {lang === 'bn' ? toBengaliDigits(p.stock || 0) : p.stock || 0}
                          </span>
                          <button
                            onClick={() => updateStock(p.id, 1)}
                            className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {isOut ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 text-[10px] font-bold">
                            {lang === 'bn' ? 'স্টক শেষ' : 'Out of Stock'}
                          </span>
                        ) : isLow ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold">
                            {lang === 'bn' ? 'সীমিত স্টক' : 'Low Stock'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold">
                            {lang === 'bn' ? 'ইন স্টক' : 'Active Stock'}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Preview on store */}
                          <button
                            onClick={() => setSelectedProductForDetail(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Preview on storefront"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Edit product details"
                          >
                            <Edit3 size={15} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
