import instance from "../configs/instance";

const applyApplicationApi = async (formData, jobId) => {
  return await instance.post(`/Applications/apply/${jobId}`, formData);
};
const applycationSeftApi = async () => {
  return await instance.get("/Applications/candidate/self");
};
const getAllApplycationApi = async () => {
  return await instance.get("/Applications/all");
};
const getApplicanCountJob = async (jobId) => {
  return await instance.get(`/Applications/applications/count/${jobId}`);
};
const getApplicanJob = async (jobId) => {
  return await instance.get(`/Applications/applications/${jobId}`);
};

export {
  applyApplicationApi,
  applycationSeftApi,
  getAllApplycationApi,
  getApplicanCountJob,
  getApplicanJob,
};
