import { createSlice } from "@reduxjs/toolkit";
import cartService from "./cartService";
//initalsState
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    //add to cart
    builder.addCase(cartService.addOrderToCartaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      cartService.addOrderToCartaction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.isAdded = true;
      }
    );
    builder.addCase(
      cartService.addOrderToCartaction.rejected,
      (state, action) => {
        state.loading = false;
        state.cartItems = null;
        state.isAdded = false;
        state.error = action.payload;
      }
    );
    //fetch cart items
    builder.addCase(
      cartService.getCartItemsFromLocalStorageAction.pending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addCase(
      cartService.getCartItemsFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.isAdded = true;
      }
    );
    builder.addCase(
      cartService.getCartItemsFromLocalStorageAction.rejected,
      (state, action) => {
        state.loading = false;
        state.cartItems = null;
        state.isAdded = false;
        state.error = action.payload;
      }
    );
    //empty cart items
    builder.addCase(
      cartService.EmptyCart.pending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addCase(
      cartService.EmptyCart.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = [];
        state.isAdded = true;
      }
    );
    builder.addCase(
      cartService.EmptyCart.rejected,
      (state, action) => {
        state.loading = false;
        state.cartItems = null;
        state.isAdded = false;
        state.error = action.payload;
      }
    );
  },
});

//generate the reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;
