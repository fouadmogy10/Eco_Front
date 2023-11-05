import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";
import { toast } from "react-toastify";
const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: {
    loading: false,
    userInfo: getUserfromLocalStorage,
  },
  Wishlist: [],
  cart: [],
  myOrder: [],
  isError: false,
  isLoading: false,
  isLoadingWL: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/edit",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const addToWishlist = createAsyncThunk(
  "product/addToWishlist",
  async (prodId, thunkAPI) => {
    try {
      return await authService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOrder = createAsyncThunk("user/getOrder", async (thunkAPI) => {
  try {
    return await authService.getOrder();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const createOrder = createAsyncThunk(
  "user/createOrder",
  async (data, thunkAPI) => {
    try {
      return await authService.createOrder(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getWishlist = createAsyncThunk(
  "user/getWishList",
  async (thunkAPI) => {
    try {
      return await authService.getWishlist();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    await authService.logout();
  }
);

export const resetState = createAction("Reset_all");

export const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.user = {
        loading: false,
        userInfo: getUserfromLocalStorage,
      };
      state.Wishlist = [];
      state.myOrder = [];
      state.isError = false;
      state.isLoading = false;
      state.isLoadingWL = false;
      state.isSuccess = false;
      state.message = "";
      state.createdUser = null;
    },
  },
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.user.loading = false;
        state.isSuccess = true;
        state.user.userInfo = action.payload;
        if (state.isSuccess) {
          toast.success(" login  successfully");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        if (state.updatedUser) {
          let curentUser = JSON.parse(localStorage.getItem("user"));
          let newUser = {
            _id: curentUser._id,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            email: action.payload.email,
            mobile: action.payload.mobile,
            token: curentUser.token,
          };
          localStorage.setItem("user", JSON.stringify(newUser));
          state.user.userInfo = newUser;
          toast.success(" updated successfully");
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.message) {
          toast.error(`${state.message}`);
        }
        state.isLoading = false;
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdUser = "success";
        if (state.isSuccess) {
          toast.success("account created successfully");
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
        if (state.isError) {
          toast.error(`${state.message}`);
        }
      })

      .addCase(getWishlist.pending, (state) => {
        state.isLoadingWL = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isErrorWL = false;
        state.isLoadingWL = false;
        state.isSuccess = true;
        state.Wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isErrorWL = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoadingWL = false;
      })

      
      .addCase(addToWishlist.pending, (state) => {
        state.WLLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.WLLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "product added to wishlist successfully";
        state.Wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.WLLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.myOrder = action.payload;
        state.cart = [];
        state.message = "order submited successfully ";
        if (state.isSuccess) {
          toast.success("order submited successfully");
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error(`${state.message?.message}`);
        }
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = " success";
        state.myOrder = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
   
      .addCase(logout.fulfilled, (state, action) => {
        state.user.userInfo = null;
        state.user.loading = false;
        state.isSuccess = true;
        state.Wishlist = [];
        state.myOrder = [];
        if (state.isSuccess) {
          toast.success("good bye");
        }
      })

      .addCase(logout.pending, (state, action) => {
        state.user.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.user.userInfo = null;
      })
      .addCase(resetState, () => initialState);
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
