// Utility helpers for Salonix Pro / Soft-Dew Beauty & Salon Platform

export const toBengaliDigits = (num) => {
  if (num === null || num === undefined) return '';
  const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (w) => bengaliNumbers[+w]);
};

export const formatPrice = (amount, currency = 'BDT', lang = 'bn') => {
  const num = Math.round(Number(amount) || 0);
  if (currency === 'BDT') {
    const formatted = num.toLocaleString('en-US');
    return lang === 'bn' ? `৳ ${toBengaliDigits(formatted)}` : `৳ ${formatted}`;
  }
  const usd = (num / 122).toFixed(2);
  return `$${usd}`;
};

export const calculateDiscount = (originalPrice, discountPrice) => {
  if (!discountPrice || discountPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
};

export const generateId = (prefix = 'SLX') => {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const formatDate = (dateString, lang = 'bn') => {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};
