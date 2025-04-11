import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, size } = action.payload;
      const existingItem = state.items.find(
        item => item.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          size,
          quantity: 1,
          price: product.price
        });
      }

      state.total = state.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
    },
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        item => !(item.id === productId && item.size === size)
      );
      state.total = state.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
    },
    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const item = state.items.find(
        item => item.id === productId && item.size === size
      );
      if (item) {
        item.quantity = quantity;
      }
      state.total = state.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 