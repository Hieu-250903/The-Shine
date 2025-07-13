import instance from "../configs/instance";

const registerRecruiterApi = async (formData) => {
  return await instance.post("/user/register-recruiter", formData);
};
const registerApi = async (formData) => {
  return await instance.post("/user/register", formData);
};
const loginApi = async (formData) => {
  return await instance.post("/user/login", formData);
};
const confirmEmailApi = async ({ userId, token }) => {
  return await instance.get(
    `/User/confirm-email?userId=${userId}&token=${token}`
  );
};
const resendEmailApi = async ({ email }) => {
  return await instance.post(`/user/resend-confirmation`, { email });
};
const forgotPasswordApi = async ({ email }) => {
  return await instance.post(`/user/forgot-password`, { email });
};
const resetPasswordApi = async ({ email, token, newPassword }) => {
  return await instance.post(`/user/reset-password`, {
    email,
    token,
    newPassword,
  });
};
const getUserInfoApi = async () => {
  try {
    const response = await instance.get("/api/User/user-info");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
export {
  registerApi,
  loginApi,
  confirmEmailApi,
  resendEmailApi,
  forgotPasswordApi,
  resetPasswordApi,
  registerRecruiterApi,
  getUserInfoApi,
};
