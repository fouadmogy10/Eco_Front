import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";
import { toast } from "react-toastify";

export const createenquiry = createAsyncThunk(
  "enquiry/create-enquiry",
  async (enquiryData, thunkAPI) => {
    try {
      return await enquiryService.createenquiry(enquiryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction("Reset_all");

const initialState = {
  enquiry: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(createenquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createenquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
        if (state.isSuccess) {
          toast.success("comment added successfully")
        }
      })
      .addCase(createenquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something went wrong")
        }
      })
      
      .addCase(resetState, () => initialState);
  },
});
export default enquirySlice.reducer;
