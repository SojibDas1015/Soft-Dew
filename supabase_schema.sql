-- ============================================================================
-- SOFT DEW BANGLADESH — SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ============================================================================

-- 1. Create PRODUCTS Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_bn TEXT,
    brand TEXT NOT NULL DEFAULT 'Soft Dew BD',
    category TEXT NOT NULL DEFAULT 'hair-color',
    price NUMERIC NOT NULL,
    discount_price NUMERIC,
    stock INTEGER NOT NULL DEFAULT 10,
    sku TEXT,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 1,
    sold_percent INTEGER DEFAULT 5,
    badge TEXT,
    badge_en TEXT,
    trust_notes TEXT,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    specs JSONB DEFAULT '{}'::jsonb,
    variants JSONB DEFAULT '["Standard"]'::jsonb,
    description TEXT,
    description_en TEXT,
    how_to_use TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_flash_deal BOOLEAN DEFAULT FALSE,
    flash_end_hours INTEGER DEFAULT 12,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create ORDERS Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    division TEXT DEFAULT 'Dhaka',
    district TEXT DEFAULT 'Dhaka',
    delivery_address TEXT NOT NULL,
    delivery_option TEXT,
    payment_method TEXT NOT NULL DEFAULT 'Cash on Delivery',
    payment_details JSONB,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    shipping_fee NUMERIC NOT NULL DEFAULT 60,
    total NUMERIC NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Processing',
    courier TEXT,
    estimated_delivery TEXT,
    tracking_timeline JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create BOOKINGS / SALON SETUP INQUIRIES Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    service_name TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    date TEXT,
    branch TEXT,
    price NUMERIC DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Confirmed',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 5. Policies for Products (Everyone can view, anon/authenticated can modify)
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" 
    ON public.products FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow product inserts" ON public.products;
CREATE POLICY "Allow product inserts" 
    ON public.products FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow product updates" ON public.products;
CREATE POLICY "Allow product updates" 
    ON public.products FOR UPDATE 
    USING (true);

DROP POLICY IF EXISTS "Allow product deletions" ON public.products;
CREATE POLICY "Allow product deletions" 
    ON public.products FOR DELETE 
    USING (true);

-- 6. Policies for Orders (Public can place orders and view their order)
DROP POLICY IF EXISTS "Public can view orders" ON public.orders;
CREATE POLICY "Public can view orders" 
    ON public.orders FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Public can place orders" ON public.orders;
CREATE POLICY "Public can place orders" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow order updates" ON public.orders;
CREATE POLICY "Allow order updates" 
    ON public.orders FOR UPDATE 
    USING (true);

-- 7. Policies for Bookings
DROP POLICY IF EXISTS "Public can view bookings" ON public.bookings;
CREATE POLICY "Public can view bookings" 
    ON public.bookings FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;
CREATE POLICY "Public can create bookings" 
    ON public.bookings FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow booking updates" ON public.bookings;
CREATE POLICY "Allow booking updates" 
    ON public.bookings FOR UPDATE 
    USING (true);

