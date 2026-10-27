import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Package, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    isFreeShipping,
    shippingFee,
    cartTotal,
    createOrder,
    currency
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [bkashNumber, setBkashNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      alert('Please fill out all required contact and shipping address fields.');
      return;
    }

    const orderData = {
      customerName,
      customerPhone,
      city,
      deliveryAddress: `${deliveryAddress}, ${city}`,
      paymentMethod,
      paymentDetails: paymentMethod === 'bKash' || paymentMethod === 'Nagad' ? { senderNumber: bkashNumber, trxId } : null,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee: isFreeShipping ? 0 : shippingFee,
      total: cartTotal
    };

    const newOrder = createOrder(orderData);
    setConfirmedOrder(newOrder);
    setOrderConfirmed(true);

    // Fire joyful celebratory confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if canvas not available
    }
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(false);
  };

  return (
    <div className="modal-backdrop" onClick={handleFinish}>
      <div 
        className="modal-container checkout-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleFinish} className="modal-close-btn" aria-label="Close checkout">
          <X size={20} />
        </button>

        {!orderConfirmed ? (
          <div>
            <div className="modal-header-compact">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={20} className="text-emerald" />
                <span className="text-xs uppercase tracking-wider font-bold text-emerald">
                  256-Bit SSL Encrypted Checkout
                </span>
              </div>
              <h2 className="modal-title">Complete Your Order</h2>
              <p className="text-xs text-slate-500">
                100% Genuine beauty guaranteed with tamper-evident batch sealing
              </p>
            </div>

            <div className="checkout-layout-grid">
              {/* Left Column: Form */}
              <form onSubmit={handlePlaceOrder} className="checkout-form-col">
                {/* 1. Customer Info */}
                <div className="checkout-section-block">
                  <h4 className="checkout-sec-title">
                    <User size={16} className="text-rose-600" />
                    <span>1. Recipient Information</span>
                  </h4>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Afia Tabassum"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="017XX-XXXXXX"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="checkout-section-block">
                  <h4 className="checkout-sec-title">
                    <MapPin size={16} className="text-rose-600" />
                    <span>2. Delivery Destination</span>
                  </h4>
                  <div className="form-group mb-3">
                    <label className="form-label">City / Division *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="form-select"
                    >
                      <option value="Dhaka">Dhaka (Same-Day / Next-Day Express)</option>
                      <option value="Chattogram">Chattogram</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barishal">Barishal</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Detailed Street Address / House / Flat *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. House 14, Road 7, Sector 3, Uttara, Dhaka"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="form-textarea"
                    />
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="checkout-section-block">
                  <h4 className="checkout-sec-title">
                    <CreditCard size={16} className="text-rose-600" />
                    <span>3. Payment Method</span>
                  </h4>
                  <div className="payment-options-list">
                    {[
                      { id: 'bKash', label: 'bKash Online / QR', desc: 'Fast mobile payment (Merchant: 01700-SOFTDEW)' },
                      { id: 'Nagad', label: 'Nagad Mobile Banking', desc: 'Secure Instant transfer' },
                      { id: 'Cash on Delivery', label: 'Cash on Delivery (COD)', desc: 'Pay with cash upon package inspection' },
                      { id: 'Card', label: 'Credit or Debit Card', desc: 'Visa, Mastercard, Amex accepted' }
                    ].map((pm) => (
                      <label 
                        key={pm.id} 
                        className={`payment-option-card ${paymentMethod === pm.id ? 'active' : ''}`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={pm.id}
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id)}
                          className="mr-2"
                        />
                        <div>
                          <strong className="block text-sm">{pm.label}</strong>
                          <span className="text-xs text-slate-500">{pm.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {(paymentMethod === 'bKash' || paymentMethod === 'Nagad') && (
                    <div className="bkash-instructions-box animate-fade-in">
                      <p className="text-xs mb-2">
                        Please send <strong>{formatPrice(cartTotal, currency)}</strong> to our official Merchant wallet: <code className="font-bold text-rose-600">01700-763833</code> and enter your TrxID below:
                      </p>
                      <div className="form-row-2">
                        <input
                          type="text"
                          placeholder="Sender Mobile No."
                          value={bkashNumber}
                          onChange={(e) => setBkashNumber(e.target.value)}
                          className="form-input text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Transaction ID (e.g. 9J28DA7)"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          className="form-input text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary btn-place-order w-full mt-4">
                  <span>Confirm Order ({formatPrice(cartTotal, currency)})</span>
                  <ArrowRight size={17} />
                </button>
              </form>

              {/* Right Column: Order Summary Side Box */}
              <div className="checkout-summary-col">
                <div className="checkout-summary-box">
                  <h4 className="summary-title">Order Review ({cart.length} items)</h4>

                  <div className="mini-items-list">
                    {cart.map((item) => (
                      <div key={item.cartItemId} className="mini-item">
                        <img src={item.image} alt={item.name} className="mini-item-img" />
                        <div className="mini-item-info">
                          <span className="mini-item-title">{item.name}</span>
                          <span className="mini-item-qty">Qty: {item.quantity} {item.variant && `(${item.variant})`}</span>
                        </div>
                        <span className="mini-item-price">
                          {formatPrice(item.effectivePrice * item.quantity, currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mini-summary-totals">
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartSubtotal, currency)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Express Shipping</span>
                      <span>{isFreeShipping ? 'FREE' : formatPrice(shippingFee, currency)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-slate-900 border-t pt-2 mt-2">
                      <span>Total Amount</span>
                      <span className="text-rose-600">{formatPrice(cartTotal, currency)}</span>
                    </div>
                  </div>

                  <div className="checkout-trust-badge">
                    <Truck size={14} className="text-rose-600" />
                    <span>Dispatched in temperature-controlled packaging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Order Confirmed Screen with Live Tracking Preview */
          <div className="order-confirmed-view animate-fade-in text-center py-6">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="text-emerald" />
            </div>

            <h2 className="text-2xl font-bold mt-3 mb-1">Thank You! Order Confirmed</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              Your luxury beauty parcel has been registered. We are preparing it with our signature Soft-Dew protective seal.
            </p>

            {/* Tracking Steps Visualizer */}
            <div className="tracking-timeline-box max-w-lg mx-auto mb-6 p-4">
              <div className="tracking-steps-grid">
                <div className="track-step active">
                  <div className="step-circle"><CheckCircle2 size={16} /></div>
                  <span className="step-label">Placed</span>
                </div>
                <div className="track-line active"></div>
                <div className="track-step">
                  <div className="step-circle"><Package size={16} /></div>
                  <span className="step-label">Quality Check</span>
                </div>
                <div className="track-line"></div>
                <div className="track-step">
                  <div className="step-circle"><Truck size={16} /></div>
                  <span className="step-label">Dispatch</span>
                </div>
                <div className="track-line"></div>
                <div className="track-step">
                  <div className="step-circle"><Sparkles size={16} /></div>
                  <span className="step-label">Delivered</span>
                </div>
              </div>
            </div>

            {/* Receipt Summary */}
            {confirmedOrder && (
              <div className="receipt-card glass-panel max-w-md mx-auto text-left p-4 mb-6">
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                  <div>
                    <span className="text-xs text-slate-400">Order Reference</span>
                    <h5 className="font-mono font-bold text-rose-600">{confirmedOrder.id}</h5>
                  </div>
                  <span className="status-pill status-pending">{confirmedOrder.status}</span>
                </div>
                <div className="text-xs space-y-1 text-slate-700">
                  <p><strong>Customer:</strong> {confirmedOrder.customerName} ({confirmedOrder.customerPhone})</p>
                  <p><strong>Shipping To:</strong> {confirmedOrder.deliveryAddress}</p>
                  <p><strong>Payment Method:</strong> {confirmedOrder.paymentMethod}</p>
                  <p><strong>Total Paid:</strong> {formatPrice(confirmedOrder.total, currency)}</p>
                </div>
              </div>
            )}

            <button onClick={handleFinish} className="btn btn-primary">
              Continue Shopping Soft-Dew
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
