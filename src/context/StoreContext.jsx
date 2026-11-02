import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { SALON_SERVICES } from '../data/initialServices';
import { generateId } from '../utils/formatters';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  // 1. Language state: 'bn' (default, like SalonixBD) | 'en'
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('salonix_lang') || 'bn';
    } catch {
      return 'bn';
    }
  });

  // 2. Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('salonix_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem('salonix_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('salonix_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  const toggleLang = () => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // 3. Products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('salonix_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // 4. Salon Services & Booking
  const [services, setServices] = useState(SALON_SERVICES);

  // 5. Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('salonix_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('salonix_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 7. Product Comparison List (up to 4 items)
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // 8. Orders (with realistic Bangladeshi tracking timeline)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('salonix_orders');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'SLX-9042',
          customerName: 'MD. Rafiqul Islam (Gentlemen Salon)',
          customerPhone: '01711-234567',
          deliveryAddress: 'Shop #4, Metro Shopping Mall, Mirpur-10, Dhaka',
          paymentMethod: 'Cash on Delivery',
          status: 'In Transit',
          courier: 'Pathao Courier (Tracking: PTH-884920)',
          createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
          estimatedDelivery: 'Tomorrow, by 6:00 PM',
          items: [
            {
              id: 'slx-001',
              name: 'Soft Dew Apple Black Hair Color Cream 500ml + 500ml',
              price: 1990,
              quantity: 2,
              variant: '500ml + 500ml Duo Pack',
              image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80'
            },
            {
              id: 'slx-002',
              name: 'BS Professional Hair Cutting Scissors 6.0 Inch',
              price: 429,
              quantity: 1,
              variant: 'Silver Mirror Finish',
              image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80'
            }
          ],
          subtotal: 4409,
          shippingFee: 60,
          total: 4469,
          trackingTimeline: [
            { stage: 'Order Placed', time: 'Today 10:30 AM', done: true },
            { stage: 'Order Confirmed', time: 'Today 11:15 AM', done: true },
            { stage: 'Packed at Dhaka Hub', time: 'Today 02:45 PM', done: true },
            { stage: 'Handed to Pathao Rider', time: 'Today 05:20 PM', done: true },
            { stage: 'Out for Delivery', time: 'Tomorrow 10:00 AM', done: false },
            { stage: 'Delivered', time: 'Pending', done: false }
          ]
        },
        {
          id: 'SLX-9018',
          customerName: 'Tania Akter (Glow Beauty Lounge)',
          customerPhone: '01844-987654',
          deliveryAddress: 'Road 7, O.R Nizam Road, GEC Circle, Chattogram',
          paymentMethod: 'bKash Online',
          status: 'Delivered',
          courier: 'Steadfast Courier (Tracking: STF-119283)',
          createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
          estimatedDelivery: 'Delivered on Oct 31',
          items: [
            {
              id: 'slx-005',
              name: 'VGR V-453 Professional Salon Hair Dryer 2200W',
              price: 2350,
              quantity: 1,
              variant: 'Matte Black with Rose Gold',
              image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80'
            }
          ],
          subtotal: 2350,
          shippingFee: 120,
          total: 2470,
          trackingTimeline: [
            { stage: 'Order Placed', time: '2 days ago', done: true },
            { stage: 'Order Confirmed', time: '2 days ago', done: true },
            { stage: 'Packed at Hub', time: 'Yesterday 09:00 AM', done: true },
            { stage: 'Handed to Courier', time: 'Yesterday 02:00 PM', done: true },
            { stage: 'Out for Delivery', time: 'Yesterday 06:00 PM', done: true },
            { stage: 'Delivered', time: 'Yesterday 07:30 PM', done: true }
          ]
        }
      ];
    } catch {
      return [];
    }
  });

  // 9. Bookings & Inquiries
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('salonix_bookings');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'INQ-501',
          serviceName: 'Full Barber Shop 3-Chair Setup & Hydraulic Equipment Package',
          clientName: 'Kamrul Hasan',
          clientPhone: '01912-334455',
          date: 'Nov 05, 2026',
          branch: 'Dhaka Central Showroom',
          status: 'Confirmed',
          price: 95000,
          notes: 'Client opening new salon in Dhanmondi. Requires 3 hydraulic chairs, 2 clippers, 3 scissors, mirrors.'
        }
      ];
    } catch {
      return [];
    }
  });

  // UI state
  const [activeView, setActiveView] = useState('store'); // 'store' | 'dashboard' | 'services'
  const [dashboardTab, setDashboardTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'bookings'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [currency, setCurrency] = useState('BDT');

  // Modals & Drawers
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCategoryRailOpen, setIsCategoryRailOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('salonix_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('salonix_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('salonix_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('salonix_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('salonix_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Product Operations (Dashboard & Store)
  const addProduct = (newProduct) => {
    const productWithMeta = {
      ...newProduct,
      id: generateId('slx').toLowerCase(),
      sku: newProduct.sku || generateId('SKU'),
      rating: 5.0,
      reviewsCount: 1,
      soldPercent: 5,
      isFeatured: newProduct.isFeatured || false,
      isFlashDeal: newProduct.isFlashDeal || false,
      gallery: newProduct.gallery && newProduct.gallery.length > 0 ? newProduct.gallery : [newProduct.image],
      variants: newProduct.variants && newProduct.variants.length > 0 ? newProduct.variants : ['Standard']
    };
    setProducts((prev) => [productWithMeta, ...prev]);
    showToast(
      lang === 'bn' 
        ? `"${productWithMeta.nameBn || productWithMeta.name}" পণ্যটি সফলভাবে ক্যাটালগে যুক্ত হয়েছে!` 
        : `"${productWithMeta.name}" added to catalog!`, 
      'success'
    );
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast(
      lang === 'bn' ? 'পণ্যটির তথ্য সফলভাবে আপডেট হয়েছে!' : 'Product updated successfully!',
      'success'
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(
      lang === 'bn' ? 'পণ্যটি ক্যাটালগ থেকে মুছে ফেলা হয়েছে' : 'Product removed from catalog',
      'info'
    );
  };

  const updateStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStock = Math.max(0, (p.stock || 0) + delta);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, variant = null) => {
    const chosenVariant = variant || (product.variants && product.variants[0]) || 'Standard';
    const effectivePrice = product.discountPrice || product.price;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variant === chosenVariant
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          cartItemId: `${product.id}-${chosenVariant}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          nameBn: product.nameBn || product.name,
          brand: product.brand,
          price: product.price,
          discountPrice: product.discountPrice,
          effectivePrice: effectivePrice,
          image: product.image,
          quantity: quantity,
          variant: chosenVariant
        }
      ];
    });

    showToast(
      lang === 'bn' 
        ? `${product.nameBn || product.name} কার্টে যোগ করা হয়েছে` 
        : `${product.name} added to cart`,
      'success'
    );
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast(lang === 'bn' ? 'আইটেমটি কার্ট থেকে সরানো হয়েছে' : 'Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  // Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(
          lang === 'bn' ? 'উইশলিস্ট থেকে সরানো হয়েছে' : 'Removed from wishlist',
          'info'
        );
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(
          lang === 'bn' ? 'উইশলিস্টে সংরক্ষণ করা হয়েছে' : 'Added to wishlist',
          'success'
        );
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.some((p) => p.id === productId);

  // Compare List
  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(lang === 'bn' ? 'কম্পেয়ার তালিকা থেকে সরানো হয়েছে' : 'Removed from compare list', 'info');
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast(lang === 'bn' ? 'সর্বোচ্চ ৪টি পণ্য তুলনা করা যাবে' : 'Maximum 4 products can be compared', 'warning');
        return prev;
      }
      showToast(lang === 'bn' ? 'তুলনা করার তালিকায় যোগ করা হয়েছে' : 'Added to compare matrix', 'success');
      return [...prev, product];
    });
  };

  const isInCompare = (productId) => compareList.some((p) => p.id === productId);

  // Orders
  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: generateId('SLX'),
      createdAt: new Date().toISOString(),
      status: 'Processing',
      courier: orderData.district === 'Dhaka' ? 'Pathao Express' : 'Steadfast Courier BD',
      estimatedDelivery: orderData.district === 'Dhaka' ? 'Within 24 Hours' : '2-3 Business Days',
      trackingTimeline: [
        { stage: 'Order Placed', time: 'Just Now', done: true },
        { stage: 'Order Confirmed', time: 'Under Verification', done: false },
        { stage: 'Packed at Dhaka Hub', time: 'Pending', done: false },
        { stage: 'Handed to Courier Rider', time: 'Pending', done: false },
        { stage: 'Out for Delivery', time: 'Pending', done: false },
        { stage: 'Delivered', time: 'Pending', done: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedTimeline = (o.trackingTimeline || []).map((step, idx) => {
            if (newStatus === 'Delivered') return { ...step, done: true };
            if (newStatus === 'In Transit' && idx <= 3) return { ...step, done: true };
            if (newStatus === 'Processing' && idx <= 1) return { ...step, done: true };
            return step;
          });
          return { ...o, status: newStatus, trackingTimeline: updatedTimeline };
        }
        return o;
      })
    );
    showToast(
      lang === 'bn' ? `অর্ডার স্ট্যাটাস পরিবর্তিত হয়েছে: ${newStatus}` : `Order status updated to: ${newStatus}`,
      'success'
    );
  };

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.effectivePrice * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        // Lang & Theme
        lang,
        setLang,
        toggleLang,
        theme,
        setTheme,
        toggleTheme,

        // Data
        products,
        setProducts,
        services,
        cart,
        wishlist,
        orders,
        bookings,
        compareList,
        setCompareList,

        // Cart
        cartCount,
        cartSubtotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,

        // Wishlist & Compare
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        isCompareOpen,
        setIsCompareOpen,

        // UI View & Navigation
        activeView,
        setActiveView,
        dashboardTab,
        setDashboardTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        currency,
        setCurrency,

        // Drawers & Modals
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCategoryRailOpen,
        setIsCategoryRailOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        isQuizOpen,
        setIsQuizOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        isAddProductModalOpen,
        setIsAddProductModalOpen,
        editingProduct,
        setEditingProduct,

        // Operations
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        placeOrder,
        updateOrderStatus,

        // Notifications
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
