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
  // Load products from localStorage or fallback
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('softdew_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Salon services
  const [services, setServices] = useState(SALON_SERVICES);

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('softdew_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('softdew_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('softdew_orders');
      if (saved) return JSON.parse(saved);
      // Demo initial orders for dashboard
      return [
        {
          id: 'ORD-8821',
          customerName: 'Tasnim Jahan',
          customerPhone: '01712-345678',
          deliveryAddress: 'House 42, Road 11, Banani, Dhaka',
          paymentMethod: 'bKash',
          status: 'Processing',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          items: [
            {
              id: 'sdw-001',
              name: 'Dewy Glow Glass Skin Peptide Serum',
              price: 1890,
              quantity: 2,
              variant: '30ml Deluxe Pipette',
              image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
            }
          ],
          subtotal: 3780,
          shippingFee: 0,
          total: 3780
        },
        {
          id: 'ORD-8820',
          customerName: 'Samira Chowdhury',
          customerPhone: '01890-112233',
          deliveryAddress: 'GEC Circle, Nasirabad, Chattogram',
          paymentMethod: 'Cash on Delivery',
          status: 'Delivered',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          items: [
            {
              id: 'sdw-002',
              name: 'Salon Intensive Keratin & Collagen Hair Botox Mask',
              price: 2590,
              quantity: 1,
              variant: '250g Jar',
              image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
            }
          ],
          subtotal: 2590,
          shippingFee: 120,
          total: 2710
        }
      ];
    } catch {
      return [];
    }
  });

  // Salon Bookings
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('softdew_bookings');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'BKG-101',
          serviceName: 'Dewy Signature Hydra-Facial Glow',
          clientName: 'Nusrat Fariha',
          clientPhone: '01923-456789',
          date: 'Tomorrow, 3:30 PM',
          branch: 'Gulshan Atelier & Spa Lounge',
          status: 'Confirmed',
          price: 2800
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
  const [currency, setCurrency] = useState('BDT');

  // Modals & Drawers
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('softdew_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('softdew_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('softdew_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('softdew_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('softdew_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Product Operations (Dashboard & Store)
  const addProduct = (newProduct) => {
    const productWithMeta = {
      ...newProduct,
      id: generateId('sdw'),
      sku: newProduct.sku || generateId('SKU'),
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: newProduct.isFeatured || false,
      isFlashDeal: newProduct.isFlashDeal || false,
      gallery: newProduct.gallery && newProduct.gallery.length > 0 ? newProduct.gallery : [newProduct.image],
      skinType: newProduct.skinType || ['All Skin Types'],
      variants: newProduct.variants && newProduct.variants.length > 0 ? newProduct.variants : ['Standard Volume']
    };
    setProducts((prev) => [productWithMeta, ...prev]);
    showToast(`"${productWithMeta.name}" added to Soft-Dew catalog!`, 'success');
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product details updated successfully!', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
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

    showToast(`Added ${quantity}x "${product.name}" to your bag`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from bag', 'info');
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

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your Wishlist ✨', 'success');
        return [...prev, productId];
      }
    });
  };

  // Order Operations
  const createOrder = (orderData) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order #${orderId} confirmed! Check tracking details.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order #${orderId} marked as ${newStatus}`, 'success');
  };

  // Salon Booking Operations
  const bookSalonService = (bookingData) => {
    const bookingId = `BKG-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking = {
      id: bookingId,
      ...bookingData,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setBookings((prev) => [newBooking, ...prev]);
    setIsBookingModalOpen(false);
    setSelectedServiceForBooking(null);
    showToast(`Salon appointment booked for ${bookingData.clientName}!`, 'success');
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    showToast(`Booking #${bookingId} status updated to ${newStatus}`, 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.effectivePrice || item.price) * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 2500;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : 120;
  const cartTotal = cartSubtotal + shippingFee;

  return (
    <StoreContext.Provider
      value={{
        // Data
        products,
        services,
        cart,
        wishlist,
        orders,
        bookings,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        activeView,
        setActiveView,
        dashboardTab,
        setDashboardTab,
        currency,
        setCurrency,

        // Modal states
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
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

        // Toast
        toast,
        showToast,

        // Product CRUD
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,

        // Cart Actions
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        freeShippingThreshold,
        isFreeShipping,
        shippingFee,
        cartTotal,

        // Wishlist
        toggleWishlist,

        // Orders & Bookings
        createOrder,
        updateOrderStatus,
        bookSalonService,
        updateBookingStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
