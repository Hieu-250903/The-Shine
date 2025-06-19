import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  CreditCardOutlined,
  BankOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { createPaymentApi } from "../../services/payment";

// Cập nhật thông tin gói từ ServicePackages
const packageData = {
  // Gói recruiter
  basic: {
    id: 1,
    name: "recruiter299",
    title: "GÓI CƠ BẢN",
    subtitle: "Dành cho doanh nghiệp nhỏ hoặc cá nhân tuyển dụng số lượng ít",
    color: "text-green-500",
    price: "299.000VND",
    numericPrice: 299000,
    buttonColor: "bg-green-500 hover:bg-green-600",
    borderColor: "border-green-500",
    duration: "30 NGÀY",
    category: "recruiter bundle",
    features: [
      "Lượt đăng tin: 20 tin tuyển dụng",
      "Thời gian hiển thị: 30 ngày/tin",
      "Thời gian hiển thị tin trên trang đầu",
      "Job được gắn tag Urgent Hiring, hỗ trợ AI-Matching",
      "Công cụ quản lý ứng viên",
    ],
    checks: [true, true, true, false, false],
  },
  normal: {
    id: 2,
    name: "recruiter599",
    title: "GÓI THƯỜNG",
    subtitle:
      "Dành cho doanh nghiệp đang mở rộng tuyển dụng, cần hiệu suất cao hơn",
    color: "text-blue-500",
    price: "599.000VND",
    numericPrice: 599000,
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    borderColor: "border-blue-500",
    duration: "30 NGÀY",
    category: "recruiter bundle",
    features: [
      "Lượt đăng tin: 30 tin tuyển dụng",
      "Thời gian hiển thị: 45 ngày/tin",
      "Không giới hạn số lượng tin đăng hiển thị cùng lúc",
      "Job được gắn tag Urgent Hiring, hỗ trợ AI-Matching",
      "Công cụ quản lý ứng viên",
    ],
    checks: [true, true, true, true, false],
  },
  advanced: {
    id: 3,
    name: "recruiter999",
    title: "GÓI NÂNG CAO",
    subtitle:
      "Dành cho doanh nghiệp lớn, tuyển dụng quy mô rộng cần sự toàn diện",
    color: "text-red-500",
    price: "999.000VND",
    numericPrice: 999000,
    buttonColor:
      "bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600",
    borderColor: "border-red-500",
    duration: "30 NGÀY",
    category: "recruiter bundle",
    features: [
      "Lượt đăng tin: 40 tin tuyển dụng",
      "Thời gian hiển thị: 60 ngày/tin",
      "Không giới hạn số lượng tin đăng hiển thị cùng lúc",
      "Job được gắn tag Urgent Hiring, hỗ trợ AI-Matching",
      "Công cụ quản lý ứng viên",
    ],
    checks: [true, true, true, true, true],
  },
  candidate: {
    id: 4,
    name: "candidate22",
    title: "GÓI ỨNG VIÊN",
    subtitle: "Dành cho ứng viên muốn tăng cơ hội việc làm và nổi bật hơn",
    color: "text-purple-500",
    price: "22.000VND",
    numericPrice: 22000,
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    borderColor: "border-purple-500",
    duration: "30 NGÀY",
    category: "candidate bundle",
    features: [
      "CV được hiển thị ưu tiên",
      "Gửi CV không giới hạn",
      "Thông báo việc làm phù hợp qua email",
      "Hỗ trợ AI-Matching với nhà tuyển dụng",
      "Badge 'Premium Candidate'",
    ],
    checks: [true, true, true, true, true],
  },
};

const PaymentPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState("basic");
  const [isPayment, setIsPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const data = packageData[selectedPackage];

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">
            Không tìm thấy gói phù hợp
          </h1>
          <button
            onClick={() => navigate("/packages")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Quay lại chọn gói
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await createPaymentApi({
        orderCode: Date.now(),
        amount: data.numericPrice,
        description: data.name,
        items: [
          {
            name: data.name,
            quantity: 1,
            price: data.numericPrice,
          },
        ],
        cancelUrl: `${window.location.origin}/payment-return/cancel`,
        returnUrl: `${window.location.origin}/payment-return/success`,
      });
      if (response) window.location.href = response.checkoutUrl;
    } catch (err) {
      console.error("Lỗi khi tạo đơn thanh toán:", err);
      alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const PaymentMethods = () => (
    <div className="space-y-4">
      <div className="bg-gray-700 border border-gray-600 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <BankOutlined className="text-blue-400 text-xl" />
          <span className="font-semibold">Chuyển khoản ngân hàng</span>
        </div>
        <p className="text-gray-300 text-sm">
          Vietcombank, Techcombank, BIDV, VPBank
        </p>
      </div>

      <div className="bg-gray-700 border border-gray-600 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <CreditCardOutlined className="text-green-400 text-xl" />
          <span className="font-semibold">Ví điện tử</span>
        </div>
        <p className="text-gray-300 text-sm">MoMo, ZaloPay, VNPay, PayOS</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      {!isPayment ? (
        <>
          {/* Header */}
          <div className="w-full max-w-6xl mb-8">
            <div
              className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer mb-6 transition-colors"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftOutlined />
              <span>QUAY LẠI</span>
            </div>

            <h1 className="text-4xl font-bold text-center mb-4">
              XÁC NHẬN MUA GÓI DỊCH VỤ
            </h1>

            {/* Package Selector */}
            <div className="flex justify-center gap-4 mb-8">
              {Object.entries(packageData).map(([key, pkg]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPackage(key)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedPackage === key
                      ? `bg-gradient-to-r ${pkg.buttonColor.replace(
                          "hover:",
                          ""
                        )} text-white`
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }`}
                >
                  {pkg.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Package Details */}
              <div
                className={`border-r-0 lg:border-r ${data.borderColor} lg:pr-8`}
              >
                <div className="mb-6">
                  <h2 className={`text-4xl font-bold mb-4 ${data.color}`}>
                    {data.title}
                  </h2>
                  <div className="text-gray-300 text-sm leading-relaxed mb-4">
                    {data.subtitle}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Thời hạn: {data.duration}</span>
                    <span>Mã: {data.name}</span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {data.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Tính năng bao gồm:
                  </h3>
                  <ul className="space-y-3">
                    {data.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1">
                          {data.checks[index] ? (
                            <CheckOutlined className="text-green-400" />
                          ) : (
                            <CloseOutlined className="text-red-400" />
                          )}
                        </span>
                        <span
                          className={`text-sm ${
                            data.checks[index]
                              ? "text-gray-100"
                              : "text-gray-400"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Payment Section */}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-center mb-6">
                  CHỌN PHƯƠNG THỨC THANH TOÁN
                </h3>

                <PaymentMethods />

                <div className="text-center mt-8">
                  <div className="mb-2 text-gray-400">Tổng thanh toán</div>
                  <div className={`text-3xl font-bold mb-6 ${data.color}`}>
                    {formatPrice(data.numericPrice)}
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className={`w-full ${data.buttonColor} text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3`}
                  >
                    {isLoading ? (
                      <>
                        <LoadingOutlined className="animate-spin" />
                        Đang xử lý thanh toán...
                      </>
                    ) : (
                      <>
                        <CreditCardOutlined />
                        THANH TOÁN NGAY
                      </>
                    )}
                  </button>

                  <p className="text-gray-400 text-xs mt-4">
                    Bằng việc thanh toán, bạn đồng ý với điều khoản dịch vụ của
                    chúng tôi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Success State */
        <div className="max-w-2xl w-full">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-center">
            <div className="mb-6">
              <CheckCircleOutlined className="text-6xl text-green-400 mb-4" />
              <h2 className="text-3xl font-bold text-green-400 mb-2">
                THANH TOÁN THÀNH CÔNG!
              </h2>
              <p className="text-gray-300 text-lg">
                Gói {data.title} đã được kích hoạt
              </p>
            </div>

            <div className="bg-gray-700 border border-gray-600 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-white mb-4">
                Thông tin giao dịch:
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Gói dịch vụ:</span>
                  <span className="text-white">{data.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mã gói:</span>
                  <span className="text-white font-mono">{data.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Số tiền:</span>
                  <span className="text-green-400 font-semibold">
                    {formatPrice(data.numericPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thời hạn:</span>
                  <span className="text-white">{data.duration}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">
                Giờ đây bạn có thể sử dụng đầy đủ tính năng của{" "}
                {data.title.toLowerCase()}
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Đi tới Dashboard
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPackage;
