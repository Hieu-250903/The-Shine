import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotifyCpn from "../../../components/NotifyCpn/NotifyCpn";

const PaymentReturn = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const isCancel = type === "cancel";

  const config = {
    status: isCancel ? "error" : "success",
    title: isCancel ? "THANH TOÁN THẤT BẠI" : "THANH TOÁN THÀNH CÔNG",
    message: isCancel
      ? "Có lỗi xảy ra hoặc bạn đã hủy thanh toán. Vui lòng thử lại."
      : "Giờ đây bạn có thể đăng bài theo ý muốn",
    buttonText: "Trở về",
    buttonBgColor: isCancel ? "red" : "green",
    buttonTextColor: "white",
  };

  return (
    <NotifyCpn
      status={config.status}
      title={config.title}
      message={config.message}
      buttonText={config.buttonText}
      buttonBgColor={config.buttonBgColor}
      buttonTextColor={config.buttonTextColor}
      onButtonClick={() => navigate("/")}
    />
  );
};

export default PaymentReturn;
