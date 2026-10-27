# ✨ Soft-Dew | Luxury Salon & Beauty Ecosystem

**Soft-Dew (সফট ডিউ)** is a premier full-scale salon, spa & clinical beauty e-commerce platform. It combines professional salon parlor appointments, authentic direct-import cosmetics (Korean glass skin serums, hair botox, luxury makeup, salon pro tools), a high-trust customer storefront, and a complete Seller/Admin Management Dashboard.

---

## 🌟 Key Features

### 🛍️ Customer Storefront & Trust System
- **100% Genuine Authenticity Guarantees**: Batch hologram inspection indicators, dermatologist certifications, and money-back guarantees.
- **Hero Banner & Brand Manifesto**: Editorial luxury typography (`Playfair Display` + `Plus Jakarta Sans`), trust badges, and floating bestseller previews.
- **Dewy Flash Deals**: Limited-time offers featuring live countdown timers (Hours, Minutes, Seconds) and stock depletion progress bars.
- **Interactive Beauty & Skin Quiz**: 3-step diagnostic routine builder matching skin & hair concerns with a 1-click bundle discount.
- **Category Browsing & Filter System**: Dewy Skincare, Salon Hair Care, Luxury Makeup, Pro Salon Tools, Organic Spa & Hammam, and Nail Studio.
- **Rich Product Detail Inspection**: Multi-image preview, shade/volume variant selectors, clinical ingredients, and salon expert application tips.
- **Slide-out Shopping Bag**: Free shipping progress bar (threshold ৳2,500), voucher discount engine (code `SOFTDEW10` for 10% OFF).
- **Checkout & Confetti Celebration**: Multi-method payments (bKash, Nagad, Cash on Delivery, Cards), live order ID generator, and 4-step delivery tracker.
- **Salon & Parlor Appointments**: Schedule sessions (Hydra-Facial, Keratin Smoothing, Bridal Makeovers) with branch selection across Gulshan, Banani, Dhanmondi, and Chattogram.

### 📱 Extraordinary Mobile User Experience
- **Touch-First Ergonomic Layout**: Clean horizontal scrollable category pills and snappy touch interactions.
- **Mobile Bottom Navigation Dock**: Fast switching between Shop, Salon Services, Skin Quiz, Bag, and Dashboard.
- **Responsive Drawer Overlays**: Smooth slide-over drawers for Cart and Wishlist.

### 📊 Salon Owner & Seller Operations Dashboard
- **Executive Analytics**: Gross Sales, Total Orders, Active Catalog Items, Low Stock Warnings, and Salon Bookings.
- **Product Management**: Search, filter, inline stock stepper controls (+/-), edit details, and delete items.
- **Add Product Modal**: Complete form with 1-click preset beauty photo picker, SKU generator, category tagging, and authenticity badge assignment.
- **Order Management**: Real-time order tracker with status updates (`Pending` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`).
- **Salon Booking Manager**: Review and confirm parlor appointment reservations by branch and time slot.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build production bundle
npm run build
```

---

## 📂 File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx           # Header, live ticker, search, cart trigger
│   │   ├── MobileBottomNav.jsx  # Fixed bottom navigation dock for mobile
│   │   ├── TrustBanner.jsx      # 4 core trust and authenticity pillars
│   │   ├── Toast.jsx            # Dynamic alert notifications
│   │   └── Footer.jsx           # Salon branches, helpline, payment seals
│   ├── store/
│   │   ├── Storefront.jsx       # Main storefront composition
│   │   ├── HeroBanner.jsx       # Luxury editorial hero with trust cards
│   │   ├── CategoryScroller.jsx # Category pill selector
│   │   ├── FlashDeals.jsx       # Live countdown flash promotions
│   │   ├── ProductCard.jsx      # High-conversion product cards
│   │   ├── ProductDetailModal.jsx # Detailed view with ingredients & tips
│   │   ├── BeautyQuizModal.jsx  # 3-step diagnostic routine builder
│   │   ├── SalonServices.jsx    # Parlor treatments catalog
│   │   ├── BookingModal.jsx     # Appointment scheduling
│   │   ├── CartDrawer.jsx       # Slide-out bag with voucher calculator
│   │   ├── CheckoutModal.jsx    # bKash/Nagad/COD checkout with confetti
│   │   ├── WishlistDrawer.jsx   # Saved items drawer
│   │   └── ReviewsSection.jsx   # Doctor & customer reviews
│   └── dashboard/
│       ├── DashboardLayout.jsx  # Operations tabs and controls
│       ├── DashboardOverview.jsx# Metrics and revenue analytics
│       ├── ProductManagement.jsx# Product catalog with inline stock stepper
│       ├── AddProductModal.jsx  # Product creator with photo presets
│       ├── OrderManagement.jsx  # Customer order fulfillment & status
│       └── BookingManagement.jsx# Salon booking scheduler
├── context/
│   └── StoreContext.jsx         # Central state for Cart, Products, Orders, Bookings
├── data/
│   ├── categories.js            # Aisles and trust badges
│   ├── initialProducts.js       # Curated salon & cosmetic catalog
│   └── initialServices.js       # Salon parlor services list
├── utils/
│   └── formatters.js            # Currency (৳/$) & unique ID utilities
├── App.jsx                      # Main application shell
├── App.css                      # Comprehensive luxury styling
├── index.css                    # Design tokens and base styles
└── main.jsx                     # Vite mount point
```
