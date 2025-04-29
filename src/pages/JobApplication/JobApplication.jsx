import jobListBackground from "../../assets/iamges/jobListbackground.jpg";
import { Rate } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResumeModal from "../../components/Modal/ResumeModal/ResumeModal";
import {
  CheckCircleFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const JobApplication = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    about: "",
    interviewType: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [_, setFileName] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files?.[0];
      setFormData((prev) => ({ ...prev, resume: file }));
      setFileName(file?.name || "");
    } else if (name === "interviewType") {
      setFormData((prev) => ({ ...prev, interviewType: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.about || formData.about.trim().length < 10) {
      newErrors.about = "Vui lòng mô tả bản thân ít nhất 10 ký tự.";
    }

    if (!formData.interviewType) {
      newErrors.interviewType = "Vui lòng chọn hình thức phỏng vấn.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsSubmit(true);
      setErrors({});
      console.log("Dữ liệu hợp lệ:", formData);
    }
  };
  const handleSelectResume = (selectedResume) => {
    if (selectedResume.title === "Tạo ngay") {
    } else setSelectedResume(selectedResume);
  };
  return (
    <>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url(${jobListBackground})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full bg-[rgba(0,0,0,.4)] min-h-screen py-12">
          {!isSubmit ? (
            <div className="mx-auto w-full max-w-6xl rounded-lg overflow-hidden py-6 px-10">
              <div className="text-center text-white text-2xl font-bold py-6">
                ĐƠN ỨNG TUYỂN
              </div>

              <div className="flex items-start gap-6 w-5xl">
                <div className="flex items-start">
                  <div className="relative">
                    <img
                      src="https://i.pinimg.com/736x/5a/89/6d/5a896d18e2916972896bca216120bc38.jpg"
                      alt="TLC Corp"
                      className="rounded-lg object-cover w-full h-[500px]"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Rate value={4} className="!flex !flex-col !text-3xl" />
                    </div>
                    <div className="text-4xl font-bold uppercase text-center absolute bottom-2 right-1/2 translate-x-[50%] text-white">
                      TLC Corp
                    </div>
                  </div>
                </div>

                <div className="space-y-8 bg-[rgba(0,0,0,.6)] p-5 w-3xl">
                  {selectedResume ? (
                    <div className="flex">
                      <img
                        src={selectedResume.imgUrl}
                        className="w-40 h-72 object-cover"
                      />
                      <div className="flex flex-col items-center gap-2 flex-1 justify-center">
                        <span className="text-white font-bold text-2xl">
                          {selectedResume.desc}
                        </span>
                        <div className="flex items-center gap-2 text-white mt-4">
                          <span>Upload thành công</span>
                          <CheckCircleFilled className="!text-green-500" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setOpenModal(true)}
                      className="flex border border-white rounded-md h-40 items-center justify-center"
                    >
                      <label className="block mb-2 font-bold text-black bg-white px-10 py-2 rounded-full cursor-pointer hover:bg-gray-200">
                        Gửi hồ sơ
                      </label>
                    </div>
                  )}

                  <div>
                    <label className="block mb-2 font-medium text-white">
                      Lời nhắn đến nhà tuyển dụng
                    </label>
                    <textarea
                      name="about"
                      rows={5}
                      onChange={handleChange}
                      value={formData.about}
                      className="w-full border border-white text-white p-2 rounded placeholder-slate-400 placeholder:text-sm"
                      placeholder="Mô tả bản thân và kinh nghiệm..."
                    />
                    {errors.about && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.about}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-white">
                      Hình thức phỏng vấn
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="radio"
                          name="interviewType"
                          value="online"
                          checked={formData.interviewType === "online"}
                          onChange={handleChange}
                        />
                        Online
                      </label>
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="radio"
                          name="interviewType"
                          value="offline"
                          checked={formData.interviewType === "offline"}
                          onChange={handleChange}
                        />
                        Offline
                      </label>
                    </div>
                    {errors.interviewType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.interviewType}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-10">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 bg-white hover:bg-slate-300 text-black rounded-md font-bold cursor-pointer"
                >
                  HỦY BỎ
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-bold cursor-pointer"
                >
                  XÁC NHẬN ỨNG TUYỂN
                </button>
              </div>
            </div>
          ) : (
            <div className="h-screen flex items-center justify-center">
              <div className="w-3xl py-20 shadow-lg flex flex-col gap-6 items-center justify-center mx-auto bg-[rgba(0,0,0,.7)] p-5 rounded-lg">
                <span className="text-white font-bold text-3xl">
                  ỨNG TUYỂN THÀNH CÔNG!
                </span>
                <span className="text-white">
                  Chờ phản hồi từ nhà tuyển dụng nhé
                </span>
                <CheckCircleFilled className="!text-green-500 !text-2xl" />
                <div className="flex justify-center cursor-pointer">
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-white text-blue-900 py-3 px-6 flex items-center cursor-pointer hover:bg-slate-200 rounded-sm"
                  >
                    THEO DÕI CÔNG VIỆC
                    <RightOutlined className="ml-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {openModal ? (
        <ResumeModal
          onClose={() => setOpenModal(false)}
          open={() => setOpenModal(true)}
          onSelectResume={handleSelectResume}
        />
      ) : null}
    </>
  );
};

export default JobApplication;
