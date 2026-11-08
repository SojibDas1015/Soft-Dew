import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables or custom local configuration
const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  let localUrl = '';
  let localKey = '';
  try {
    localUrl = localStorage.getItem('softdew_supabase_url') || '';
    localKey = localStorage.getItem('softdew_supabase_anon_key') || '';
  } catch {
    // Ignore storage errors
  }

  const url = (localUrl && localUrl.trim()) || (envUrl && envUrl.trim()) || '';
  const key = (localKey && localKey.trim()) || (envKey && envKey.trim()) || '';

  return { url, key };
};

let clientInstance = null;
let currentUrl = '';
let currentKey = '';

export const getSupabaseClient = () => {
  const { url, key } = getSupabaseConfig();

  // Validate format
  const isValidUrl = url && (url.startsWith('https://') || url.startsWith('http://'));
  const isValidKey = key && key.length > 20;

  if (!isValidUrl || !isValidKey) {
    return null;
  }

  // Re-use or re-instantiate if changed
  if (clientInstance && currentUrl === url && currentKey === key) {
    return clientInstance;
  }

  try {
    clientInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    currentUrl = url;
    currentKey = key;
    return clientInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

export const isSupabaseConfigured = () => {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && url.startsWith('http') && key && key.length > 20);
};

export const getSupabaseSettings = () => {
  return getSupabaseConfig();
};

export const saveSupabaseSettings = (url, key) => {
  try {
    if (url) localStorage.setItem('softdew_supabase_url', url.trim());
    else localStorage.removeItem('softdew_supabase_url');

    if (key) localStorage.setItem('softdew_supabase_anon_key', key.trim());
    else localStorage.removeItem('softdew_supabase_anon_key');

    // Reset instance to pick up new keys
    clientInstance = null;
    currentUrl = '';
    currentKey = '';
    return true;
  } catch {
    return false;
  }
};

// ==========================================
// TEST SUPABASE CONNECTION
// ==========================================
export const testSupabaseConnection = async () => {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Supabase URL অথবা Anon Key সঠিকভাবে কনফিগার করা হয়নি।'
    };
  }

  try {
    // Try pinging products table
    const { error } = await client.from('products').select('id').limit(1);
    if (error) {
      // If table doesn't exist or RLS issue
      return {
        success: false,
        message: `সংযোগ স্থাপন হয়েছে কিন্তু টেবিল ত্রুটি: ${error.message} (অনুগ্রহ করে supabase_schema.sql রান করুন)`
      };
    }
    return {
      success: true,
      message: 'সুপাবেস ডাটাবেজ সফলভাবে সংযুক্ত হয়েছে! (Connected to Supabase)'
    };
  } catch (err) {
    return {
      success: false,
      message: `সংযোগ ব্যর্থ হয়েছে: ${err.message || 'নেটওয়ার্ক সমস্যা'}`
    };
  }
};

// ==========================================
// DATA MAPPER HELPERS (CamelCase <-> SnakeCase)
// ==========================================
export const mapProductFromDb = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    name: item.name,
    nameBn: item.name_bn || item.name,
    brand: item.brand,
    category: item.category,
    price: Number(item.price) || 0,
    discountPrice: item.discount_price ? Number(item.discount_price) : null,
    stock: item.stock !== undefined ? Number(item.stock) : 0,
    sku: item.sku || `SKU-${item.id}`,
    rating: item.rating ? Number(item.rating) : 5.0,
    reviewsCount: item.reviews_count ? Number(item.reviews_count) : 0,
    soldPercent: item.sold_percent ? Number(item.sold_percent) : 0,
    badge: item.badge || '',
    badgeEn: item.badge_en || '',
    trustNotes: item.trust_notes || '',
    image: item.image || '',
    gallery: Array.isArray(item.gallery) ? item.gallery : (item.gallery ? [item.gallery] : [item.image]),
    specs: item.specs || {},
    variants: Array.isArray(item.variants) ? item.variants : (item.variants ? [item.variants] : ['Standard']),
    description: item.description || '',
    descriptionEn: item.description_en || '',
    howToUse: item.how_to_use || '',
    isFeatured: Boolean(item.is_featured),
    isFlashDeal: Boolean(item.is_flash_deal),
    flashEndHours: item.flash_end_hours || 12,
    createdAt: item.created_at
  };
};

