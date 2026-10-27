import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Scissors, 
  Plus, 
  ArrowLeft, 
  Sparkles,
  Store
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
    setEditingProduct
  } = useStore();

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsAddProductModalOpen(true);
  };

  return (
    <div className="dashboard-main-container">
      {/* Top Operations Header */}
      <div className="dashboard-top-nav glass-nav">
        <div className="container dashboard-header-inner">
          <div className="dashboard-title-group">
            <button
              onClick={() => setActiveView('store')}
              className="back-to-store-btn"
              title="Return to Customer Storefront"
            >
              <ArrowLeft size={16} />
              <span>Back to Storefront</span>
            </button>
            <div className="dashboard-heading-wrap">
              <h1 className="dashboard-main-title">Salon & Seller Center</h1>
              <span className="dashboard-badge">Live Store Operations</span>
            </div>
          </div>

          <div className="dashboard-header-actions">
            <button
              onClick={handleOpenAdd}
              className="btn btn-primary btn-sm add-prod-trigger"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs-bar">
        <div className="container">
          <div className="dash-tabs-track">
            <button
              onClick={() => setDashboardTab('overview')}
              className={`dash-tab-btn ${dashboardTab === 'overview' ? 'active' : ''}`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setDashboardTab('products')}
              className={`dash-tab-btn ${dashboardTab === 'products' ? 'active' : ''}`}
            >
              <Layers size={16} />
              <span>Products Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => setDashboardTab('orders')}
              className={`dash-tab-btn ${dashboardTab === 'orders' ? 'active' : ''}`}
            >
              <ShoppingBag size={16} />
              <span>Orders Fulfillment ({orders.length})</span>
            </button>

            <button
              onClick={() => setDashboardTab('bookings')}
              className={`dash-tab-btn ${dashboardTab === 'bookings' ? 'active' : ''}`}
            >
              <Scissors size={16} />
              <span>Salon Appointments ({bookings.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="container dashboard-content-body">
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
