import instance from "../configs/instance";

const getAllJobsApi = async () => {
  return await instance.get("/Job"/GetAll);
};
const getJobByIdApi = async (id) => {
  return await instance.get(`/Job/${id}`);
};
const addJobApi = async (formData) => {
  return await instance.post("/Job", formData);
};
export { getAllJobsApi, getJobByIdApi, addJobApi };