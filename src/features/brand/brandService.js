import base_url from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await base_url.get(`brand/`);
  return response.data;
};

const brandService = {
  getBrands,
};

export default brandService;
