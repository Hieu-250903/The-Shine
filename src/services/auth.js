import instance from "../configs/instance";

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
export {
  registerApi,
  loginApi,
  confirmEmailApi,
  resendEmailApi,
  forgotPasswordApi,
  resetPasswordApi,
};
