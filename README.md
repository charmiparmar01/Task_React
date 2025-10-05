# Task React E-Shop

A simple e-commerce demo built with React, Redux Toolkit, RTK Query, Material UI, and Vite.

## Features
- Product listing with pagination
- Category filtering
- Add to cart, update quantity, remove items
- Checkout page (protected route)
- User authentication (login/logout)
- Persistent cart and auth state via localStorage
- Responsive Material UI design

### Installation
```sh
npm install
```

### Development
```sh
npm run dev
```

Open [http://localhost:5173] in your browser.

## Usage
- **Login:** Use demo credentials  
  Username: `emilys`  
  Password: `emilyspass`
- Browse products, filter by category, add to cart.
- Go to checkout (requires login) to update cart or place order.

## Project Structure
- `src/` — Main source code
  - `components/` — UI components (Navbar, ProductCard, etc.)
  - `features/` — Redux slices for auth and cart
  - `pages/` — Route pages (Home, Login, Checkout)
  - `services/` — API logic (RTK Query)
  - `app/` — Redux store and hooks
  - `types.ts` — TypeScript types

## API
Uses https://dummyjson.com/ for products and authentication.
