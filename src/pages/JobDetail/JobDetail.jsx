import jobListbackground from "../../assets/iamges/jobListbackground.jpg";
import {
  CommentOutlined,
  LeftOutlined,
  LikeOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Rate } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobByIdApi } from "../../services/job";
import { getApplicanCountJob } from "../../services/application";

const JobDetail = () => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState(null);
  const [applicationCount, setApplicationCount] = useState();
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();
  const role = localStorage.getItem("role");
  const applications = [
    {
      name: "Nguyễn Trọng A",
      rating: 4,
      comment: "Rất tốt",
      date: "03 - 07 - 2025",
    },
    {
      name: "Hồ Tấn B",
      rating: 3,
      comment: "Tạm được",
      date: "26 - 03 - 2025",
    },
    {
      name: "Nguyễn Ngọc C",
      rating: 5,
      comment: "Tuyệt",
      date: "04 - 01 - 2025",
    },
  ];

  const timeline = [
    {
      date: "03 - 07 - 2025",
      content: "Được tuyển thành nhân viên hỗ trợ sự kiện tại Công ty X.",
    },
    {
      date: "12 - 06 - 2025",
      content: "Được book làm thiết kế poster quảng cáo cho Nhà hàng Y.",
    },
    {
      date: "26 - 05 - 2025",
      content: "Tham gia dự án xây dựng hệ thống ngân hàng tại Công ty Z.",
    },
    {
      date: "13 - 04 - 2025",
      content: "Hoàn thành chuyên đề phát triển sản phẩm cho Cửa hàng A.",
    },
    {
      date: "10 - 02 - 2025",
      content: "Được tuyển dụng làm trợ lý bán hàng theo ca tại Shop B.",
    },
  ];

  useEffect(() => {
    const fetchJobDetail = async () => {
      setLoading(true);
      try {
        const res = await getJobByIdApi(id);
        if (res) {
          setJobDetail(res);
        }
      } catch (error) {
        console.error("Error fetching job detail:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchJobCount = async () => {
      try {
        const res = await getApplicanCountJob(id);
        if (res) {
          setApplicationCount(res);
        }
      } catch (error) {
        console.error("Error fetching job detail:", error);
      }
    };
    fetchJobCount();
    fetchJobDetail();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Đang tải thông tin công việc...</p>
      </div>
    );
  }

  if (!jobDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Không tìm thấy thông tin công việc</p>
      </div>
    );
  }

  return (
    <div
      className="text-white"
      style={{
        backgroundImage: `url(${jobListbackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[rgba(0,0,0,.4)] pb-6">
        <div
          onClick={() => navigator(-1)}
          className="flex items-center gap-2 cursor-pointer text-sm font-semibold hover:text-gray-400 pt-4 pl-10"
        >
          <LeftOutlined />
          <span>QUAY LẠI</span>
        </div>

        <div className="flex items-start gap-10 mt-4">
          <div className="flex flex-col p-2 px-8">
            <div className="relative">
              <img
                src="https://i.pinimg.com/736x/5a/89/6d/5a896d18e2916972896bca216120bc38.jpg"
                alt={jobDetail.companyName}
                className="rounded-lg object-cover w-[500px] h-[600px]"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Rate value={4} className="!flex !flex-col !text-3xl" />
              </div>
              <div className="text-4xl font-bold uppercase text-center absolute bottom-2 right-1/2 translate-x-[50%]">
                {jobDetail.companyName || "N/A"}
              </div>
              {jobDetail.isUrgent && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                    TUYỂN GẤP
                  </span>
                </div>
              )}
            </div>
            {role !== "recruiter" ? (
              <button
                onClick={() => navigator(`/job-application/${jobDetail.jobId}`)}
                className="mt-6 bg-white text-black font-bold text-xl px-10 py-4 cursor-pointer rounded-xl hover:bg-gray-200"
              >
                ỨNG TUYỂN
              </button>
            ) : (
              <button
                onClick={() => navigator(-1)}
                className="mt-6 bg-white text-black font-bold text-xl px-10 py-4 cursor-pointer rounded-xl hover:bg-gray-200"
              >
                TRỞ VỀ
              </button>
            )}
          </div>

          <div className="space-y-8 mt-12">
            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                Mô tả công việc
              </h2>
              <p className="text-sm leading-relaxed text-gray-300">
                {jobDetail.description || "Chưa có mô tả công việc"}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                Chi tiết công việc
              </h2>
              <p className="text-sm leading-relaxed text-gray-300">
                {jobDetail.jobDetails || "Chưa có chi tiết công việc"}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                SỐ LƯỢNG ĐÃ ỨNG TUYỂN
              </h2>
              <p className="text-sm leading-relaxed text-gray-300">
                {applicationCount || "Chưa cập nhật"}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                Thông tin
              </h2>
              <div className="text-sm space-y-2 text-gray-300">
                <p>
                  <span className="font-bold text-white">Tên công ty:</span>{" "}
                  {jobDetail.companyName || "N/A"}
                </p>
                <p>
                  <span className="font-bold text-white">Tiêu đề:</span>{" "}
                  {jobDetail.title || "N/A"}
                </p>
                <p>
                  <span className="font-bold text-white">
                    Vị trí tuyển dụng:
                  </span>{" "}
                  {jobDetail.position || "N/A"}
                </p>

                <p>
                  <span className="font-bold text-white">Mức lương:</span>{" "}
                  {jobDetail.salary
                    ? `${jobDetail.salary.toLocaleString()} VNĐ`
                    : "N/A"}
                </p>
                <p>
                  <span className="font-bold text-white">Liên hệ:</span>{" "}
                  {jobDetail.contactPhone || "N/A"}
                </p>
                <p>
                  <span className="font-bold text-white">Trạng thái:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      jobDetail.status === "Open"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {jobDetail.status === "Open"
                      ? "Đang tuyển"
                      : jobDetail.status}
                  </span>
                </p>
                <p>
                  <span className="font-bold text-white">Ngày đăng:</span>{" "}
                  {formatDate(jobDetail.postedAt)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                Về công ty
              </h2>
              <div className="flex gap-4">
                <button className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black cursor-pointer">
                  WEB
                </button>
                <button
                  onClick={() =>
                    navigator(`/job-description/${jobDetail.jobId}`)
                  }
                  className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black cursor-pointer"
                >
                  CHI TIẾT CÔNG VIỆC
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Application History */}
        <div className="mt-12 bg-[rgba(0,0,0,.6)] p-6 mx-auto max-w-[75%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {applications.length > 0 ? (
                applications.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-gray-800 p-3 rounded-full">
                      <UserOutlined className="text-xl" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2 my-1">
                        <div className="flex">
                          {[...Array(item.rating)].map((_, idx) => (
                            <StarFilled
                              key={idx}
                              className="text-yellow-400 text-sm"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{item.comment}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button className="bg-white px-1 rounded-full w-6 cursor-pointer hover:bg-gray-200">
                          <LikeOutlined color="black" className="!text-black" />
                        </button>
                        <button className="bg-white px-1 rounded-full w-6 cursor-pointer hover:bg-gray-200">
                          <CommentOutlined
                            color="black"
                            className="!text-black"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">
                  <p>Chưa có đánh giá nào</p>
                </div>
              )}
            </div>

            <div className="relative">
              <span className="text-center text-2xl block absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[rgba(0,0,0,.7)] text-white font-bold py-2 px-4 rounded-md">
                LỊCH SỬ ỨNG TUYỂN
              </span>
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-500"></div>
              <div className="space-y-10 pl-10">
                {timeline.length > 0 ? (
                  timeline.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 bg-white rounded-full"></div>
                      <p className="text-white font-medium">{item.date}</p>
                      <p className="text-sm text-gray-400">{item.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">
                    <p>Chưa có lịch sử ứng tuyển</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
