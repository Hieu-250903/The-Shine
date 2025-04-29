import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import registerImageBg1 from "../../../assets/iamges/registerImageBg1.jpg";
import registerImageBg2 from "../../../assets/iamges/registerImageBg2.jpg";
import { GoogleOutlined } from "@ant-design/icons";
const registerSchema = z
  .object({
    fullName: z.string().min(1, "Vui lòng nhập họ và tên"),
    phoneOrEmail: z.string().min(1, "Vui lòng nhập số điện thoại hoặc email"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
    agree: z.boolean().refine((val) => val, {
      message: "Bạn cần đồng ý với điều khoản dịch vụ",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

export default function Register() {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("Dữ liệu đăng ký:", data);
    navigator("/login");
  };

  return (
    <div className="relative">
      <Link
        to="/"
        className="text-sm text-gray-600 mb-4 inline-block hover:underline absolute top-4 left-6 z-10"
      >
        &lt; Quay lại
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
            Đăng ký
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
                type="text"
                {...register("phoneOrEmail")}
                placeholder="Nhập số điện thoại / Email"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.phoneOrEmail && (
                <p className="text-red-500 text-xs">
                  {errors.phoneOrEmail.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Nhập mật khẩu"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Xác nhận mật khẩu"
                className="w-full border-b py-2 outline-none placeholder-gray-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" {...register("agree")} className="mt-1" />
              <span className="text-xs text-gray-600">
                Tôi đồng ý với Điều khoản dịch vụ của THE SHINE
              </span>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-xs">{errors.agree.message}</p>
            )}

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => console.log("Đăng nhập bằng Google")}
            >
              <GoogleOutlined />
              Đăng nhập bằng Google
            </button>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8B0000] to-[#D2691E] text-white py-2 rounded hover:opacity-90 cursor-pointer"
            >
              Tạo tài khoản
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
