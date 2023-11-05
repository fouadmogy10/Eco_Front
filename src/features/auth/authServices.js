import base_url from "../../utils/baseUrl";

const login = async (user) => {
  const response = await base_url.post(`user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};
const updateUser = async (user) => {
  const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
}
  const response = await base_url.put(`user/edit`, user,config);
  return response.data;
};

const register = async (userdata) => {
  const response = await base_url.post(`user/register`, userdata);
  return response.data;
};
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
const getWishlist = async () => {
  const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
}
  const response = await base_url.get(`user/wishlist`, config);
  return response.data;
};

const addToWishlist = async (prodId) => {
    const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
}
  const response = await base_url.put(`product/wishlist`,{prodId},config);
  return response.data;
};
const createOrder = async (data) => {
    const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
}
  const response = await base_url.post(`user/cart/create-order`,data,config);
  return response.data;
};
const getOrder = async () => {
    const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
}
  const response = await base_url.get(`user/get-orders`,config);
  return response.data;
};


const authService = {
  login,updateUser,
  register,
  logout,
  getWishlist
  ,addToWishlist,createOrder,getOrder
};

export default authService;
