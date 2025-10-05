import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

type CartItem = { product: Product; qty: number };

interface CartState {
  items: CartItem[];
}

const load = (): CartItem[] => {
  try {
    const raw = localStorage.getItem('cart');
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const save = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch {}
};

const initialState: CartState = { items: load() };

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const found = state.items.find((i) => i.product.id === action.payload.id);
      if (found) found.qty += 1;
      else state.items.push({ product: action.payload, qty: 1 });
      save(state.items);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
      save(state.items);
    },
    updateQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      const it = state.items.find((i) => i.product.id === action.payload.id);
      if (it) it.qty = action.payload.qty;
      state.items = state.items.filter((i) => i.qty > 0);
      save(state.items);
    },
    clearCart(state) {
      state.items = [];
      save(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = slice.actions;
export default slice.reducer;
