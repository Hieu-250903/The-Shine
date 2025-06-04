import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../../../services/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const navigator = useNavigate();

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 4000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Vui lòng nhập email!");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ!");
      return;
    }

    setEmailError("");
    setLoading(true);

    try {
      await forgotPasswordApi({ email });
      setEmailSent(true);
      showNotification("success", "Email khôi phục mật khẩu đã được gửi!");
    } catch (err) {
      showNotification("error", "Gửi email thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setEmailSent(false);
    setEmail("");
    setEmailError("");
  };

  // Notification Component
  const Notification = () => {
    if (!notification.show) return null;

    const bgColor =
      notification.type === "success"
        ? "bg-green-50 border-green-200"
        : "bg-red-50 border-red-200";
    const textColor =
      notification.type === "success" ? "text-green-800" : "text-red-800";
    const iconColor =
      notification.type === "success" ? "text-green-400" : "text-red-400";

    return (
      <div
        className={`fixed top-4 right-4 z-50 max-w-sm w-full ${bgColor} border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {notification.type === "success" ? (
              <svg
                className={`w-5 h-5 ${iconColor}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className={`w-5 h-5 ${iconColor}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${textColor}`}>
              {notification.message}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Notification />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {!emailSent ? (
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    ></path>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Quên mật khẩu? 🔐
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Đừng lo lắng! Nhập email của bạn và chúng tôi sẽ gửi link để
                  đặt lại mật khẩu.
                </p>
              </div>

              {/* Back to Login Link */}
              <div className="mb-6">
                <button
                  onClick={() => navigator("/login")}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  Quay lại đăng nhập
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <p className="text-blue-700 font-medium text-sm">
                      Chúng tôi sẽ gửi link đặt lại mật khẩu đến email của bạn
                    </p>
                    <p className="text-blue-600 text-xs mt-1">
                      Vui lòng kiểm tra cả thư mục spam nếu không thấy email
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    Địa chỉ email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="example@email.com"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg focus:outline-none transition-all duration-200 ${
                        emailError
                          ? "border-red-300 focus:border-red-400 bg-red-50"
                          : "border-gray-200 focus:border-blue-400 bg-white"
                      }`}
                    />
                  </div>
                  {emailError && (
                    <p className="mt-2 text-red-600 text-sm font-medium flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl transform hover:scale-105"
                  } text-white`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Đang gửi email...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Gửi email khôi phục
                    </div>
                  )}
                </button>
              </form>

              {/* Additional Help */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Vẫn gặp vấn đề?{" "}
                  <button
                    onClick={() =>
                      showNotification(
                        "info",
                        "Vui lòng liên hệ bộ phận hỗ trợ"
                      )
                    }
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Liên hệ hỗ trợ
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="p-8 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg mb-8">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Email đã được gửi! 📧
              </h2>
              <p className="text-gray-600 mb-2 leading-relaxed">
                Chúng tôi đã gửi link đặt lại mật khẩu đến:
              </p>
              <p className="text-blue-600 font-semibold text-lg mb-6">
                {email}
              </p>

              {/* Instructions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Các bước tiếp theo:
                </h3>
                <ol className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    Kiểm tra hộp thư email của bạn
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    Nhấp vào link trong email (kiểm tra cả thư mục spam)
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    Tạo mật khẩu mới theo hướng dẫn
                  </li>
                </ol>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={handleTryAgain}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Gửi lại với email khác
                </button>

                <button
                  onClick={() => navigator("/login")}
                  className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  Quay về đăng nhập
                </button>
              </div>

              {/* Expiry Notice */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Link sẽ hết hạn sau 15 phút
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