export const mapProductToDb = (product) => {
  return {
    id: product.id,
    name: product.name,
    name_bn: product.nameBn || product.name,
    brand: product.brand || 'Soft Dew BD',
    category: product.category || 'all',
    price: Number(product.price) || 0,
    discount_price: product.discountPrice ? Number(product.discountPrice) : null,
    stock: product.stock !== undefined ? Number(product.stock) : 10,
    sku: product.sku || '',
    rating: product.rating ? Number(product.rating) : 5.0,
    reviews_count: product.reviewsCount ? Number(product.reviewsCount) : 1,
    sold_percent: product.soldPercent ? Number(product.soldPercent) : 5,
    badge: product.badge || '',
    badge_en: product.badgeEn || '',
    trust_notes: product.trustNotes || '',
    image: product.image || '',
    gallery: product.gallery && product.gallery.length > 0 ? product.gallery : [product.image],
    specs: product.specs || {},
    variants: product.variants && product.variants.length > 0 ? product.variants : ['Standard'],
    description: product.description || '',
    description_en: product.descriptionEn || '',
    how_to_use: product.howToUse || '',
    is_featured: Boolean(product.isFeatured),
    is_flash_deal: Boolean(product.isFlashDeal),
    flash_end_hours: product.flashEndHours || 12
  };
};

export const mapOrderFromDb = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    customerName: item.customer_name,
    customerPhone: item.customer_phone,
    division: item.division || '',
    district: item.district || '',
    deliveryAddress: item.delivery_address,
    deliveryOption: item.delivery_option,
    paymentMethod: item.payment_method,
    paymentDetails: item.payment_details || null,
    items: Array.isArray(item.items) ? item.items : [],
    subtotal: Number(item.subtotal) || 0,
    shippingFee: Number(item.shipping_fee) || 0,
    total: Number(item.total) || 0,
    status: item.status || 'Processing',
    courier: item.courier || '',
    estimatedDelivery: item.estimated_delivery || '',
    trackingTimeline: Array.isArray(item.tracking_timeline) ? item.tracking_timeline : [],
    createdAt: item.created_at
  };
};

export const mapOrderToDb = (order) => {
  return {
    id: order.id,
    customer_name: order.customerName,
    customer_phone: order.customerPhone,
    division: order.division || '',
    district: order.district || '',
    delivery_address: order.deliveryAddress,
    delivery_option: order.deliveryOption || '',
    payment_method: order.paymentMethod || 'Cash on Delivery',
    payment_details: order.paymentDetails || null,
    items: order.items || [],
    subtotal: Number(order.subtotal) || 0,
    shipping_fee: Number(order.shippingFee) || 0,
    total: Number(order.total) || 0,
    status: order.status || 'Processing',
    courier: order.courier || '',
    estimated_delivery: order.estimatedDelivery || '',
    tracking_timeline: order.trackingTimeline || []
  };
};

export const mapBookingFromDb = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    serviceName: item.service_name,
    clientName: item.client_name,
    clientPhone: item.client_phone,
    date: item.date,
    branch: item.branch,
    status: item.status || 'Confirmed',
    price: Number(item.price) || 0,
    notes: item.notes || '',
    createdAt: item.created_at
  };
};

export const mapBookingToDb = (booking) => {
  return {
    id: booking.id,
    service_name: booking.serviceName,
    client_name: booking.clientName,
    client_phone: booking.clientPhone,
    date: booking.date,
    branch: booking.branch,
    status: booking.status || 'Confirmed',
    price: Number(booking.price) || 0,
    notes: booking.notes || ''
  };
};

// ==========================================
// SUPABASE DATABASE OPERATIONS
// ==========================================

// 1. Fetch Products
export const dbFetchProducts = async () => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch products error:', error);
      return null;
    }
    return (data || []).map(mapProductFromDb);
  } catch (err) {
    console.warn('Supabase query failed:', err);
    return null;
  }
};

// 2. Add Product
export const dbInsertProduct = async (product) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const payload = mapProductToDb(product);
    const { error } = await client.from('products').insert([payload]);
    if (error) {
      console.error('Supabase product insert error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase product insert exception:', err);
    return false;
  }
};

