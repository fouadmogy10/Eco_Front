import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//add product to cart
const addOrderToCartaction = createAsyncThunk(
  "cart/add-to-cart",
  async (cartItem) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const exist = cartItems.some(
      (item) => item._id == cartItem?._id && item.color == cartItem?.color
    );
    if (exist) {
      const newCartItems = cartItems?.map((item) => {
        //get new price
        if (item._id == cartItem?._id && item.color == cartItem?.color) {
          item.qty += cartItem.qty;
          item.totalPrice = item.qty * cartItem.price;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      toast.success("quantity increased");
    } else {
      //push to storage
      cartItems.push(cartItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast.success("Product added to cart successfully");
    }
  }
);
//get product to cart
const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  async () => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    return cartItems;
  }
);

const decreament = createAsyncThunk(
  "cart/decreament-qty",
  async ({ id, color }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newCartItems = cartItems?.map((item) => {
      if (item?._id == id && item?.color == color) {
        item.qty -= 1;
        item.totalPrice = item?.price * item.qty;
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);
const increament = createAsyncThunk(
  "cart/increament-qty",
  async ({ id, color }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newCartItems = cartItems?.map((item) => {
      if (item?._id == id && item?.color == color) {
        item.qty += 1;
        item.totalPrice = item?.price * item.qty;
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);

//remove from cart
const removeOrderItemQty = createAsyncThunk(
  "cart/removeOrderItem",
  async ({ id, color }) => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const itemToRemove = storedCartItems.find(
      (item) => item._id === id && item.color === color
    );

    if (itemToRemove) {
      const newItems = storedCartItems.filter(
        (item) => item !== itemToRemove
      );
      localStorage.setItem("cartItems", JSON.stringify(newItems));
    }
  }
);
//remove from cart
const EmptyCart = createAsyncThunk("cart/removeOrderItem", async () => {
  window.localStorage.setItem("cartItems", []);
});
const cartService = {
  addOrderToCartaction,
  getCartItemsFromLocalStorageAction,
  removeOrderItemQty,
  EmptyCart,
  decreament,
  increament,
};
export default cartService;
