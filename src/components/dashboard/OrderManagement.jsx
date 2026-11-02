import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MapPin, 
  Search,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, formatDate } from '../../utils/formatters';

export const OrderManagement = () => {
  const { orders, updateOrderStatus, currency, lang } = useStore();
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder={lang === 'bn' ? "অর্ডার আইডি, গ্রাহকের নাম বা ফোন দিয়ে খুঁজুন..." : "Search by Order ID, customer name or phone..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold custom-scrollbar">
          {['All', 'Processing', 'In Transit', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                statusFilter === st
                  ? 'bg-teal-700 text-white shadow-xs font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">{lang === 'bn' ? 'অর্ডার নং ও তারিখ' : 'Order ID & Date'}</th>
                <th className="p-4">{lang === 'bn' ? 'গ্রাহক ও ডেলিভারি ঠিকানা' : 'Customer & Delivery Info'}</th>
                <th className="p-4">{lang === 'bn' ? 'অর্ডারকৃত আইটেম' : 'Items Ordered'}</th>
                <th className="p-4">{lang === 'bn' ? 'পেমেন্ট' : 'Payment'}</th>
                <th className="p-4">{lang === 'bn' ? 'মোট মূল্য' : 'Total (৳)'}</th>
                <th className="p-4">{lang === 'bn' ? 'স্ট্যাটাস আপডেট' : 'Update Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    {lang === 'bn' ? 'কোনো অর্ডার রেকর্ড পাওয়া যায়নি।' : 'No orders found matching filters.'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Order ID & Date */}
                    <td className="p-4">
                      <span className="font-mono font-bold text-teal-700 dark:text-teal-400 text-sm block">
                        {ord.id}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {formatDate(ord.createdAt, lang)}
                      </span>
                    </td>

                    {/* Customer & Address */}
                    <td className="p-4">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {ord.customerName}
                      </span>
                      <a 
                        href={`tel:${ord.customerPhone}`}
                        className="text-[11px] text-teal-600 dark:text-teal-400 font-mono flex items-center gap-1 hover:underline my-0.5"
                      >
                        <Phone size={11} />
                        <span>{ord.customerPhone}</span>
                      </a>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[220px]">
                        {ord.deliveryAddress}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="p-4">
                      <div className="space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="text-[11px] text-slate-600 dark:text-slate-300">
                            <span className="font-semibold">• {it.name}</span>
                            <span className="text-slate-400 ml-1">x{it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px] block w-fit">
                        {ord.paymentMethod}
                      </span>
                      {ord.courier && (
                        <span className="text-[10px] text-teal-600 block mt-1">
                          {ord.courier}
                        </span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="p-4 font-mono font-bold text-teal-800 dark:text-teal-300 text-sm">
                      {formatPrice(ord.total, currency, lang)}
                    </td>

                    {/* Status Changer */}
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : ord.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
                            : ord.status === 'Processing'
                            ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="In Transit">In Transit</option>
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