// 3. Update Product
export const dbUpdateProduct = async (id, fields) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const dbPayload = {};
    if (fields.name !== undefined) dbPayload.name = fields.name;
    if (fields.nameBn !== undefined) dbPayload.name_bn = fields.nameBn;
    if (fields.brand !== undefined) dbPayload.brand = fields.brand;
    if (fields.category !== undefined) dbPayload.category = fields.category;
    if (fields.price !== undefined) dbPayload.price = Number(fields.price);
    if (fields.discountPrice !== undefined) dbPayload.discount_price = fields.discountPrice ? Number(fields.discountPrice) : null;
    if (fields.stock !== undefined) dbPayload.stock = Number(fields.stock);
    if (fields.sku !== undefined) dbPayload.sku = fields.sku;
    if (fields.image !== undefined) dbPayload.image = fields.image;
    if (fields.gallery !== undefined) dbPayload.gallery = fields.gallery;
    if (fields.variants !== undefined) dbPayload.variants = fields.variants;
    if (fields.description !== undefined) dbPayload.description = fields.description;
    if (fields.descriptionEn !== undefined) dbPayload.description_en = fields.descriptionEn;
    if (fields.isFeatured !== undefined) dbPayload.is_featured = Boolean(fields.isFeatured);
    if (fields.isFlashDeal !== undefined) dbPayload.is_flash_deal = Boolean(fields.isFlashDeal);

    const { error } = await client.from('products').update(dbPayload).eq('id', id);
    if (error) {
      console.error('Supabase product update error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase product update exception:', err);
    return false;
  }
};

// 4. Delete Product
export const dbDeleteProduct = async (id) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete product error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase delete product exception:', err);
    return false;
  }
};

// 5. Update Stock
export const dbUpdateStock = async (id, newStock) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('products').update({ stock: newStock }).eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

// 6. Fetch Orders
export const dbFetchOrders = async () => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch orders error:', error);
      return null;
    }
    return (data || []).map(mapOrderFromDb);
  } catch (err) {
    console.warn('Supabase fetch orders exception:', err);
    return null;
  }
};

// 7. Insert Order
export const dbInsertOrder = async (order) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const payload = mapOrderToDb(order);
    const { error } = await client.from('orders').insert([payload]);
    if (error) {
      console.error('Supabase insert order error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase insert order exception:', err);
    return false;
  }
};

// 8. Update Order Status
export const dbUpdateOrderStatus = async (orderId, newStatus, trackingTimeline) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('orders')
      .update({
        status: newStatus,
        tracking_timeline: trackingTimeline
      })
      .eq('id', orderId);

    return !error;
  } catch {
    return false;
  }
};

// 9. Fetch Bookings
export const dbFetchBookings = async () => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch bookings error:', error);
      return null;
    }
    return (data || []).map(mapBookingFromDb);
  } catch (err) {
    console.warn('Supabase fetch bookings exception:', err);
    return null;
  }
};

// 10. Insert Booking
export const dbInsertBooking = async (booking) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const payload = mapBookingToDb(booking);
    const { error } = await client.from('bookings').insert([payload]);
    return !error;
  } catch {
    return false;
  }
};

// 11. Update Booking Status
export const dbUpdateBookingStatus = async (bookingId, newStatus) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);

    return !error;
  } catch {
    return false;
  }
};

// 12. Batch Seed Initial Data to Supabase
export const dbSeedInitialData = async (initialProducts, initialOrders = [], initialBookings = []) => {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase client is not configured' };
  }

  try {
    let insertedProductsCount = 0;
    let insertedOrdersCount = 0;
    let insertedBookingsCount = 0;

    // Seed products
    if (initialProducts && initialProducts.length > 0) {
      const productPayloads = initialProducts.map(mapProductToDb);
      const { error: pError } = await client
        .from('products')
        .upsert(productPayloads, { onConflict: 'id' });

      if (pError) throw pError;
      insertedProductsCount = productPayloads.length;
    }

    // Seed orders
    if (initialOrders && initialOrders.length > 0) {
      const orderPayloads = initialOrders.map(mapOrderToDb);
      const { error: oError } = await client
        .from('orders')
        .upsert(orderPayloads, { onConflict: 'id' });

      if (!oError) insertedOrdersCount = orderPayloads.length;
    }

    // Seed bookings
    if (initialBookings && initialBookings.length > 0) {
      const bookingPayloads = initialBookings.map(mapBookingToDb);
      const { error: bError } = await client
        .from('bookings')
        .upsert(bookingPayloads, { onConflict: 'id' });

      if (!bError) insertedBookingsCount = bookingPayloads.length;
    }

    return {
      success: true,
      message: `সফলভাবে ${insertedProductsCount} টি পণ্য, ${insertedOrdersCount} টি অর্ডার এবং ${insertedBookingsCount} টি বুকিং ডাটাবেজে সংরক্ষিত হয়েছে!`
    };
  } catch (err) {
    return {
      success: false,
      message: `ডাটা সিঙ্ক ব্যর্থ হয়েছে: ${err.message}`
    };
  }
};
