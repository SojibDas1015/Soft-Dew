import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Layers, 
  Scissors, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const DashboardOverview = () => {
  const { 
    products, 
    orders, 
    bookings, 
    setDashboardTab, 
    setIsAddProductModalOpen, 
    setEditingProduct,
    currency 
  } = useStore();

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  const lowStockCount = products.filter((p) => (p.stock || 0) <= 10).length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;

  return (
    <div className="dashboard-overview-wrapper animate-fade-in">
      {/* 4 Main Stat Cards */}
      <div className="overview-stats-grid">
        {/* Stat 1: Revenue */}
        <div className="stat-metric-card glass-panel">
          <div className="metric-header">
            <span className="metric-title">Total Gross Sales</span>
            <div className="metric-icon-box bg-rose-50 text-rose-600">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="metric-value">{formatPrice(totalRevenue, currency)}</div>
          <div className="metric-trend text-emerald">
            <TrendingUp size={14} className="inline mr-1" />
            <span>+18.4% from last week</span>
          </div>
        </div>

        {/* Stat 2: Orders */}
        <div className="stat-metric-card glass-panel">
          <div className="metric-header">
            <span className="metric-title">Orders Received</span>
            <div className="metric-icon-box bg-amber-50 text-amber-600">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="metric-value">{orders.length} Orders</div>
          <div className="metric-trend text-amber-600">
            <span>{pendingOrdersCount} pending fulfillment</span>
          </div>
        </div>

        {/* Stat 3: Products */}
        <div className="stat-metric-card glass-panel">
          <div className="metric-header">
            <span className="metric-title">Active Catalog Items</span>
            <div className="metric-icon-box bg-indigo-50 text-indigo-600">
              <Layers size={20} />
            </div>
          </div>
          <div className="metric-value">{products.length} Products</div>
          <div className={`metric-trend ${lowStockCount > 0 ? 'text-rose-500' : 'text-slate-500'}`}>
            {lowStockCount > 0 ? (
              <>
                <AlertTriangle size={13} className="inline mr-1" />
                <span>{lowStockCount} items low on stock</span>
              </>
            ) : (
              <span>All items adequately stocked</span>
            )}
          </div>
        </div>

        {/* Stat 4: Salon Appointments */}
        <div className="stat-metric-card glass-panel">
          <div className="metric-header">
            <span className="metric-title">Salon Appointments</span>
            <div className="metric-icon-box bg-emerald-50 text-emerald">
              <Scissors size={20} />
            </div>
          </div>
          <div className="metric-value">{bookings.length} Booked</div>
          <div className="metric-trend text-emerald">
            <span>Gulshan & Banani Lounges</span>
          </div>
        </div>
      </div>

      {/* Quick Action & Publisher Banner */}
      <div className="quick-action-banner">
        <div className="action-banner-text">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-emerald" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald">
              Verified Seller Central
            </span>
          </div>
          <h3 className="text-xl font-bold">Expand Your Salon Beauty Catalog</h3>
          <p className="text-slate-600 text-xs max-w-lg">
            Add imported Korean skincare, salon-grade hair treatments, or professional styling tools. Instant live publishing to the storefront.
          </p>
        </div>

        <div className="action-banner-btn-group">
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsAddProductModalOpen(true);
            }}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>Add New Product Now</span>
          </button>
          <button
            onClick={() => setDashboardTab('products')}
            className="btn btn-outline btn-sm"
          >
            Manage Catalog →
          </button>
        </div>
      </div>

      {/* Grid: Recent Orders & Top Stock */}
      <div className="overview-split-grid">
        {/* Recent Orders Box */}
        <div className="overview-subcard">
          <div className="subcard-header">
            <h4 className="subcard-title">Recent Client Orders</h4>
            <button 
              onClick={() => setDashboardTab('orders')} 
              className="text-xs text-rose-600 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="recent-orders-list">
            {orders.slice(0, 4).map((ord) => (
              <div key={ord.id} className="recent-order-item">
                <div className="flex items-center gap-3">
                  <div className="order-circle-icon">
                    <ShoppingBag size={16} className="text-rose-600" />
                  </div>
                  <div>
                    <h5 className="recent-order-customer">{ord.customerName}</h5>
                    <span className="recent-order-meta">
                      {ord.id} • {ord.items ? ord.items.length : 1} items • {ord.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="recent-order-total block font-bold text-sm">
                    {formatPrice(ord.total, currency)}
                  </span>
                  <span className={`status-pill mini status-${ord.status.toLowerCase()}`}>
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products Quick View */}
        <div className="overview-subcard">
          <div className="subcard-header">
            <h4 className="subcard-title">Top Performing Beauty Items</h4>
            <button 
              onClick={() => setDashboardTab('products')} 
              className="text-xs text-rose-600 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>Manage All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="top-prods-list">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="top-prod-row">
                <img src={p.image} alt={p.name} className="top-prod-thumb" />
                <div className="top-prod-info">
                  <span className="top-prod-brand">{p.brand}</span>
                  <h5 className="top-prod-name">{p.name}</h5>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Stock: <strong className={p.stock <= 10 ? 'text-rose-600' : 'text-slate-800'}>{p.stock}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star size={11} className="fill-amber-400" /> {p.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-slate-900 block">
                    {formatPrice(p.discountPrice || p.price, currency)}
                  </span>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">{p.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
