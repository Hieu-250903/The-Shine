import React, { useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  CreditCardOutlined,
  UserOutlined,
  BankOutlined,
  StarFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ServicePackages = () => {
  const [loadingPackage, setLoadingPackage] = useState(null);
  const navigate = useNavigate();
  const packages = [
    {
      id: 1,
      type: "basic",
      name: "recruiter299", // Mã chuẩn hóa
      title: "GÓI CƠ BẢN",
      subtitle: "Dành cho doanh nghiệp nhỏ hoặc cá nhân tuyển dụng số lượng ít",
      originalPrice: "350.000VND",
      discountedPrice: "299.000VND",
      numericPrice: 299000,
      duration: "30 NGÀY",
      category: "recruiter bundle",
      popular: false,
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
      buttonClass: "bg-green-500 hover:bg-green-600 text-white",
      borderClass: "border-green-500",
      textColor: "green-500",
    },
    {
      id: 2,
      type: "normal",
      name: "recruiter599", // Mã chuẩn hóa
      title: "GÓI THƯỜNG",
      subtitle:
        "Dành cho doanh nghiệp đang mở rộng tuyển dụng, cần hiệu suất cao hơn",
      originalPrice: "750.000VND",
      discountedPrice: "599.000VND",
      numericPrice: 599000,
      duration: "30 NGÀY",
      category: "recruiter bundle",
      popular: true,
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
      borderClass: "border-blue-500",
      textColor: "blue-500",
    },
    {
      id: 3,
      type: "advanced",
      name: "recruiter999", 
      title: "GÓI NÂNG CAO",
      subtitle:
        "Dành cho doanh nghiệp lớn, tuyển dụng quy mô rộng cần sự toàn diện",
      originalPrice: "1.250.000VND",
      discountedPrice: "999.000VND",
      numericPrice: 999000,
      duration: "30 NGÀY",
      category: "recruiter bundle",
      popular: false,
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
      borderClass: "border-red-500",
      textColor: "red-500",
    },
    {
      id: 4,
      type: "candidate",
      name: "candidate22",
      title: "GÓI ỨNG VIÊN",
      subtitle: "Dành cho ứng viên muốn tăng cơ hội việc làm và nổi bật hơn",
      originalPrice: "50.000VND",
      discountedPrice: "22.000VND",
      numericPrice: 22000,
      duration: "30 NGÀY",
      category: "candidate bundle",
      popular: false,
      items: [
        { isAvailable: true, text: "CV được hiển thị ưu tiên" },
        { isAvailable: true, text: "Gửi CV không giới hạn" },
        { isAvailable: true, text: "Thông báo việc làm phù hợp qua email" },
        { isAvailable: true, text: "Hỗ trợ AI-Matching với nhà tuyển dụng" },
        { isAvailable: true, text: "Badge 'Premium Candidate'" },
      ],
      buttonText: "MUA NGAY",
      buttonClass: "bg-purple-500 hover:bg-purple-600 text-white",
      borderClass: "border-purple-500",
      textColor: "purple-500",
    },
  ];

  const handlePurchase = async (pkg) => {
    setLoadingPackage(pkg.id);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate(`/payment-package/${pkg.name}`);
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoadingPackage(null);
    }
  };

  const renderItem = (isAvailable, text) => (
    <li className="flex items-start gap-3 py-1">
      {isAvailable ? (
        <CheckOutlined className="text-green-400 mt-1 flex-shrink-0" />
      ) : (
        <CloseOutlined className="text-red-400 mt-1 flex-shrink-0" />
      )}
      <span
        className={`text-sm ${isAvailable ? "text-gray-100" : "text-gray-400"}`}
      >
        {text}
      </span>
    </li>
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-8 px-4">
      {/* Header */}
      <div className="text-center w-full text-white mb-12">
        <div
          className="text-sm cursor-pointer text-left mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined />
          QUAY LẠI
        </div>
        <h1 className="text-4xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          GÓI DỊCH VỤ TIÊU CHUẨN
        </h1>
        <p className="text-xl text-gray-300">
          DÀNH CHO NHÀ TUYỂN DỤNG VÀ ỨNG VIÊN
        </p>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <BankOutlined className="text-blue-400" />
            <span className="text-gray-300">Thanh toán an toàn</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCardOutlined className="text-green-400" />
            <span className="text-gray-300">Hỗ trợ đa phương thức</span>
          </div>
          <div className="flex items-center gap-2">
            <UserOutlined className="text-purple-400" />
            <span className="text-gray-300">Hỗ trợ 24/7</span>
          </div>
        </div>
      </div>

      {/* Package Categories */}
      <div className="w-full max-w-7xl mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Recruiter Packages */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <BankOutlined className="text-2xl text-blue-400" />
              <h2 className="text-2xl font-bold text-white">
                Gói Nhà Tuyển Dụng
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages
                .filter((pkg) => pkg.category === "recruiter bundle")
                .map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-gray-800 border-2 ${
                      pkg.borderClass
                    } rounded-2xl p-6 text-white flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      pkg.popular ? "ring-2 ring-blue-400 ring-opacity-50" : ""
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <StarFilled className="text-yellow-400" />
                          PHỔ BIẾN NHẤT
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3
                        className={`text-${pkg.textColor} font-bold text-2xl mb-2`}
                      >
                        {pkg.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {pkg.subtitle}
                      </p>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-gray-400 line-through text-sm mb-1">
                        {pkg.originalPrice}
                      </div>
                      <div
                        className={`text-3xl font-bold text-${pkg.textColor} mb-1`}
                      >
                        {formatPrice(pkg.numericPrice)}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Gói {pkg.duration}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Mã: {pkg.name}
                      </div>
                    </div>

                    <div className="flex-1 mb-6">
                      <ul className="space-y-2">
                        {pkg.items.map((item, index) =>
                          renderItem(item.isAvailable, item.text)
                        )}
                      </ul>
                    </div>

                    <button
                      onClick={() => handlePurchase(pkg)}
                      disabled={loadingPackage === pkg.id}
                      className={`w-full ${pkg.buttonClass} font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                      {loadingPackage === pkg.id ? (
                        <>
                          <LoadingOutlined className="animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <CreditCardOutlined />
                          {pkg.buttonText}
                        </>
                      )}
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Candidate Package */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <UserOutlined className="text-2xl text-purple-400" />
              <h2 className="text-xl font-bold text-white">Gói Ứng Viên</h2>
            </div>
            {packages
              .filter((pkg) => pkg.category === "candidate bundle")
              .map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-gray-800 border-2 ${pkg.borderClass} rounded-2xl p-6 text-white flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                  <div className="text-center mb-6">
                    <h3
                      className={`text-${pkg.textColor} font-bold text-xl mb-2`}
                    >
                      {pkg.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-gray-400 line-through text-sm mb-1">
                      {pkg.originalPrice}
                    </div>
                    <div
                      className={`text-2xl font-bold text-${pkg.textColor} mb-1`}
                    >
                      {formatPrice(pkg.numericPrice)}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Gói {pkg.duration}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Mã: {pkg.name}
                    </div>
                  </div>

                  <div className="flex-1 mb-6">
                    <ul className="space-y-2">
                      {pkg.items.map((item, index) =>
                        renderItem(item.isAvailable, item.text)
                      )}
                    </ul>
                  </div>

                  <button
                    onClick={() => handlePurchase(pkg)}
                    disabled={loadingPackage === pkg.id}
                    className={`w-full ${pkg.buttonClass} font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {loadingPackage === pkg.id ? (
                      <>
                        <LoadingOutlined className="animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CreditCardOutlined />
                        {pkg.buttonText}
                      </>
                    )}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          Thông tin thanh toán và hỗ trợ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <CreditCardOutlined className="text-3xl text-green-400 mb-2" />
            <h4 className="font-semibold text-white mb-1">
              Thanh toán an toàn
            </h4>
            <p className="text-gray-400 text-sm">
              Hỗ trợ thẻ tín dụng, chuyển khoản, ví điện tử
            </p>
          </div>
          <div>
            <BankOutlined className="text-3xl text-blue-400 mb-2" />
            <h4 className="font-semibold text-white mb-1">Xử lý tức thì</h4>
            <p className="text-gray-400 text-sm">
              Gói dịch vụ được kích hoạt ngay sau thanh toán
            </p>
          </div>
          <div>
            <UserOutlined className="text-3xl text-purple-400 mb-2" />
            <h4 className="font-semibold text-white mb-1">Hỗ trợ 24/7</h4>
            <p className="text-gray-400 text-sm">
              Đội ngũ hỗ trợ sẵn sàng giải đáp mọi thắc mắc
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePackages;
