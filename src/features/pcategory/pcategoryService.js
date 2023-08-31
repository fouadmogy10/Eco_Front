
import base_url from "../../utils/baseUrl";
const getProductCategories = async () => {
  const response = await base_url.get(`category/`);
  return response.data;
};
const pCategoryService = {
  getProductCategories,

};

export default pCategoryService;