-- 8. Seed Default Essential Products
INSERT INTO public.products (
    id, name, name_bn, brand, category, price, discount_price, stock, sku, rating, reviews_count, sold_percent, 
    badge, badge_en, trust_notes, image, gallery, variants, description, description_en, is_featured, is_flash_deal
) VALUES 
(
    'slx-001',
    'Soft Dew Apple Black Hair Color Cream 500ml + 500ml (Natural Black)',
    'সফট ডিউ অ্যাপল ব্ল্যাক হেয়ার কালার ক্রিম ৫০০মিলি + ৫০০মিলি (ন্যাচারাল ব্ল্যাক)',
    'Soft Dew BD',
    'hair-color',
    3000,
    1990,
    45,
    'SLX-COL-001',
    4.9,
    382,
    68,
    'ফ্ল্যাশ ডিল -৩৪%',
    'Flash Deal -34%',
    'অ্যামোনিয়া মুক্ত • দীর্ঘস্থায়ী প্রাকৃতিক কালো রং • ১০০% গ্রে কভারেজ',
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    '["500ml + 500ml Duo Pack", "1000ml + 1000ml Salon Bucket"]'::jsonb,
    'প্রফেশনাল সেলুন ও পার্লারে ব্যবহারের জন্য বিশেষায়িত অ্যাপল এক্সট্র্যাক্ট ব্ল্যাক হেয়ার কালার। চুলকে সিল্কি ও উজ্জ্বল রেখে কোনো প্রকার ত্বকের জ্বালাপোড়া ছাড়া নিখুঁত কালো রং প্রদান করে।',
    'Professional salon-grade Apple Extract Black Hair Color. Enriched with natural fruit essences.',
    true,
    true
),
(
    'slx-002',
    'BS Professional Hair Cutting Scissors 6.0 Inch (German 440C Stainless Steel)',
    'বিএস প্রফেশনাল হেয়ার কাটিং কাঁচি ৬.০ ইঞ্চি (জার্মান স্টেইনলেস স্টিল)',
    'BS Scissors VIP',
    'scissors-razors',
    600,
    429,
    58,
    'SLX-SCI-002',
    4.8,
    194,
    82,
    'সেরা বিক্রীত -২৯%',
    'Bestseller -29%',
    '১০০% খাঁটি স্টেইনলেস স্টিল • কনভেক্স এজ ব্লেড • আরামদায়ক গ্রিপ',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    '["Silver Mirror Finish", "Matte Gunmetal Grey"]'::jsonb,
    'সেলুন হেয়ারকাটের জন্য নির্ভুল ও ধারালো ব্লেড। দীর্ঘদিন ব্যবহারে ব্লেডের ধার অটুট থাকে।',
    'Precision engineered Japanese style salon cutting shears with razor-sharp edges.',
    true,
    false
),
(
    'slx-003',
    'Kemei KM-1986 All-Metal Cordless Hair Clipper Professional Gold Edition',
    'কেমেই কেএম-১৯৮৬ অল-মেটাল কর্ডলেস হেয়ার ক্লিপার গোল্ড এডিশন',
    'Kemei Pro Tools',
    'trimmers-clippers',
    3450,
    2890,
    24,
    'SLX-TRM-003',
    4.9,
    410,
    74,
    'টপ রেটেড -১৬%',
    'Top Rated -16%',
    '২৫০০ এমএএইচ লিথিয়াম ব্যাটারি • ৩০০ মিনিট রানটাইম • কার্বন স্টিল ব্লেড',
    'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    '["Royal Gold Edition", "Cyber Silver Edition"]'::jsonb,
    'হাই-স্পিড রোটারি মোটর ও এলইডি ব্যাটারি ডিসপ্লে সমৃদ্ধ প্রফেশনাল ফেডিং ও কাটিং ট্রিমার।',
    'Heavy-duty cordless barber clipper with high torque motor and digital battery display.',
    true,
    true
),
(
    'slx-004',
    'Salon Royal Hydraulic Reclining Barber Chair (Heavy-Duty Base)',
    'সেলুন রয়েল হাইড্রোলিক রিক্লাইনিং বারবার চেয়ার (হেভি-ডিউটি বেস)',
    'Royal Salon Furniture',
    'salon-furniture',
    28500,
    24800,
    8,
    'SLX-FURN-004',
    5.0,
    64,
    45,
    'এক্সক্লুসিভ ফার্নিচার',
    'Exclusive Furniture',
    '২০০ কেজি লোড ক্যাপাসিটি • প্রিমিয়াম লেদারেট সিট • ৩৬০ ডিগ্রি ঘূর্ণন',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    '["Classic Black & Chrome", "Cognac Brown Vintage"]'::jsonb,
    'সেলুন ও জেন্টস পার্লারের জন্য অত্যন্ত আরামদায়ক ও দীর্ঘস্থায়ী হাইড্রোলিক রিক্লাইনিং চেয়ার।',
    'Ergonomic heavy-duty barber chair with high density foam and chrome disc base.',
    true,
    false
)
ON CONFLICT (id) DO NOTHING;

-- Complete!

