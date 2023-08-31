import  base_url  from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogs = async () => {
  const response = await base_url.get(`blog/`);

  return response.data;
};


const getBlog = async (id) => {
  const response = await base_url.get(`blog/${id}`, config);

  return response.data;
};

const blogService = {
  getBlogs,
  getBlog,
};

export default blogService;
