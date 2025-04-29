import React, { useState } from "react";
import { Button, Checkbox } from "antd";
import { GoogleOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  rememberMe: z.boolean().optional(),
});

const LoginScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    try {
      loginSchema.parse(formData);
      // Nếu xác thực thành công, chuyển đến màn hình lựa chọn vai trò
      navigate("/role-selection");
    } catch (error) {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  const handleGoogleLogin = () => {
    navigate("/role-selection");
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="flex-1 overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://s3-alpha-sig.figma.com/img/d781/5d1a/85ad0c4a17a4637c2981b5bd52865fa2?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RC2B0z7jQN43GmArqkYpgTLq5vePayi8eLgZ2Rn6MiRZ~KWX5KGMxGSuLjdc-aqCa4wfTE1PHNTZ0sGA-hD1ogsMiIdGOSWJnbDwmF7cxJXPvi5jLK5BMjh9sSeGy4SnT5pNXMpoPViNv8ifdZ31z9kvDNZ3eYxlW5zvNC8BjNspcb4z7aSN0dGprDdymQwY0Xk89djm07KMgrtK334RgSpo4bUfCoDfSv4C5uuc~phnFO~-w4GCGJTTxjoA78EAQo5onD5Cg2h74GZJv-0q-17QDyQBzuUOt6MDbAq-XNtzSHY~4zlWmvBpHanAB3o7hEjYSrFvD~GpJXEsm3WYfw__')",
            backgroundPositionX: "-400px",
          }}
        >
          <div className="w-[60%] overflow-hidden absolute right-0 top-0 bottom-0">
            <div
              className="bg-cover bg-center h-screen clip-diagonal"
              style={{
                backgroundImage:
                  "url('https://s3-alpha-sig.figma.com/img/31d8/ed2e/14e425f9ba6916bafefd96ecdfa093a0?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WhThI2W3mFXKIz6RKPT~jgNKYJJR1P55z~Tr7R4SziS2o-NNAof9gP~cHBfR~IOaRVjfr5ekxUBHb4UdvqCGs6hj4WEAK6WLyzX2kETX2qT1yjaSDuboDjcvrZwLMlzMQ2rYIewYJMDNvQqt1kdqW2svKtB0O6FA4XxbCzV9v3WgMxVkHKD1h9rWFTbnVc57LodZASlUOKLeTFGWwzGj-qfUbarohV7MYAt4sDwh-JLOwEg7dZoIUbViwwnqF2aMKFwGmBXahVvtZGSBlIQx9sCOCs2ET85Y5GH8c2fA9b6z18DH9ZmYSO6NLz4npYNYJTvN5791ZhFk-fXfMWXBJA__')",
              }}
            >
              <div className="flex flex-col h-full w-full bg-[rgba(0,0,0,0.8)] relative">
                <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white">
                  <div className="flex flex-col h-full w-full">
                    <div className="relative h-full w-full flex flex-col items-center justify-center text-white">
                      <CloseOutlined
                        className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
                        onClick={handleClose}
                      />

                      <div className="w-full max-w-md px-8 py-6">
                        <h1 className="text-4xl font-bold mb-1 text-center">
                          THE SHINE
                        </h1>
                        <h2 className="text-xl mb-8 text-center">
                          CÙNG NHAU ĐI ĐẾN TƯƠNG LAI
                        </h2>

                        <div className="mb-6">
                          <input
                            name="email"
                            type="email"
                            placeholder="Nhập email hoặc số điện thoại"
                            className="w-full p-2 mb-2 bg-transparent border-b border-gray-400 text-white outline-none"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="mb-6">
                          <input
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full p-2 mb-2 bg-transparent border-b border-gray-400 text-white outline-none"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          {errors.password && (
                            <p className="text-red-500 text-sm">
                              {errors.password}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center mb-6 text-sm">
                          <Checkbox
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="text-white custom-checkbox"
                          >
                            <span className="text-white ml-2">
                              Ghi nhớ mật khẩu
                            </span>
                          </Checkbox>
                          <a href="#" className="text-white">
                            Quên mật khẩu?
                          </a>
                        </div>

                        <Button
                          className="w-full py-2 h-10 !bg-[#8B5935] hover:bg-amber-700 !text-white font-medium rounded-sm border-none"
                          onClick={handleSubmit}
                        >
                          ĐĂNG NHẬP
                        </Button>

                        <div className="flex items-center justify-center my-4">
                          <div className="flex-1 h-px bg-gray-400"></div>
                          <p className="mx-4 text-gray-400">HOẶC</p>
                          <div className="flex-1 h-px bg-gray-400"></div>
                        </div>

                        <Button
                          className="w-full py-2 h-10 bg-white text-black font-medium rounded-sm border-none flex items-center justify-center"
                          onClick={handleGoogleLogin}
                          icon={<GoogleOutlined />}
                        >
                          <span className="ml-2">GOOGLE</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
