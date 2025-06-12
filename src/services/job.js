import instance from "../configs/instance";

const createjobApi = async (formData) => {
  return await instance.post("/Job", formData);
};

const getAllJobApi = async () => {
  return await instance.get("/Job/getAll");
};
const getJobByIdApi = async (id) => {
  return await instance.get(`/Job/${id}`);
};
export { createjobApi, getAllJobApi, getJobByIdApi };
