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
const getPaymentChartDataApi = async (chartData) => {
  return await instance.post("/Payment/paymentChartData", chartData);
};
export { createPaymentApi, getPaymentApi, getPaymentOrderCodeApi, getPaymentChartDataApi };
