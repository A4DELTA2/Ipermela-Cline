-- Fix RLS policies for custom_products table
-- Run this in your Supabase SQL Editor

-- First, check if the table exists, if not create it
CREATE TABLE IF NOT EXISTS custom_products (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT DEFAULT 'accessori',
    icon TEXT DEFAULT '🎁',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on the table
ALTER TABLE custom_products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to read custom_products" ON custom_products;
DROP POLICY IF EXISTS "Allow authenticated users to insert custom_products" ON custom_products;
DROP POLICY IF EXISTS "Allow authenticated users to update custom_products" ON custom_products;
DROP POLICY IF EXISTS "Allow authenticated users to delete custom_products" ON custom_products;

-- Policy 1: Allow all authenticated users to SELECT (read) custom products
CREATE POLICY "Allow authenticated users to read custom_products"
ON custom_products
FOR SELECT
TO authenticated
USING (true);

-- Policy 2: Allow all authenticated users to INSERT custom products
CREATE POLICY "Allow authenticated users to insert custom_products"
ON custom_products
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Allow all authenticated users to UPDATE custom products
CREATE POLICY "Allow authenticated users to update custom_products"
ON custom_products
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Allow all authenticated users to DELETE custom products
CREATE POLICY "Allow authenticated users to delete custom_products"
ON custom_products
FOR DELETE
TO authenticated
USING (true);

-- Grant permissions to authenticated users
GRANT ALL ON custom_products TO authenticated;

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'custom_products';
