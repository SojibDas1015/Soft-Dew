import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { CategoryRail } from './components/common/CategoryRail';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { Storefront } from './components/store/Storefront';
import { SalonServices } from './components/store/SalonServices';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { VisualSearchModal } from './components/store/VisualSearchModal';
import { TrackOrderModal } from './components/store/TrackOrderModal';
import { CompareModal } from './components/store/CompareModal';
import { CartDrawer } from './components/store/CartDrawer';
import { WishlistDrawer } from './components/store/WishlistDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { BookingModal } from './components/store/BookingModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { AdminLoginModal } from './components/dashboard/AdminLoginModal';
import './App.css';

const MainAppContent = () => {
  const { activeView, toast, isAdminAuthenticated, setIsAdminLoginModalOpen } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* 1. Top Navbar */}
      <Navbar />

      {/* 2. Collapsible Left Categories Rail Drawer */}
      <CategoryRail />

      {/* 3. Main Dynamic View Container */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeView === 'store' && <Storefront />}
        {activeView === 'services' && (
          <div className="py-6 animate-fade-in">
            <SalonServices />
          </div>
        )}
        {activeView === 'dashboard' && (
          isAdminAuthenticated ? (
            <DashboardLayout />
          ) : (
            <div className="min-h-[70vh] flex items-center justify-center p-4">
              <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xl space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  অ্যাডমিন ড্যাশবোর্ড লক করা রয়েছে
                </h2>
                <p className="text-xs text-slate-500">
                  ইনভেন্টরি, পণ্য সংযোজন ও অর্ডার ফুলফিলমেন্ট অ্যাক্সেস করতে আপনার অ্যাডমিন ক্রেডেনশিয়ালস দিয়ে লগইন করুন।
                </p>
                <button
                  onClick={() => setIsAdminLoginModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 active:scale-95 transition-all"
                >
                  লগইন ডায়ালগ খুলুন (Sign In)
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* 4. Interactive Drawers & Feature Modals */}
      <ProductDetailModal />
      <VisualSearchModal />
      <TrackOrderModal />
      <CompareModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <BookingModal />
      <AdminLoginModal />

      {/* 5. Mobile-First Bottom Navigation Dock */}
      <MobileBottomNav />

      {/* 6. Live Toast Notifications */}
      <Toast toast={toast} />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}

export default App;
