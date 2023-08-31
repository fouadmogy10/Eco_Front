
import { config } from "../../utils/axiosconfig";
import base_url from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const response = await base_url.post(`upload/`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await base_url.delete(
    `upload/delete-img/${id}`,

    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
