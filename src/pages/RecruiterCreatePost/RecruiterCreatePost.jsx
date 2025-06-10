import {
  LinkOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Upload, Select, InputNumber, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import createprofilebg from "../../assets/iamges/createprofilebg.jpg";
import NotifyCpn from "../../components/NotifyCpn/NotifyCpn";
import { getAllCategoriesApi } from "../../services/category";
import { addJobApi } from "../../services/jobs";

// Define Zod schema for form validation
const postSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề"),
  position: z.string().min(1, "Vui lòng nhập vị trí tuyển dụng"),
  requirement: z.string().min(1, "Vui lòng nhập yêu cầu"),
  description: z.string().min(1, "Vui lòng nhập mô tả"),
  jobDetails: z.string().min(1, "Vui lòng nhập chi tiết công việc"),
  requirements: z.string().min(1, "Vui lòng nhập yêu cầu công việc"),
  experience: z.string().min(1, "Vui lòng nhập kinh nghiệm"),
  benefits: z.string().min(1, "Vui lòng nhập quyền lợi"),
  salary: z.number().min(0, "Lương phải lớn hơn hoặc bằng 0"),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  contactPhone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ"),
  isUrgent: z.boolean(),
});

const RecruiterCreatePost = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await getAllCategoriesApi();
        setCategories(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Không thể tải danh mục. Vui lòng thử lại sau.");
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

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

      const apiBody = {
        title: values.title,
        position: values.position,
        requirement: values.requirement,
        description: values.description,
        jobDetails: values.jobDetails,
        requirements: values.requirements,
        experience: values.experience,
        benefits: values.benefits,
        salary: values.salary,
        categoryId: values.categoryId,
        contactPhone: values.contactPhone,
        isUrgent: values.isUrgent || false,
      };

      await addJobApi(apiBody);

      message.success("Bài đăng tuyển dụng đã được tạo thành công!");
      form.resetFields();
      setImageUrl(null);
      setLoading(false);
      setIsShowNotification(true);
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
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat relative">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.5)]"
        style={{
          backgroundImage: `url(${createprofilebg})`,
          backgroundBlendMode: 'overlay',
        }}
      />
      
      {!isShowNotification ? (
        <div className="w-full max-w-4xl p-8 bg-[rgba(0,0,0,0.75)] backdrop-blur-sm z-10 m-4 rounded-lg shadow-2xl">
          <h1 className="text-center text-white text-3xl font-bold mb-10">
            TẠO BÀI ĐĂNG TUYỂN DỤNG
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Upload company logo */}
            {/* <div className="w-full md:w-1/4 flex flex-col items-center">
              <Upload {...imageUploadProps} onChange={handleImageUpload}>
                <div
                  className="w-full aspect-square max-w-[200px] bg-[rgba(255,255,255,0.1)] flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-all duration-300 border-2 border-dashed border-gray-400"
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
                      <UserOutlined className="text-4xl text-gray-300" />
                      <p className="text-gray-300 text-sm mt-2">Logo công ty</p>
                      <p className="text-gray-400 text-xs mt-1">Nhấn để tải lên</p>
                    </>
                  )}
                </div>
              </Upload>
            </div> */}

            {/* Right side - Form */}
            <div className="w-full md:w-4/4">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                validateTrigger="onBlur"
                initialValues={{ isUrgent: false }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="title"
                    validateStatus={errors.title ? "error" : ""}
                    help={errors.title}
                    label={<span className="text-white">Tiêu đề</span>}
                  >
                    <Input
                      placeholder="Tiêu đề"
                      className="h-11 !bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300"
                    />
                  </Form.Item>

                  <Form.Item
                    name="position"
                    validateStatus={errors.position ? "error" : ""}
                    help={errors.position}
                    label={<span className="text-white">Vị trí tuyển dụng</span>}
                  >
                    <Input
                      placeholder="Vị trí tuyển dụng"
                      className="h-11 !bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300"
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="categoryId"
                    validateStatus={errors.categoryId ? "error" : ""}
                    help={errors.categoryId}
                    label={<span className="text-white">Danh mục</span>}
                  >
                    <Select
                      placeholder="Chọn danh mục"
                      className="category-select h-11"
                      loading={loadingCategories}
                      disabled={loadingCategories}
                      dropdownStyle={{
                        background: '#1f2937',
                        borderColor: '#374151'
                      }}
                    >
                      {Array.isArray(categories) && categories.map((category) => (
                        <Select.Option 
                          key={category.categoryId} 
                          value={category.categoryId}
                        >
                          <div className="flex flex-col py-1">
                            <span className="text-white text-base">{category.title}</span>
                            <span className="text-gray-400 text-xs mt-1">{category.subItems}</span>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="salary"
                    validateStatus={errors.salary ? "error" : ""}
                    help={errors.salary}
                    label={<span className="text-white">Lương (VNĐ)</span>}
                  >
                    <InputNumber
                      placeholder="Nhập mức lương"
                      className="h-11 w-full !bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      min={0}
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="contactPhone"
                    validateStatus={errors.contactPhone ? "error" : ""}
                    help={errors.contactPhone}
                    label={<span className="text-white">Số điện thoại liên hệ</span>}
                  >
                    <Input
                      placeholder="Số điện thoại liên hệ"
                      className="h-11 !bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300"
                    />
                  </Form.Item>

                  <Form.Item
                    name="experience"
                    validateStatus={errors.experience ? "error" : ""}
                    help={errors.experience}
                    label={<span className="text-white">Kinh nghiệm yêu cầu</span>}
                  >
                    <Input
                      placeholder="Kinh nghiệm yêu cầu"
                      className="h-11 !bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="requirement"
                  validateStatus={errors.requirement ? "error" : ""}
                  help={errors.requirement}
                  label={<span className="text-white">Yêu cầu cơ bản</span>}
                >
                  <Input.TextArea
                    placeholder="Yêu cầu cơ bản"
                    rows={4}
                    className="!bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300 resize-none"
                  />
                </Form.Item>

                <Form.Item
                  name="requirements"
                  validateStatus={errors.requirements ? "error" : ""}
                  help={errors.requirements}
                  label={<span className="text-white">Yêu cầu công việc chi tiết</span>}
                >
                  <Input.TextArea
                    placeholder="Yêu cầu công việc chi tiết"
                    rows={4}
                    className="!bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300 resize-none"
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  validateStatus={errors.description ? "error" : ""}
                  help={errors.description}
                  label={<span className="text-white">Mô tả công việc</span>}
                >
                  <Input.TextArea
                    placeholder="Mô tả công việc"
                    rows={4}
                    className="!bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300 resize-none"
                  />
                </Form.Item>

                <Form.Item
                  name="jobDetails"
                  validateStatus={errors.jobDetails ? "error" : ""}
                  help={errors.jobDetails}
                  label={<span className="text-white">Chi tiết công việc</span>}
                >
                  <Input.TextArea
                    placeholder="Chi tiết công việc"
                    rows={4}
                    className="!bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300 resize-none"
                  />
                </Form.Item>

                <Form.Item
                  name="benefits"
                  validateStatus={errors.benefits ? "error" : ""}
                  help={errors.benefits}
                  label={<span className="text-white">Quyền lợi</span>}
                >
                  <Input.TextArea
                    placeholder="Quyền lợi"
                    rows={4}
                    className="!bg-[rgba(255,255,255,0.1)] hover:!bg-[rgba(255,255,255,0.15)] focus:!bg-[rgba(255,255,255,0.15)] !text-white placeholder:!text-gray-400 border border-gray-500 rounded-md transition-all duration-300 resize-none"
                  />
                </Form.Item>

                <div className="flex items-center gap-3">
                  <Form.Item
                    name="isUrgent"
                    valuePropName="checked"
                    className="mb-0"
                  >
                    <Switch className="bg-gray-600" />
                  </Form.Item>
                  <span className="text-white">Tuyển gấp</span>
                </div>

                <Form.Item className="flex justify-center mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-12 px-12 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-none font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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

      <style jsx="true">{`
        .category-select .ant-select-selector {
          background-color: rgba(255, 255, 255, 0.1) !important;
          border-color: rgb(107, 114, 128) !important;
          height: 44px !important;
          padding: 0 16px !important;
          color: white !important;
        }
        
        .category-select .ant-select-selection-placeholder {
          color: rgb(156, 163, 175) !important;
          line-height: 44px !important;
        }
        
        .category-select .ant-select-selection-item {
          line-height: 44px !important;
          color: white !important;
        }
        
        .category-select:hover .ant-select-selector {
          background-color: rgba(255, 255, 255, 0.15) !important;
        }
        
        .ant-select-dropdown {
          background-color: rgb(31, 41, 55) !important;
          border: 1px solid rgb(55, 65, 81) !important;
        }
        
        .ant-select-item {
          color: white !important;
        }
        
        .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        
        .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
          background-color: rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default RecruiterCreatePost;
