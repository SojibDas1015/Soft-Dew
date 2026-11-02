import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  Banknote, 
  CreditCard,
  User,
  ShoppingBag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toBengaliDigits } from '../../utils/formatters';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    placeOrder,
    currency,
    lang
  } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('inside-dhaka');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [bkashNumber, setBkashNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const shippingCost = deliveryOption === 'inside-dhaka' ? 60 : 120;
  const grandTotal = cartSubtotal + shippingCost;

  const bangladeshDivisions = [
    'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'
  ];

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে নাম, ফোন নম্বর এবং সম্পূর্ণ ঠিকানা লিখুন।' : 'Please fill in your name, phone number, and address.');
      return;
    }

    const orderPayload = {
      customerName: name,
      customerPhone: phone,
      division,
      district,
      deliveryAddress: `${address}, ${district}, ${division}`,
      deliveryOption: deliveryOption === 'inside-dhaka' ? 'Inside Dhaka (24-48h)' : 'Outside Dhaka (2-3 Days)',
      paymentMethod,
      paymentDetails: paymentMethod === 'bKash' || paymentMethod === 'Nagad' ? { senderNumber: bkashNumber, trxId } : null,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee: shippingCost,
      total: grandTotal
    };

    const newOrder = placeOrder(orderPayload);
    setConfirmedOrder(newOrder);
    setOrderConfirmed(true);

    try {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleFinish}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 z-10 animate-fade-in max-h-[92vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors z-20"
        >
          <X size={18} />
        </button>

        {!orderConfirmed ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                <Truck size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {lang === 'bn' ? 'অর্ডার কনফার্মেশন ও চেকআউট' : 'Order Checkout & Delivery'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'bn' ? 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা' : 'Fast cash on delivery across all 64 districts in Bangladesh'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'bn' ? "যেমন: রফিকুল ইসলাম" : "e.g., Rafiqul Islam"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Division & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {lang === 'bn' ? 'বিভাগ *' : 'Division *'}
                  </label>
                  <select
                    value={division}
                    onChange={(e) => {
                      setDivision(e.target.value);
                      if (e.target.value === 'Dhaka') {
                        setDeliveryOption('inside-dhaka');
                      } else {
                        setDeliveryOption('outside-dhaka');
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs focus:outline-none font-semibold"
                  >
                    {bangladeshDivisions.map((div) => (
                      <option key={div} value={div}>{div}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {lang === 'bn' ? 'জেলা / শহর *' : 'District / City *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? "যেমন: মিরপুর, ঢাকা" : "e.g., Mirpur, Dhaka"}
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Detailed Address */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {lang === 'bn' ? 'সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/দোকান নং, রোড, এলাকা) *' : 'Full Delivery Address (House/Shop #, Road, Area) *'}
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder={lang === 'bn' ? "দোকান #৪, মেট্রো শপিং মল, মিরপুর-১০, ঢাকা" : "Shop #4, Metro Mall, Mirpur-10, Dhaka"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs focus:outline-none"
                />
              </div>

              {/* Delivery Speed / Zone Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {lang === 'bn' ? 'ডেলিভারি এরিয়া সিলেক্ট করুন:' : 'Delivery Region:'}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setDeliveryOption('inside-dhaka')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                      deliveryOption === 'inside-dhaka'
                        ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 ring-1 ring-teal-500'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    <div>
                      <span className="font-bold block">{lang === 'bn' ? 'ঢাকার ভেতরে (২৪-৪৮ ঘণ্টা)' : 'Inside Dhaka'}</span>
                      <span className="text-[11px] text-slate-500">Pathao Express</span>
                    </div>
                    <span className="font-mono font-bold text-teal-700 dark:text-teal-400">৳ ৬০</span>
                  </div>

                  <div
                    onClick={() => setDeliveryOption('outside-dhaka')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                      deliveryOption === 'outside-dhaka'
                        ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 ring-1 ring-teal-500'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    <div>
                      <span className="font-bold block">{lang === 'bn' ? 'ঢাকার বাইরে (২-৩ দিন)' : 'Outside Dhaka'}</span>
                      <span className="text-[11px] text-slate-500">Steadfast Courier</span>
                    </div>
                    <span className="font-mono font-bold text-teal-700 dark:text-teal-400">৳ ১২০</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {lang === 'bn' ? 'পেমেন্ট মেথড:' : 'Payment Method:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/50 text-teal-900 dark:text-teal-200 ring-1 ring-teal-500 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Banknote size={16} className="mx-auto mb-1 text-teal-600" />
                    <span className="text-[11px] block">{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bKash')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'bKash'
                        ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-sm font-bold text-rose-600 block mb-1">bKash</span>
                    <span className="text-[11px] block">{lang === 'bn' ? 'বিকাশ পেমেন্ট' : 'bKash'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Nagad')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Nagad'
                        ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 ring-1 ring-amber-500 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-sm font-bold text-amber-600 block mb-1">Nagad</span>
                    <span className="text-[11px] block">{lang === 'bn' ? 'নগদ পেমেন্ট' : 'Nagad'}</span>
                  </button>
                </div>

                {/* bKash / Nagad Trx Details */}
                {(paymentMethod === 'bKash' || paymentMethod === 'Nagad') && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <p className="text-[11px] text-slate-500">
                      {lang === 'bn' 
                        ? `মার্চেন্ট নম্বর 01511-008100 এ মোট ${formatPrice(grandTotal, currency, lang)} Send Money/Payment করুন এবং নিচের বক্সে TrxID দিন:` 
                        : `Send BDT ${grandTotal} to 01511-008100 and enter your Transaction ID below:`}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        placeholder={lang === 'bn' ? "সেন্ডার নম্বর" : "Sender Mobile #"}
                        value={bkashNumber}
                        onChange={(e) => setBkashNumber(e.target.value)}
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="TrxID (যেমন: 9J38DXK)"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono uppercase"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Breakdown */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{lang === 'bn' ? 'পণ্যমূল্য সাবটোটাল:' : 'Items Subtotal:'}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {formatPrice(cartSubtotal, currency, lang)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {formatPrice(shippingCost, currency, lang)}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-black text-sm text-slate-900 dark:text-white">
                  <span>{lang === 'bn' ? 'সর্বমোট বিল:' : 'Grand Total:'}</span>
                  <span className="font-mono text-teal-700 dark:text-teal-400 text-base">
                    {formatPrice(grandTotal, currency, lang)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 active:scale-98 transition-all"
              >
                <span>{lang === 'bn' ? 'অর্ডারটি কনফার্ম করুন' : 'Confirm & Place Order'}</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmation Receipt Screen */
          <div className="text-center py-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-md">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
              {lang === 'bn' ? 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে!' : 'Order Placed Successfully!'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {lang === 'bn' ? 'আমাদের প্রতিনিধি শীঘ্রই ফোন করে অর্ডারটি কনফার্ম করবেন।' : 'Our support concierge will call you shortly to confirm dispatch.'}
            </p>

            {confirmedOrder && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400">{lang === 'bn' ? 'অর্ডার আইডি:' : 'Order ID:'}</span>
                  <span className="font-mono font-bold text-teal-700 dark:text-teal-400">{confirmedOrder.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{lang === 'bn' ? 'গ্রাহক:' : 'Customer:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{confirmedOrder.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{lang === 'bn' ? 'মোবাইল:' : 'Phone:'}</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{confirmedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{lang === 'bn' ? 'ডেলিভারি ঠিকানা:' : 'Address:'}</span>
                  <span className="text-slate-800 dark:text-slate-200 text-right truncate max-w-[200px]">{confirmedOrder.deliveryAddress}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-sm">
                  <span>{lang === 'bn' ? 'সর্বমোট পরিশোধযোগ্য:' : 'Total Payable:'}</span>
                  <span className="font-mono text-teal-700 dark:text-teal-400">{formatPrice(confirmedOrder.total, currency, lang)}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs shadow-md"
            >
              {lang === 'bn' ? 'হোমপেজে ফিরুন' : 'Back to Home'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
