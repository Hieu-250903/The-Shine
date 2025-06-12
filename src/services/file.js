import instance from "../configs/instance";

const uploadFile = async (formData) => {
  return await instance.post("/file/upload", formData);
};
const downloadFile = async (id) => {
  return await instance.get(`/file/download/${id}`, {
    responseType: "blob",
  });
};
const getFile = async () => {
  return await instance.get("/file");
};
const getFileById = async (id) => {
  return await instance.get(`/file/${id}`);
};
const getFileUserInfo = async () => {
  return await instance.get(`/file/user-info`);
};
const addCVFile = async (cvId) => {
  return await instance.put(`/file/add-cv-file?cvId=${cvId}`);
};
const debugClaims = async () => {
  return await instance.get(`/file/debug-claims`);
};
export {
  uploadFile,
  downloadFile,
  getFile,
  getFileById,
  getFileUserInfo,
  addCVFile,
  debugClaims,
};
