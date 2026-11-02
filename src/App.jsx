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
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import './App.css';

const MainAppContent = () => {
  const { activeView, toast } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* 1. Top Navbar */}
      <Navbar />

      {/* 2. Collapsible Left Categories Rail Drawer (Matching SalonixBD) */}
      <CategoryRail />

      {/* 3. Main Dynamic View Container */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeView === 'store' && <Storefront />}
        {activeView === 'services' && (
          <div className="py-6 animate-fade-in">
            <SalonServices />
          </div>
        )}
        {activeView === 'dashboard' && <DashboardLayout />}
      </main>

      {/* 4. Interactive Drawers & Feature Modals */}
      <ProductDetailModal />
      <VisualSearchModal />
      <TrackOrderModal />
      <CompareModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />

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
