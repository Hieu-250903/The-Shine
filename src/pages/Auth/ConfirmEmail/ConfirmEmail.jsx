import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmEmailApi, resendEmailApi } from "../../../services/auth";
import { message } from "antd";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [showResendForm, setShowResendForm] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigator = useNavigate();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  useEffect(() => {
    const confirm = async () => {
      try {
        await confirmEmailApi({ userId, token: encodeURIComponent(token) });
        setStatus("success");
      } catch (err) {
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      confirm();
    } else {
      setStatus("error");
      setLoading(false);
    }
  }, [userId, token]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResendEmail = async (e) => {
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
    setResendLoading(true);

    try {
      await resendEmailApi({ email });
      setEmailSent(true);
      message.success("Email xác nhận đã được gửi! Kiểm tra hộp thư của bạn.");
      setEmail("");
    } catch (err) {
      message.error("error", "Gửi email thất bại. Vui lòng thử lại sau.");
    } finally {
      setResendLoading(false);
    }
  };

  const resetResendForm = () => {
    setShowResendForm(false);
    setEmailSent(false);
    setEmail("");
    setEmailError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-xl flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-blue-200 rounded-full animate-pulse opacity-50"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đang xác nhận email...
          </h2>
          <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    setTimeout(() => {
      navigator("/login");
    }, 3000);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
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
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-green-200 rounded-full animate-ping opacity-30"></div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Xác nhận thành công! ✨
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Cảm ơn bạn đã xác thực email.
              <br />
              Đang chuyển hướng đến trang đăng nhập...
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full animate-pulse transition-all duration-1000"
                style={{ width: "100%" }}
              ></div>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-2 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Tự động chuyển hướng sau 3 giây
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            {!showResendForm ? (
              <div className="p-8 text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
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
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Xác nhận thất bại 😞
                </h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Liên kết xác nhận không hợp lệ hoặc đã hết hạn.
                  <br />
                  Bạn có thể gửi lại email xác nhận mới.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => setShowResendForm(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                  >
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
                    Gửi lại email xác nhận
                  </button>

                  <button
                    onClick={() => navigator("/login")}
                    className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    Quay về đăng nhập
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8">
                {emailSent ? (
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg mb-8">
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
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Email đã được gửi! 📧
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Vui lòng kiểm tra hộp thư và thư mục spam của bạn.
                    </p>

                    <button
                      onClick={resetResendForm}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      Hoàn tất
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mb-8">
                      <button
                        onClick={resetResendForm}
                        className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <svg
                          className="w-6 h-6 text-gray-600"
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
                      </button>
                      <h2 className="text-2xl font-bold text-gray-800 flex-1">
                        Gửi lại email xác nhận
                      </h2>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3"
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
                        <p className="text-blue-700 font-medium">
                          Nhập email của bạn để nhận liên kết xác nhận mới
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleResendEmail} className="space-y-6">
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
                        disabled={resendLoading}
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 ${
                          resendLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl transform hover:scale-105"
                        } text-white`}
                      >
                        {resendLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Đang gửi...
                          </div>
                        ) : (
                          "Gửi email xác nhận"
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default ConfirmEmail;
