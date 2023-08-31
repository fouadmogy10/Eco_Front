import base_url from "../../utils/baseUrl";

const createenquiry = async (enquiry) => {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
  const response = await base_url.post(`enquiry/`, enquiry, config);

  return response.data;
};

const enquiryService = {
  createenquiry,
};

export default enquiryService;
