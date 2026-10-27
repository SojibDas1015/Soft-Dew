// Utility helpers for Soft-Dew Beauty & Salon Platform

export const formatPrice = (amount, currency = 'BDT') => {
  if (currency === 'BDT') {
    return `৳${Number(amount).toLocaleString('en-BD')}`;
  }
  return `$${(Number(amount) / 120).toFixed(2)}`;
};

export const calculateDiscount = (originalPrice, discountPrice) => {
  if (!discountPrice || discountPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
};

export const generateId = (prefix = 'SDW') => {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
};
