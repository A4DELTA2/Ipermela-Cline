# 🤖 AI Rules & Tech Stack - Ipermela Store

This document outlines the technical architecture and rules for AI assistants working on this codebase.

## 🛠 Tech Stack

- **Frontend Core:** Vanilla HTML5 and JavaScript (ES6+ Modules). **NO** React, Vue, or Angular.
- **Styling:** Tailwind CSS (v3.x) for layout and utilities, supplemented by `styles.css` for custom animations and CSS variables.
- **Backend/Database:** Supabase (PostgreSQL) for data persistence and Row Level Security (RLS).
- **Authentication:** Supabase Auth (Email/Password).
- **PDF Generation:** `jspdf` (v2.5.1) and `jspdf-autotable` (v3.8.2) loaded via CDN.
- **Architecture:** Modular ES6 JavaScript (`type="module"`), running directly in the browser without a JS bundler (Webpack/Vite are NOT used for JS, only Tailwind CLI is used for CSS).

## 📋 Development Rules

### 1. JavaScript & Logic
- **Modules only:** Keep logic separated into specific files within the `js/` directory (e.g., `products.js`, `cart.js`, `orders.js`).
- **No Frameworks:** Do not introduce React, jQuery, or other frameworks. Use standard DOM manipulation APIs (`document.getElementById`, `addEventListener`).
- **Global Scope:** Because modules have their own scope, functions needed by HTML `onclick` attributes must be explicitly exposed to `window` in `js/app.js` (e.g., `window.addToCart = ...`).
- **Async/Await:** Use modern async/await patterns for Supabase interactions.

### 2. Styling (Tailwind CSS)
- **Utility First:** Use Tailwind classes for 95% of styling directly in HTML.
- **Dark Mode:** Support Dark Mode using the `dark:` prefix in Tailwind classes. The system uses a `.dark` class on the `<body>` tag and CSS variables in `styles.css` for theme colors.
- **Custom CSS:** Only use `styles.css` for complex animations, scrollbars, or dynamic CSS variables. Do not write standard CSS classes if a Tailwind utility exists.

### 3. Database & Auth (Supabase)
- **Client:** Use the initialized Supabase client imported from `js/config.js`.
- **Security:** Do not bypass RLS (Row Level Security). Ensure database queries handle errors gracefully.
- **Role Management:** Respect user roles (`admin`, `operator`, `viewer`) managed in `js/auth.js`.

### 4. PDF Generation
- **Modular PDF:** Modifications to PDF layout must be done in `js/pdf/` modules (`layout.js`, `styles.js`, etc.).
- **Images:** Do not link local images in PDFs due to CORS issues; use Base64 strings or publicly accessible URLs.

### 5. Icons
- **SVG:** Use inline SVG icons (heroicons style) directly in the HTML. Do not install icon libraries like FontAwesome.