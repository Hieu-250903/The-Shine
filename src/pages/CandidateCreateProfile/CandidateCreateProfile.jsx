import { LinkOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import createprofilebg from "../../assets/iamges/createprofilebg.jpg";
import NotifyCpn from "../../components/NotifyCpn/NotifyCpn";

// Define Zod schema for form validation
const candidateSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ và tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ"),
  birthDate: z.date({
    required_error: "Vui lòng nhập ngày sinh",
    invalid_type_error: "Ngày sinh không hợp lệ",
  }),
  experience: z.string().min(1, "Vui lòng nhập kinh nghiệm làm việc"),
  portfolioUrl: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
  description: z.string().optional(),
});

const CandidateCreateProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isShowNotification, setIsShowNotification] = useState(false);
  const navigate = useNavigate();
  const validateFormWithZod = (values) => {
    try {
      // Transform date format for Zod validation
      const transformedValues = {
        ...values,
        birthDate: values.birthDate ? new Date(values.birthDate) : undefined,
      };

      candidateSchema.parse(transformedValues);
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

  // Handle profile image upload
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

  // Handle CV file upload
  const handleCvUpload = (info) => {
    if (info.file.status === "done") {
      setCvFile(info.file.originFileObj);
      message.success(`CV ${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`CV upload failed.`);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (!validateFormWithZod(values)) {
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append(
        "birthDate",
        moment(values.birthDate).format("YYYY-MM-DD")
      );
      formData.append("experience", values.experience);
      formData.append("portfolioUrl", values.portfolioUrl || "");
      formData.append("description", values.description || "");

      if (cvFile) {
        formData.append("cv", cvFile);
      }
      if (imageUrl && imageUrl.startsWith("blob:")) {
        const profileImageFile = await fetch(imageUrl)
          .then((r) => r.blob())
          .then(
            (blob) =>
              new File([blob], "profile-image.jpg", { type: "image/jpeg" })
          );
        formData.append("profileImage", profileImageFile);
      }
      setTimeout(() => {
        message.success("Hồ sơ của bạn đã được tạo thành công!");
        form.resetFields();
        setImageUrl(null);
        setCvFile(null);
        setLoading(false);
        setIsShowNotification(true);
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.");
      setIsShowNotification(false);
    } finally {
      setLoading(false);
    }
  };

  // Image upload props configuration
  const imageUploadProps = {
    name: "profileImage",
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

      // Create a temporary URL for preview
      setImageUrl(URL.createObjectURL(file));
      return false; // Prevent actual upload for now, we'll handle it when the form submits
    },
  };

  // CV upload props configuration
  const cvUploadProps = {
    name: "cv",
    showUploadList: false,
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      const isDoc =
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (!(isPDF || isDoc)) {
        message.error("Chỉ chấp nhận file PDF hoặc Word!");
        return Upload.LIST_IGNORE;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("File phải nhỏ hơn 5MB!");
        return Upload.LIST_IGNORE;
      }

      setCvFile(file);
      message.success(`CV ${file.name} đã được chọn`);
      return false; // Prevent actual upload for now
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
        <div className="w-full max-w-4xl p-6 bg-[rgba(0,0,0,.6)] z-10">
          <h1 className="text-center text-white text-3xl font-bold mb-8">
            ĐIỀN THÔNG TIN
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Upload photo */}
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
                      <p className="text-gray-500 text-sm mt-2">Tải ảnh lên</p>
                    </>
                  )}
                </div>
              </Upload>

              <div className="mt-4">
                <p className="text-white mb-2">Nộp CV tại đây</p>
                <div className="flex items-center gap-2">
                  <Upload {...cvUploadProps} onChange={handleCvUpload}>
                    <Button
                      icon={<UploadOutlined />}
                      className="bg-white text-gray-700"
                      loading={loading}
                    >
                      Tải tệp lên
                    </Button>
                  </Upload>
                  <span className="text-white">hoặc</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                validateTrigger="onBlur"
              >
                <Form.Item
                  name="fullName"
                  validateStatus={errors.fullName ? "error" : ""}
                  help={errors.fullName}
                >
                  <Input
                    placeholder="Họ và tên"
                    className="h-10 border border-gray-500 bg-transparent text-white"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  validateStatus={errors.email ? "error" : ""}
                  help={errors.email}
                >
                  <Input
                    placeholder="Email"
                    className="h-10 border border-gray-500 bg-transparent text-white"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  validateStatus={errors.phone ? "error" : ""}
                  help={errors.phone}
                >
                  <Input
                    placeholder="Số điện thoại"
                    className="h-10 border border-gray-500 bg-transparent text-white"
                  />
                </Form.Item>

                <Form.Item
                  name="birthDate"
                  validateStatus={errors.birthDate ? "error" : ""}
                  help={errors.birthDate}
                >
                  <DatePicker
                    placeholder="Ngày sinh"
                    className="h-10 w-full border border-gray-500 bg-transparent text-white"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>

                <Form.Item
                  name="experience"
                  validateStatus={errors.experience ? "error" : ""}
                  help={errors.experience}
                >
                  <Input
                    placeholder="Kinh nghiệm làm việc"
                    className="h-10 border border-gray-500 bg-transparent text-white"
                  />
                </Form.Item>

                <Form.Item
                  name="portfolioUrl"
                  validateStatus={errors.portfolioUrl ? "error" : ""}
                  help={errors.portfolioUrl}
                >
                  <p className="text-white mb-2">
                    Nộp Portfolio tại đây (nếu có)
                  </p>
                  <Input
                    placeholder="URL"
                    className="h-10 border border-gray-500 bg-transparent text-white"
                    prefix={<LinkOutlined className="text-gray-400" />}
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  validateStatus={errors.description ? "error" : ""}
                  help={errors.description}
                >
                  <p className="text-white mb-2">Mô tả bản thân</p>
                  <Input.TextArea
                    placeholder="Ghi ở đây..."
                    rows={4}
                    className="border border-gray-500 bg-transparent text-white resize-none"
                  />
                </Form.Item>

                <Form.Item className="flex justify-center mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-12 px-8 rounded bg-red-500 hover:bg-red-600 border-none font-medium"
                    loading={loading}
                  >
                    TẠO HỒ SƠ
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
            title="TẠO HỒ SƠ THÀNH CÔNG!"
            message="Chúc bạn khởi hành suôn sẻ"
            buttonText="Xem hồ sơ"
            buttonBgColor="white"
            buttonTextColor="black"
            onButtonClick={() => navigate("/candidate-info/1")}
          />
        </div>
      )}
    </div>
  );
};

export default CandidateCreateProfile;
