import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/product/productSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import categoryReducer from "../features/pcategory/pcategorySlice";
import brandReducer from "../features/brand/brandSlice";
import cartReducer from "../features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    enquiry: enquiryReducer,
    category: categoryReducer,
    brand: brandReducer,
    carts: cartReducer,
  },
});
