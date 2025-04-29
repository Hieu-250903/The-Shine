import {
  LinkOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import createprofilebg from "../../assets/iamges/createprofilebg.jpg";
import NotifyCpn from "../../components/NotifyCpn/NotifyCpn";

// Define Zod schema for form validation
const postSchema = z.object({
  companyName: z.string().min(1, "Vui lòng nhập tên công ty"),
  position: z.string().min(1, "Vui lòng nhập vị trí tuyển dụng"),
  requirements: z.string().min(1, "Vui lòng nhập yêu cầu"),
  phone: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ"),
  experience: z.string().min(1, "Vui lòng nhập yêu cầu kinh nghiệm"),
  website: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
  jobDescription: z.string().min(1, "Vui lòng nhập mô tả công việc"),
  jobDetails: z.string().min(1, "Vui lòng nhập chi tiết công việc"),
});

const RecruiterCreatePost = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isShowNotification, setIsShowNotification] = useState(false);
  const navigate = useNavigate();

  const validateFormWithZod = (values) => {
    try {
      postSchema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Handle company logo upload
  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setImageUrl(
        info.file.response.url || URL.createObjectURL(info.file.originFileObj)
      );
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (!validateFormWithZod(values)) {
        return;
      }

      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        message.success("Bài đăng tuyển dụng đã được tạo thành công!");
        form.resetFields();
        setImageUrl(null);
        setLoading(false);
        setIsShowNotification(true);
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Có lỗi xảy ra khi tạo bài đăng. Vui lòng thử lại.");
      setIsShowNotification(false);
    } finally {
      setLoading(false);
    }
  };

  // Image upload props configuration
  const imageUploadProps = {
    name: "companyLogo",
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ có thể tải lên hình ảnh!");
        return Upload.LIST_IGNORE;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Hình ảnh phải nhỏ hơn 2MB!");
        return Upload.LIST_IGNORE;
      }

      setImageUrl(URL.createObjectURL(file));
      return false;
    },
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${createprofilebg})`,
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,.4)]" />
      {!isShowNotification ? (
        <div className="w-full max-w-4xl p-6 bg-[rgba(0,0,0,.6)] z-10 mt-6">
          <h1 className="text-center text-white text-3xl font-bold mb-8">
            TẠO BÀI ĐĂNG TUYỂN DỤNG
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Upload company logo */}
            <div className="w-full md:w-1/4 flex flex-col items-center">
              <Upload {...imageUploadProps} onChange={handleImageUpload}>
                <div
                  className="w-40 h-48 bg-gray-200 flex flex-col items-center justify-center mb-2 rounded cursor-pointer hover:opacity-80 transition-opacity"
                  style={
                    imageUrl
                      ? {
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                >
                  {!imageUrl && (
                    <>
                      <UserOutlined className="text-4xl text-gray-400" />
                      <p className="text-gray-500 text-sm mt-2">Logo công ty</p>
                    </>
                  )}
                </div>
              </Upload>
            </div>

            <div className="w-full md:w-3/4">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                validateTrigger="onBlur"
              >
                <Form.Item
                  name="companyName"
                  validateStatus={errors.companyName ? "error" : ""}
                  help={errors.companyName}
                >
                  <Input
                    placeholder="Tên công ty"
                    className="h-10 border border-gray-500 !bg-transparent !text-white placeholder:!text-slate-200"
                  />
                </Form.Item>

                <Form.Item
                  name="position"
                  validateStatus={errors.position ? "error" : ""}
                  help={errors.position}
                >
                  <Input
                    placeholder="Vị trí tuyển dụng"
                    className="h-10 border border-gray-500 !bg-transparent !text-white placeholder:!text-slate-200"
                  />
                </Form.Item>

                <Form.Item
                  name="requirements"
                  validateStatus={errors.requirements ? "error" : ""}
                  help={errors.requirements}
                >
                  <Input
                    placeholder="Yêu cầu công việc"
                    className="h-10 border border-gray-500 !bg-transparent !text-white placeholder:!text-slate-200"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  validateStatus={errors.phone ? "error" : ""}
                  help={errors.phone}
                >
                  <Input
                    placeholder="Số điện thoại liên hệ"
                    className="h-10 border border-gray-500 !bg-transparent !text-white placeholder:!text-slate-200"
                  />
                </Form.Item>

                <Form.Item
                  name="experience"
                  validateStatus={errors.experience ? "error" : ""}
                  help={errors.experience}
                >
                  <Input
                    placeholder="Yêu cầu kinh nghiệm"
                    className="h-10 border border-gray-500 !bg-transparent !text-white placeholder:!text-slate-200"
                  />
                </Form.Item>

                <Form.Item
                  name="website"
                  validateStatus={errors.website ? "error" : ""}
                  help={errors.website}
                >
                  <Input
                    placeholder="Website công ty"
                    className="h-10 border border-gray-500 !bg-transparent !text-white placeholder:!text-slate-200"
                    prefix={<LinkOutlined className="text-gray-400" />}
                  />
                </Form.Item>

                <Form.Item
                  name="jobDescription"
                  validateStatus={errors.jobDescription ? "error" : ""}
                  help={errors.jobDescription}
                >
                  <Input.TextArea
                    placeholder="Mô tả công việc"
                    rows={4}
                    className="border border-gray-500 !bg-transparent !text-white placeholder:!text-slate-200 resize-none"
                  />
                </Form.Item>

                <Form.Item>
                  <p className="text-white mb-2">Bộ lọc bài đăng</p>
                  <Flex>
                    <div className="rounded-tl-full rounded-bl-full w-32 border border-white cursor-pointer flex justify-center items-center text-white py-2">
                      <p>CHỌN BỘ LỌC</p>
                    </div>
                    <div className="rounded-tr-full rounded-br-full w-20 border border-white cursor-pointer flex justify-center items-center bg-white py-2">
                      <PlusOutlined className="!text-black" />
                    </div>
                  </Flex>
                </Form.Item>

                <Form.Item
                  name="jobDetails"
                  validateStatus={errors.jobDetails ? "error" : ""}
                  help={errors.jobDetails}
                  className="!mt-6"
                >
                  <Input.TextArea
                    placeholder="Chi tiết công việc"
                    rows={4}
                    className="border border-gray-500 !bg-transparent !text-white placeholder:!text-slate-200 resize-none"
                  />
                </Form.Item>

                <Form.Item className="flex justify-center mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-12 px-8 rounded bg-red-500 hover:bg-red-600 border-none font-medium"
                    loading={loading}
                  >
                    ĐĂNG TUYỂN
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-10 w-4xl">
          <NotifyCpn
            status="success"
            title="ĐĂNG TUYỂN THÀNH CÔNG!"
            message="Bài đăng của bạn đã được tạo"
            buttonText="Xem bài đăng"
            buttonBgColor="white"
            buttonTextColor="black"
            onButtonClick={() => navigate("/job-detail/1")}
          />
        </div>
      )}
    </div>
  );
};

export default RecruiterCreatePost;
