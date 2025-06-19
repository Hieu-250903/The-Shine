import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import createprofilebg from "../../assets/iamges/createprofilebg.jpg";
import NotifyCpn from "../../components/NotifyCpn/NotifyCpn";
import { createjobApi } from "../../services/job";
import { getAllCategory } from "../../services/category";
import { message } from "antd";

const postSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề"),
  position: z.string().min(1, "Vui lòng nhập vị trí tuyển dụng"),
  requirement: z.string().min(1, "Vui lòng nhập yêu cầu"),
  description: z.string().min(1, "Vui lòng nhập mô tả công việc"),
  jobDetails: z.string().min(1, "Vui lòng nhập chi tiết công việc"),
  requirements: z.string().min(1, "Vui lòng nhập yêu cầu chi tiết"),
  experience: z.string().min(1, "Vui lòng nhập yêu cầu kinh nghiệm"),
  benefits: z.string().min(1, "Vui lòng nhập quyền lợi"),
  salary: z.number().min(0, "Mức lương phải lớn hơn 0"),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  contactPhone: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ"),
  isUrgent: z.boolean(),
});

const RecruiterCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const navigate = useNavigate();
  const fetchCatregoryData = async () => {
    const res = await getAllCategory();
    if (res) {
      setAllCategory(res);
    }
  };
  useEffect(() => {
    fetchCatregoryData();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      position: "",
      requirement: "",
      description: "",
      jobDetails: "",
      requirements: "",
      experience: "",
      benefits: "",
      salary: 0,
      categoryId: "",
      contactPhone: "",
      isUrgent: false,
    },
  });

  const watchIsUrgent = watch("isUrgent");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        alert("Chỉ có thể tải lên hình ảnh!");
        return;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        alert("Hình ảnh phải nhỏ hơn 2MB!");
        return;
      }

      setImageUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        ...data,
        salary: Number(data.salary),
      };
      const res = await createjobApi(formData);
      if (res) {
        reset();
        setImageUrl(null);
        setLoading(false);
        setIsShowNotification(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.warning("Cần tạo thông tin công ty trước khi  đăng bài");
      setIsShowNotification(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat relative pb-20"
      style={{
        backgroundImage: `url(${createprofilebg})`,
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,.2)] bg-opacity-40" />
      {!isShowNotification ? (
        <div className="w-full max-w-4xl p-6 bg-[rgba(0,0,0,.8)] bg-opacity-60 z-10 mt-6 rounded-lg">
          <h1 className="text-center text-white text-3xl font-bold mb-8">
            TẠO BÀI ĐĂNG TUYỂN DỤNG
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register("title")}
                    type="text"
                    placeholder="Tiêu đề bài đăng"
                    className="w-full h-10 px-3 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("position")}
                    type="text"
                    placeholder="Vị trí tuyển dụng"
                    className="w-full h-10 px-3 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.position && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.position.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <select
                    {...register("categoryId")}
                    className="w-full h-10 px-3 border border-gray-500 bg-transparent text-white rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="" className="text-black">
                      Chọn danh mục
                    </option>
                    {allCategory &&
                      allCategory.length > 0 &&
                      allCategory.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                          className="text-black"
                        >
                          {category.title}
                        </option>
                      ))}
                  </select>
                  {errors.categoryId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>

                {/* Salary */}
                <div>
                  <input
                    {...register("salary", { valueAsNumber: true })}
                    type="number"
                    placeholder="Mức lương (VNĐ)"
                    className="w-full h-10 px-3 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salary.message}
                    </p>
                  )}
                </div>

                {/* Contact Phone */}
                <div>
                  <input
                    {...register("contactPhone")}
                    type="text"
                    placeholder="Số điện thoại liên hệ"
                    className="w-full h-10 px-3 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.contactPhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactPhone.message}
                    </p>
                  )}
                </div>

                {/* Requirement */}
                <div>
                  <input
                    {...register("requirement")}
                    type="text"
                    placeholder="Yêu cầu tổng quát"
                    className="w-full h-10 px-3 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.requirement && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.requirement.message}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <input
                    {...register("experience")}
                    type="text"
                    placeholder="Yêu cầu kinh nghiệm"
                    className="w-full h-10 px-3 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <textarea
                    {...register("description")}
                    placeholder="Mô tả công việc"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded resize-none focus:outline-none focus:border-blue-500"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Requirements */}
                <div>
                  <textarea
                    {...register("requirements")}
                    placeholder="Yêu cầu chi tiết"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded resize-none focus:outline-none focus:border-blue-500"
                  />
                  {errors.requirements && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.requirements.message}
                    </p>
                  )}
                </div>

                {/* Job Details */}
                <div>
                  <textarea
                    {...register("jobDetails")}
                    placeholder="Chi tiết công việc"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded resize-none focus:outline-none focus:border-blue-500"
                  />
                  {errors.jobDetails && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.jobDetails.message}
                    </p>
                  )}
                </div>

                {/* Benefits */}
                <div>
                  <textarea
                    {...register("benefits")}
                    placeholder="Quyền lợi"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-500 bg-transparent text-white placeholder-slate-200 rounded resize-none focus:outline-none focus:border-blue-500"
                  />
                  {errors.benefits && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.benefits.message}
                    </p>
                  )}
                </div>

                {/* Is Urgent */}
                <div className="flex items-center space-x-2">
                  <input
                    {...register("isUrgent")}
                    type="checkbox"
                    id="isUrgent"
                    className="w-4 h-4 text-red-500 bg-transparent border-gray-500 rounded focus:ring-red-500"
                  />
                  <label htmlFor="isUrgent" className="text-white text-sm">
                    Tuyển gấp
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-12 px-8 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium rounded transition-colors duration-200"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang xử lý...</span>
                      </div>
                    ) : (
                      "ĐĂNG TUYỂN"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-10 w-full max-w-4xl">
          <NotifyCpn
            status="success"
            title="ĐĂNG TUYỂN THÀNH CÔNG!"
            message="Bài đăng của bạn đã được tạo"
            buttonText="Trở về"
            buttonBgColor="white"
            buttonTextColor="black"
            onButtonClick={() => navigate("/recruiter-list-post")}
          />
        </div>
      )}
    </div>
  );
};

export default RecruiterCreatePost;
