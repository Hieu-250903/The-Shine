import instance from "../configs/instance";

const addRating = async (formData) => {
  return await instance.post(`/rating/add`, formData);
};
const getUserRating = async () => {
  return await instance.get("/Rating/user");
};
const userUpdateRating = async (formData) => {
  return await instance.put("/Rating/update", formData);
};
const userDeleteRating = async (ratingId) => {
  return await instance.delete(`/Rating/${ratingId}`);
};
const getAllRating = async () => {
  return await instance.get("/rating/all");
};
const checkRating1 = async () => {
  return await instance.get("/Rating/check-contributed-1");
};
const checkRating2 = async () => {
  return await instance.get("/Rating/check-contributed-1");
};
const getPieChart1 = async () => {
  return await instance.get("/Rating/pie-chart1");
};
const getPieChart2 = async () => {
  return await instance.get("/Rating/pie-chart2");
};

export {
  addRating,
  getUserRating,
  userUpdateRating,
  userDeleteRating,
  getAllRating,
  checkRating1,
  checkRating2,
  getPieChart1,
  getPieChart2,
};
