import instance from "../configs/instance";

const getAllCategory = async () => {
  return await instance.get("/Category/GetAll");
};
export { getAllCategory };
