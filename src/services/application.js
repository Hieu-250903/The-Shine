import instance from "../configs/instance";

const applyApplicationApi = async (formData, jobId) => {
  return await instance.post(` /Applications/apply/${jobId}`, formData);
};
export { applyApplicationApi };
