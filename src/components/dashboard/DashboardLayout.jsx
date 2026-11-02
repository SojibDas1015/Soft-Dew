import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Scissors, 
  Plus, 
  ArrowLeft, 
  Sparkles,
  Store,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DashboardOverview } from './DashboardOverview';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { BookingManagement } from './BookingManagement';
import { AddProductModal } from './AddProductModal';

export const DashboardLayout = () => {
  const {
    dashboardTab,
    setDashboardTab,
    setActiveView,
    products,
    orders,
    bookings,
    setIsAddProductModalOpen,
    setEditingProduct,
    lang
  } = useStore();

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsAddProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-20">
      {/* Top Operations Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('store')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="Return to Customer Storefront"
            >
              <ArrowLeft size={14} />
              <span>{lang === 'bn' ? 'স্টোরফ্রন্টে ফিরুন' : 'Back to Store'}</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {lang === 'bn' ? 'সফট ডিউ সেলার ও ইনভেন্টরি সেন্টার' : 'Soft Dew Seller & Inventory Center'}
                </h1>
                <span className="hidden sm:inline px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-mono text-[10px] font-bold">
                  LIVE OPERATIONS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'পণ্য সংযোজন, স্টক ব্যবস্থাপনা ও কাস্টমার অর্ডার ফুলফিলমেন্ট' : 'Manage salon products, stock inventory, and orders'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-teal-700/20 active:scale-95 transition-all"
            >
              <Plus size={16} />
              <span>{lang === 'bn' ? 'নতুন পণ্য যোগ করুন' : 'Add New Product'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-2 custom-scrollbar text-xs font-bold">
            <button
              onClick={() => setDashboardTab('overview')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                dashboardTab === 'overview'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard size={15} />
              <span>{lang === 'bn' ? 'ওভারভিউ ড্যাশবোর্ড' : 'Overview'}</span>
            </button>

            <button
              onClick={() => setDashboardTab('products')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                dashboardTab === 'products'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers size={15} />
              <span>
                {lang === 'bn' ? `পণ্য ক্যাটালগ (${products.length})` : `Products Catalog (${products.length})`}
              </span>
            </button>

            <button
              onClick={() => setDashboardTab('orders')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                dashboardTab === 'orders'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ShoppingBag size={15} />
              <span>
                {lang === 'bn' ? `অর্ডার ফুলফিলমেন্ট (${orders.length})` : `Order Management (${orders.length})`}
              </span>
            </button>

            <button
              onClick={() => setDashboardTab('bookings')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                dashboardTab === 'bookings'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Scissors size={15} />
              <span>
                {lang === 'bn' ? `সেলুন সেটআপ ইনকোয়ারি (${bookings.length})` : `Setup Inquiries (${bookings.length})`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="container mx-auto px-4 py-8">
        {dashboardTab === 'overview' && <DashboardOverview />}
        {dashboardTab === 'products' && <ProductManagement />}
        {dashboardTab === 'orders' && <OrderManagement />}
        {dashboardTab === 'bookings' && <BookingManagement />}
      </main>

      {/* Add / Edit Product Modal */}
      <AddProductModal />
    </div>
  );
};
