import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Phone, 
  MapPin, 
  CreditCard,
  Search
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const OrderManagement = () => {
  const { orders, updateOrderStatus, currency } = useStore();
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerPhone.includes(search);
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Shipped':
        return 'status-shipped';
      case 'Processing':
        return 'status-processing';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="order-management-wrapper animate-fade-in">
      {/* Top Filter Bar */}
      <div className="table-controls-bar">
        <div className="search-filter-pair">
          <div className="table-search-box">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID, customer, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="table-search-input"
            />
          </div>

          <div className="status-tabs-row">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`status-tab-btn ${statusFilter === st ? 'active' : ''}`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID & Date</th>
                <th>Customer & Address</th>
                <th>Items Ordered</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No customer orders found under "{statusFilter}".
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <div>
                        <strong className="font-mono text-rose-600 block">{ord.id}</strong>
                        <span className="text-xs text-slate-400">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <strong className="block text-sm">{ord.customerName}</strong>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone size={11} /> {ord.customerPhone}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={11} /> {ord.deliveryAddress}
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="order-items-snippet">
                        {ord.items && ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                            <span>• {it.quantity}x</span>
                            <span className="truncate max-w-[140px]">{it.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td>
                      <span className="pay-method-tag">
                        <CreditCard size={11} className="inline mr-1" />
                        {ord.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <strong className="text-sm font-bold text-slate-900">
                        {formatPrice(ord.total, currency)}
                      </strong>
                    </td>

                    <td>
                      <span className={`status-pill ${getStatusBadge(ord.status)}`}>
                        {ord.status}
                      </span>
                    </td>

                    <td>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="status-change-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
