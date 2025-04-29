import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

// 1. Reusable Loading Spinner Component
const LoadingSpinner = ({
  size = "default",
  color = "#1890ff",
  tip = "Đang tải...",
}) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: size === "large" ? 40 : size === "small" ? 18 : 24,
        color,
      }}
      spin
    />
  );

  return (
    <Spin
      indicator={antIcon}
      tip={tip}
      size={size}
      className="flex flex-col items-center"
    />
  );
};

// 2. Full Page Loading Component
const PageLoading = ({
  message = "Đang tải dữ liệu...",
  spinnerSize = "large",
  spinnerColor = "#ffffff",
  bgColor = "rgba(0, 0, 0, 0.7)",
}) => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor, zIndex: 9999 }}
    >
      <LoadingSpinner size={spinnerSize} color={spinnerColor} tip="" />
      <p className="mt-4 text-lg text-white">{message}</p>
    </div>
  );
};

export { LoadingSpinner, PageLoading };
