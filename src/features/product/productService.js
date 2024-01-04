import base_url from "../../utils/baseUrl";
const getProducts = async (data) => {
  // minP, maxP, Sort, Cat, brand, Tag
  const response = await base_url.get(`product?${data?.Brand?`brand=${data?.Brand}&`:""}${data?.Tag?`tags=${data?.Tag}&`:""}${data?.Cat?`category=${data?.Cat}&`:""}${data?.minP?`price[gte]=${data?.minP}&`:""}${data?.maxP?`price[lte]=${data?.maxP}&`:""}${data?.Sort?`sort=${data?.Sort}&`:""}`);
  return response.data;
};


const getSingleProduct = async (id) => {
  const response = await base_url.get(`product/${id}`);
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
const addReview = async (data) => {
    const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
}
  const response = await base_url.put(`product/rating`,data,config);
  return response.data;
};

const productService = {
  getProducts,getSingleProduct,addToWishlist,addReview
};

export default productService;
