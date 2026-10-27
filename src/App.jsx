import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { Storefront } from './components/store/Storefront';
import { SalonServices } from './components/store/SalonServices';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { BeautyQuizModal } from './components/store/BeautyQuizModal';
import { BookingModal } from './components/store/BookingModal';
import { CartDrawer } from './components/store/CartDrawer';
import { WishlistDrawer } from './components/store/WishlistDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import './App.css';

const MainAppContent = () => {
  const { activeView, toast } = useStore();

  return (
    <>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="main-content-flow">
        {activeView === 'store' && <Storefront />}
        {activeView === 'services' && (
          <div className="pt-6 animate-fade-in">
            <SalonServices />
          </div>
        )}
        {activeView === 'dashboard' && <DashboardLayout />}
      </main>

      {/* Modals & Slide-out Drawers */}
      <ProductDetailModal />
      <BeautyQuizModal />
      <BookingModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />

      {/* Mobile Ergonomic Bottom Navigation Dock */}
      <MobileBottomNav />

      {/* Real-time Toast Notifications */}
      <Toast toast={toast} />

      {/* Footer */}
      <Footer />
    </>
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
