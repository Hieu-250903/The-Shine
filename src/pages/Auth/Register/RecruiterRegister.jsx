import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import registerImageBg1 from "../../../assets/iamges/registerImageBg1.jpg";
import registerImageBg2 from "../../../assets/iamges/registerImageBg2.jpg";
import {
  GoogleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { registerRecruiterApi } from "../../../services/auth";
import { message } from "antd";

const registerSchema = z
  .object({
    fullName: z.string().min(1, "Vui lòng nhập họ và tên"),
    email: z.string().email("Vui lòng nhập email hợp lệ"),
    phoneNumber: z.string().min(1, "Vui lòng nhập số điện thoại"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
    companyType: z.string().min(1, "Vui lòng nhập loại hình công ty"),
    scale: z.string().min(1, "Vui lòng nhập quy mô công ty"),
    contactPhone: z.string().min(1, "Vui lòng nhập số điện thoại liên hệ"),
    agree: z.boolean().refine((val) => val, {
      message: "Bạn cần đồng ý với điều khoản dịch vụ",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

export default function RecruiterRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agree: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const apiData = {
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        password: data.password,
        companyType: data.companyType,
        scale: data.scale,
        contactPhone: data.contactPhone,
      };

      const res = await registerRecruiterApi(apiData);
      if (res) {
        if (
          res.messages &&
          res.messages.Message &&
          res.messages.Message.length > 0
        ) {
          message.success(res.messages.Message[0]);
        } else {
          message.success("Đăng ký nhà tuyển dụng thành công");
        }
        navigate("/login");
      } else {
        if (res && res.messages) {
          const errorMessages = [];
          Object.keys(res.messages).forEach((key) => {
            if (res.messages[key] && Array.isArray(res.messages[key])) {
              errorMessages.push(...res.messages[key]);
            }
          });

          if (errorMessages.length > 0) {
            message.error(errorMessages[0]);
          } else {
            message.error("Đăng ký thất bại. Vui lòng thử lại.");
          }
        } else {
          message.error("Đăng ký thất bại. Vui lòng thử lại.");
        }
      }
    } catch (error) {
      if (
        error?.response?.data?.messages?.Email?.includes(
          "Email is already registered."
        )
      ) {
        message.error("Email đã được đăng ký. Vui lòng sử dụng email khác.");
      } else {
        message.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="relative">
      <Link
        to="/admin/dashboard"
        className="text-sm text-gray-600 mb-4 inline-block hover:underline absolute top-4 left-6 z-10"
      >
        &larr; Quay lại
      </Link>
      <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundImage: `url(${registerImageBg2})`,
            backgroundPosition: "-150px 150%",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full -translate-x-1/2 translate-y-1/2"
          style={{
            backgroundImage: `url(${registerImageBg1})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-[#8B0000] uppercase mb-6">
            Đăng ký nhà tuyển dụng
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                {...register("fullName")}
                placeholder="Nhập họ & tên"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Nhập email"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                {...register("phoneNumber")}
                placeholder="Nhập số điện thoại"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                {...register("companyType")}
                placeholder="Nhập loại hình công ty"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.companyType && (
                <p className="text-red-500 text-xs">
                  {errors.companyType.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                {...register("scale")}
                placeholder="Nhập quy mô công ty"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.scale && (
                <p className="text-red-500 text-xs">{errors.scale.message}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                {...register("contactPhone")}
                placeholder="Nhập số điện thoại liên hệ"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.contactPhone && (
                <p className="text-red-500 text-xs">
                  {errors.contactPhone.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Nhập mật khẩu"
                className="w-full border-b py-2 pr-8 outline-none placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Xác nhận mật khẩu"
                className="w-full border-b py-2 pr-8 outline-none placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeInvisibleOutlined />
                ) : (
                  <EyeOutlined />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <Controller
                name="agree"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="mt-1"
                  />
                )}
              />
              <span className="text-xs text-gray-600">
                Tôi đồng ý với Điều khoản dịch vụ của THE SHINE
              </span>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-xs">{errors.agree.message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8B0000] to-[#D2691E] text-white py-2 rounded hover:opacity-90 cursor-pointer"
            >
              Tạo tài khoản nhà tuyển dụng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
