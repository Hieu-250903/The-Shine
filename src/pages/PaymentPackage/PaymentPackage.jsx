import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import paymentBkgBg from "../../assets/iamges/paymentBkgBg.jpg";
import NotifyCpn from "../../components/NotifyCpn/NotifyCpn";
const packageData = {
  basic: {
    title: "GÓI CƠ BẢN",
    color: "text-green-500",
    price: "299.000VND",
    buttonColor: "bg-green-500",
    features: [
      "20 tin tuyển dụng",
      "30 ngày hiển thị",
      "Không giới hạn số lượng tin đăng hiện cùng lúc",
      "Tag Urgent Hiring, hỗ trợ AI-Matching",
      "Không có công cụ quản lý ứng viên",
    ],
    checks: [true, true, true, false, false],
  },
  nomal: {
    title: "GÓI THƯỜNG",
    color: "text-blue-500",
    price: "599.000VND",
    buttonColor: "bg-blue-500",
    features: [
      "30 tin tuyển dụng",
      "45 ngày hiển thị",
      "Không giới hạn số lượng tin đăng hiện cùng lúc",
      "Tag Urgent Hiring, hỗ trợ AI-Matching",
      "Không có công cụ quản lý ứng viên",
    ],
    checks: [true, true, true, true, false],
  },
  advanced: {
    title: "GÓI NÂNG CAO",
    color: "text-red-500",
    price: "999.000VND",
    buttonColor: "bg-orange-500",
    features: [
      "40 tin tuyển dụng",
      "60 ngày hiển thị",
      "Không giới hạn số lượng tin đăng hiện cùng lúc",
      "Tag Urgent Hiring, hỗ trợ AI-Matching",
      "Có công cụ quản lý ứng viên",
    ],
    checks: [true, true, true, true, true],
  },
};

const PaymentPackage = () => {
  const { type } = useParams();
  const navigator = useNavigate();
  const data = packageData[type];
  const [isPayment, setIspayment] = useState(false);
  if (!data) {
    return <div>Không tìm thấy gói phù hợp.</div>;
  }
  const handlePayment = () => {
    setIspayment(true);
  };
  return (
    <div
      className="text-white flex flex-col items-center py-10"
      style={{
        backgroundImage: `url(${paymentBkgBg})`,
        backgroundPosition: "center",
      }}
    >
      {!isPayment ? (
        <>
          <div
            className="text-sm cursor-pointer text-left mb-2 w-full pl-20"
            onClick={() => navigator(-1)}
          >
            &lt; QUAY LẠI
          </div>
          <h1 className="text-4xl font-bold mb-8">XÁC NHẬN MUA</h1>

          <div className="bg-opacity-20 bg-[rgba(0,0,0,.8)] text-white p-14 rounded-lg flex shadow-2xl">
            <div className="w-1/2 border-r border-gray-500 pr-6">
              <h2 className={`text-4xl font-bold mb-6 ${data.color}`}>
                {data.title}
              </h2>
              <div className="mb-6 text-xs tracking-widest">
                Dành cho doanh nghiệp nhỏ hoặc cá nhân <br /> tuyển dụng số
                lượng ít{" "}
              </div>
              <ul className="space-y-4">
                {data.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">
                      {data.checks[index] ? (
                        <span className="text-green-400">✔</span>
                      ) : (
                        <span className="text-red-500">✘</span>
                      )}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/2 pl-8 flex flex-col items-center justify-center">
              <h3 className="text-lg mb-4">CHỌN PHƯƠNG THỨC THANH TOÁN</h3>

              <div className="bg-gray-800 p-4 rounded-lg mb-8 w-full">
                <p className="text-center">[Ngân hàng và Ví điện tử]</p>
              </div>

              <div className="text-2xl font-bold mb-4">{data.price}</div>

              <button
                onClick={handlePayment}
                className={`${data.buttonColor} text-white font-bold py-3 px-10 rounded-full cursor-pointer`}
              >
                THANH TOÁN
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="z-10 w-4xl">
          <NotifyCpn
            status="success"
            title="THANH TOÁN THÀNH CÔNG"
            message="Giờ đây bạn có thể đăng bài theo ý muốn"
            buttonText="Trở về"
            buttonBgColor="white"
            buttonTextColor="black"
            onButtonClick={() => navigator("/")}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentPackage;
