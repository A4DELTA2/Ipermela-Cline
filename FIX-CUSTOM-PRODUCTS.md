# Fix Custom Products Permission Error (403 Forbidden)

## Problem
The custom accessory feature is not working because of a **403 Forbidden** error when trying to save to the database. This is due to missing Row Level Security (RLS) policies in Supabase.

## Solution

Follow these steps to fix the issue:

### Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Log in to your account
3. Select your project: **prldireomgijzfppeunp**

### Step 2: Open SQL Editor
1. In the left sidebar, click on **"SQL Editor"**
2. Click **"New query"**

### Step 3: Run the Fix
1. Open the file `fix-custom-products-rls.sql` (in this folder)
2. Copy ALL the SQL code from that file
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** (or press Ctrl+Enter)

### Step 4: Verify the Fix
After running the SQL:
1. You should see a success message
2. The last query will show you all the policies that were created
3. You should see 4 policies:
   - `Allow authenticated users to read custom_products`
   - `Allow authenticated users to insert custom_products`
   - `Allow authenticated users to update custom_products`
   - `Allow authenticated users to delete custom_products`

### Step 5: Test the Feature
1. Refresh your application in the browser
2. Log in
3. Scroll down to the "Accessorio Personalizzato" section
4. Fill in:
   - **Nome accessorio**: Test Product
   - **Icon**: Select any icon
   - **Prezzo**: 99.99
5. Click **"Aggiungi"**
6. You should see a success notification: "Prodotto aggiunto al catalogo! ✓"

## What This Fix Does

The SQL script:
1. ✅ Creates the `custom_products` table if it doesn't exist
2. ✅ Enables Row Level Security (RLS)
3. ✅ Creates policies that allow authenticated users to:
   - Read all custom products
   - Insert new custom products
   - Update existing custom products
   - Delete custom products
4. ✅ Grants proper permissions to authenticated users

## Troubleshooting

### If you still get a 403 error:
1. Make sure you're logged in (check the console for authentication errors)
2. Verify the policies were created by running this in SQL Editor:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'custom_products';
   ```
3. Check if RLS is enabled:
   ```sql
   SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'custom_products';
   ```
   Should show `rowsecurity = true`

### If the table doesn't exist at all:
The SQL script will create it automatically. Just make sure to run the entire script.

## Security Note
The current policies allow **all authenticated users** to perform all operations on custom products. If you need more restrictive permissions (e.g., only admins can add/edit/delete), let me know and I can create role-based policies.
