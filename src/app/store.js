import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/product/productSlice";
import blogsReducer from "../features/blogs/blogSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import categoryReducer from "../features/pcategory/pcategorySlice";
import brandReducer from "../features/brand/brandSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    blogs: blogsReducer,
    enquiry: enquiryReducer,
    category: categoryReducer,
    brand: brandReducer,
  },
});
