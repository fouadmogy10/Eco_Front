import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (data,thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addToWishlist = createAsyncThunk(
  "product/addToWishlist",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addReview = createAsyncThunk(
  "product/addReview",
  async (data, thunkAPI) => {
    try {
      return await productService.addReview(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  Sproduct: [],
  isError: false,
  isLoading: false,
  WLLoading: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Sproduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.WLLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.WLLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "product added to wishlist successfully";
        state.addToWishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.WLLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addReview.pending, (state) => {
        state.RatingLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.RatingLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess) {
          toast.success("rating added successfully");
        }
        state.message = "rating added successfully";
        state.Sproduct = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.RatingLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError) {
          toast.error(`${action.error.message}`);
        }
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
