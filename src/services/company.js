import instance from "../configs/instance";

const getCompany = async () => {
  return await instance.get("/Company");
};
const createCompany = async (formData) => {
  return await instance.post("/company", formData);
};
export { getCompany, createCompany };
