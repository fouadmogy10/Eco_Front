
import base_url from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getcartItem = async () => {
  const response = await base_url.get(`cart/`,config);

  return response.data;
};
const AddToCart = async (data) => {
  const response = await base_url.post(`cart/`, data, config);
  return response.data;
};


const cartService = {
  AddToCart,
};

export default cartService;
