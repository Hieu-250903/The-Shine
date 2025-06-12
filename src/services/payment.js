import instance from "../configs/instance";

const createPaymentApi = async (formData) => {
  return await instance.post("/payment/create", formData);
};
const getPaymentOrderCodeApi = async (orderCode) => {
  return await instance.get(`/payment/${orderCode}?orderCode=${orderCode}`);
};
const getPaymentApi = async () => {
  return await instance.get("/payment");
};
export { createPaymentApi, getPaymentApi, getPaymentOrderCodeApi };
