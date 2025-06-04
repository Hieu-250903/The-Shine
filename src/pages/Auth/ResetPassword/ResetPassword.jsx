import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordApi } from "../../../services/auth";
import { message } from "antd";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
      .regex(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
      .regex(/\d/, "Mật khẩu phải có ít nhất 1 số")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const newPassword = watch("newPassword");
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");
    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await resetPasswordApi({
        email,
        token: encodeURIComponent(token),
        newPassword: data.newPassword,
      });
      setIsSuccess(true);
      message.success("Đặt lại mật khẩu thành công!");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      message.error("Đặt lại mật khẩu thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 2) return "bg-red-400";
    if (strength <= 3) return "bg-yellow-400";
    if (strength <= 4) return "bg-blue-400";
    return "bg-green-400";
  };

  const getStrengthText = (strength) => {
    if (strength <= 2) return "Yếu";
    if (strength <= 3) return "Trung bình";
    if (strength <= 4) return "Mạnh";
    return "Rất mạnh";
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircleOutlined className="text-4xl text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-green-200 rounded-full animate-ping opacity-30"></div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Đặt lại mật khẩu thành công! ✨
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Mật khẩu của bạn đã được cập nhật thành công.
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
              <LoadingOutlined className="mr-2" />
              Tự động chuyển hướng sau 3 giây
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg mb-6">
                <LockOutlined className="text-2xl text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Đặt lại mật khẩu
              </h1>
              <p className="text-gray-600">
                Nhập mật khẩu mới để hoàn tất quá trình đặt lại
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
              <div className="flex items-center">
                <MailOutlined className="text-lg text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">
                    Đặt lại mật khẩu cho:
                  </p>
                  <p className="text-blue-800 font-semibold">{email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockOutlined className="text-gray-400" />
                  </div>
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl text-lg focus:outline-none transition-all duration-200 ${
                          errors.newPassword
                            ? "border-red-300 focus:border-red-400 bg-red-50"
                            : "border-gray-200 focus:border-blue-400 bg-white"
                        }`}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeInvisibleOutlined className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeOutlined className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Độ mạnh mật khẩu:
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          getPasswordStrength(newPassword) <= 2
                            ? "text-red-600"
                            : getPasswordStrength(newPassword) <= 3
                            ? "text-yellow-600"
                            : getPasswordStrength(newPassword) <= 4
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {getStrengthText(getPasswordStrength(newPassword))}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                          getPasswordStrength(newPassword)
                        )}`}
                        style={{
                          width: `${
                            (getPasswordStrength(newPassword) / 5) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {errors.newPassword && (
                  <p className="mt-2 text-red-600 text-sm font-medium flex items-center">
                    <CloseCircleOutlined className="mr-1" />
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockOutlined className="text-gray-400" />
                  </div>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu mới"
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl text-lg focus:outline-none transition-all duration-200 ${
                          errors.confirmPassword
                            ? "border-red-300 focus:border-red-400 bg-red-50"
                            : "border-gray-200 focus:border-blue-400 bg-white"
                        }`}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeInvisibleOutlined className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeOutlined className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-red-600 text-sm font-medium flex items-center">
                    <CloseCircleOutlined className="mr-1" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Yêu cầu mật khẩu:
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    { test: newPassword.length >= 8, text: "Ít nhất 8 ký tự" },
                    {
                      test: /[A-Z]/.test(newPassword),
                      text: "Ít nhất 1 chữ hoa",
                    },
                    {
                      test: /[a-z]/.test(newPassword),
                      text: "Ít nhất 1 chữ thường",
                    },
                    { test: /\d/.test(newPassword), text: "Ít nhất 1 số" },
                    {
                      test: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
                      text: "Ít nhất 1 ký tự đặc biệt",
                    },
                  ].map((requirement, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        requirement.test ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          requirement.test ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      {requirement.text}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl transform hover:scale-105"
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingOutlined className="mr-2" />
                    Đang xử lý...
                  </div>
                ) : (
                  "Đặt lại mật khẩu"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
              >
                <ArrowLeftOutlined className="mr-2" />
                Quay về đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
