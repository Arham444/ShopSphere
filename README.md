# Project 1: ShopSphere (FRONTEND)

A modern, responsive e-commerce web application built using **React**, **Redux Toolkit**, and **React Router**. ShopSphere provides users with a premium, seamless product catalog browsing, filtering, search, and ordering experience.

---

## Features

### 1. Interactive Catalog with Search & Filtering

- **Debounced Search**: Features a 300ms debounce input bar to optimize performance and prevent Redux dispatch loops while typing.
- **Category Filters**: Allows filtering products by Category.
- **Price Filters**: Allows filtering products by Price Range ($0 - $500).
- **Rating Filters**: Allows filtering products by Minimum Rating (0 - 5⭐).
- **Sort Options**: Sort items by Newest, Name, or Price (Low to High / High to Low).
- **Dynamic Categories**: Automatically extracts categories from the product list to populate filter selectors dynamically.

### 2. Wishlist & Reusable Hook Pattern

- Toggle products into a persistent wishlist directly from catalog cards or product detail pages.
- Includes a dynamic wishlist counter badge in the navigation bar.
- Implemented using a reusable custom hook (`useWishlist.js`) to eliminate code repetition between list and detail views.

### 3. Shopping Cart & Checkout

- **Stock Enforcement**: Prevents adding more items than available product stock.
- **Checkout Summary**: Renders an itemized breakdown of subtotals, tax (8% fixed-rate), and grand total.
- **Mock Order Confirmation**: Submitting an order clears the active cart and transitions to a receipt summary displaying a green confirmation checkmark and a unique Order ID.

### 4. Custom Product Management & Image Uploads

- **Add Product Form**: Accessible from the navbar; validates user inputs (Name, Price, Stock, Rating, and Description).
- **Cloudinary Widget Integration**: Integrates the client-side Cloudinary Upload Widget (unsigned preset) to upload images directly to Cloudinary and retrieve secure URLs.
- **Local State Persistence**: Newly added custom products are automatically stored in `localStorage` and merged into the active catalog on store startup.

---

## Directory Structure

```text
ShopSphere/
├── src/
│   ├── app/
│   │   └── store.js              # Redux Store configuration & hydration
│   ├── components/
│   │   ├── CartItem.jsx          # Shopping cart item card row
│   │   ├── Filters.jsx           # Catalog filtering controls
│   │   ├── Navbar.jsx            # App header with nav links and badges
│   │   ├── ProductCard.jsx       # Catalog product card grid item
│   │   └── SearchBar.jsx         # Debounced search bar input
│   ├── features/
│   │   ├── cart/                 # Cart slices, selectors, and state
│   │   ├── products/             # Product data seed list, slices, and selectors
│   │   └── wishlist/             # Wishlist slices, custom hooks, and selectors
│   ├── pages/
│   │   ├── AddProductPage.jsx    # Add Product form with Cloudinary upload
│   │   ├── CartPage.jsx          # Shopping Cart overview page
│   │   ├── CheckoutPage.jsx      # Checkout summary and confirmation
│   │   ├── NotFoundPage.jsx      # 404 fallback page
│   │   ├── ProductDetailPage.jsx # Individual product detail page
│   │   └── ProductListingPage.jsx# Home/Catalog page
│   ├── routes/
│   │   └── router.jsx            # React Router paths configuration
│   ├── utils/
│   │   └── localStorage.jsx      # LocalStorage load/save utility helpers
│   ├── App.jsx                   # Main layout container
│   ├── index.css                 # Core CSS typography & global stylesheet
│   └── main.jsx                  # React application entry point
├── .env                          # Local Environment configuration
├── index.html                    # Root index container (includes Cloudinary SDK script)
├── package.json                  # Dependencies configuration
└── vite.config.js                # Vite build and server settings
```

---

## Setup & Run Instructions

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+) and `npm` installed.

### 2. Configure Environment Variables

Create a `.env` file in the root directory (if not already present) with your Cloudinary details:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 3. Installation

Install the project dependencies:

```bash
npm install
```

### 4. Running Local Development Server

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Technical Design Details

### Redux Persistence & Hydration

The cart, wishlist, and custom added products are saved locally inside the browser's `localStorage` using serialized JSON. The Redux store listens to changes via `store.subscribe()` and hydrates the initial store values on mount, ensuring data is not lost on page reload.

### Security & Local Limitations

Since this is a client-side web application running purely in the browser sandbox, it lacks filesystem write access. Custom products created in the UI are persisted in `localStorage` under the key `"addedProducts"` and merged at runtime. In a production environment, this would connect to an Express/SQL server API database.
