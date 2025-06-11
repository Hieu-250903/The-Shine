import instance from "../configs/instance";

const getAllCategoriesApi = async () => {
  return await instance.get("/Category/GetAll");
};
export { getAllCategoriesApi };