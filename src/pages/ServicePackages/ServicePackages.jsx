import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backagesBg from "../../assets/iamges/backagesBg.jpg";
const ServicePackages = () => {
  const packages = [
    {
      id: 1,
      type: "basic",
      title: "GÓI CƠ BẢN",
      subtitle: "Dành cho doanh nghiệp nhỏ hoặc cá nhân tuyển dụng số lượng ít",
      originalPrice: "350.000VND",
      discountedPrice: "299.000VND",
      duration: "30 NGÀY",
      items: [
        { isAvailable: true, text: "Lượt đăng tin: 20 tin tuyển dụng" },
        { isAvailable: true, text: "Thời gian hiển thị: 30 ngày/tin" },
        { isAvailable: true, text: "Thời gian hiển thị tin trên trang đầu" },
        {
          isAvailable: false,
          text: "Job được gắn tag Urgent Hiring, hỗ trợ AI-Matching",
        },
        { isAvailable: false, text: "Không có công cụ quản lý ứng viên" },
      ],
      buttonText: "MUA NGAY",
      buttonClass: "bg-green-500 hover:bg-green-600 text-black",
      textColor: "green-500",
    },
    {
      id: 2,
      type: "nomal",
      title: "GÓI THƯỜNG",
      subtitle:
        "Dành cho doanh nghiệp đang mở rộng tuyển dụng, cần hiệu suất cao hơn",
      originalPrice: "750.000VND",
      discountedPrice: "599.000VND",
      duration: "30 NGÀY",
      items: [
        { isAvailable: true, text: "Lượt đăng tin: 30 tin tuyển dụng" },
        { isAvailable: true, text: "Thời gian hiển thị: 45 ngày/tin" },
        {
          isAvailable: true,
          text: "Không giới hạn số lượng tin đăng hiển thị cùng lúc",
        },
        {
          isAvailable: true,
          text: "Job được gắn tag Urgent Hiring, hỗ trợ AI-Matching",
        },
        { isAvailable: false, text: "Không có công cụ quản lý ứng viên" },
      ],
      buttonText: "MUA NGAY",
      buttonClass: "bg-blue-500 hover:bg-blue-600 text-white",
      textColor: "blue-500",
    },
    {
      id: 3,
      type: "advanced",
      title: "GÓI NÂNG CAO",
      subtitle:
        "Dành cho doanh nghiệp lớn, tuyển dụng quy mô rộng cần sự toàn diện",
      originalPrice: "1.250.000VND",
      discountedPrice: "999.000VND",
      duration: "30 NGÀY",
      items: [
        { isAvailable: true, text: "Lượt đăng tin: 40 tin tuyển dụng" },
        { isAvailable: true, text: "Thời gian hiển thị: 60 ngày/tin" },
        {
          isAvailable: true,
          text: "Không giới hạn số lượng tin đăng hiển thị cùng lúc",
        },
        {
          isAvailable: true,
          text: "Job được gắn tag Urgent Hiring, hỗ trợ AI-Matching",
        },
        { isAvailable: true, text: "Công cụ quản lý ứng viên" },
      ],
      buttonText: "MUA NGAY",
      buttonClass:
        "bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white",
      textColor: "red-500",
    },
  ];
  const navigator = useNavigate();
  const renderItem = (isAvailable, text) => (
    <li className="flex items-start gap-2">
      {isAvailable ? (
        <CheckOutlined className="!text-green-400 !mt-1" />
      ) : (
        <CloseOutlined className="!text-red-400 !mt-1" />
      )}
      <span>{text}</span>
    </li>
  );
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center pt-8 px-4"
      style={{
        backgroundImage: `url(${backagesBg})`,
      }}
    >
      <div className="text-center w-full text-white mb-12">
        <div
          className="text-sm cursor-pointer text-left mb-2"
          onClick={() => navigator(-1)}
        >
          &lt; QUAY LẠI
        </div>
        <h1 className="text-4xl font-extrabold leading-tight my-10">
          GÓI DỊCH VỤ TIÊU CHUẨN <br />
          DÀNH CHO NHÀ TUYỂN DỤNG
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-black bg-opacity-70 rounded-xl p-6 text-white flex flex-col items-center"
          >
            <h3 className={`text-${pkg.textColor} font-bold text-2xl mb-2`}>
              {pkg.title}
            </h3>
            <p className="text-center text-sm mb-4">{pkg.subtitle}</p>
            <div className="text-gray-400 line-through text-sm">
              {pkg.originalPrice}
            </div>
            <div className={`text-2xl font-bold text-${pkg.textColor} mt-1`}>
              {pkg.discountedPrice} / {pkg.duration}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-left w-full">
              {pkg.items.map((item, index) =>
                renderItem(item.isAvailable, item.text)
              )}
            </ul>
            <button
              onClick={() => navigator(`/payment-backage/${pkg.type}`)}
              className={`mt-6 ${pkg.buttonClass} text-black font-bold py-2 px-8 rounded-full cursor-pointer`}
            >
              {pkg.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePackages;
