import jobListbackground from "../../assets/iamges/jobListbackground.jpg";
import {
  CommentOutlined,
  LeftOutlined,
  LikeOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobByIdApi } from "../../services/job";
import { getApplicanCountJob } from "../../services/application";
import { addRating } from "../../services/rate";

const { TextArea } = Input;

const JobDetail = () => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState(null);
  const [applicationCount, setApplicationCount] = useState();
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();
  const role = localStorage.getItem("role");

  // State cho form đánh giá
  const [reviewForm, setReviewForm] = useState({
    rating1: 0,
    comment: "",
    contributedComment: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);

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

  const handleStarClick = (rating) => {
    setReviewForm((prev) => ({
      ...prev,
      rating1: rating,
    }));
  };
  const StarRating = ({ rating, onRate }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className="text-2xl hover:scale-110 transition-transform cursor-pointer"
          >
            {star <= rating ? (
              <StarFilled className="text-yellow-400" />
            ) : (
              <StarOutlined className="text-white hover:text-yellow-200" />
            )}
          </button>
        ))}
        <span className="ml-2 text-white text-sm">
          {rating > 0 ? `${rating}/5 sao` : "Chưa đánh giá"}
        </span>
      </div>
    );
  };

  const handleReviewChange = (field, value) => {
    setReviewForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitReview = async () => {
    if (reviewForm.rating1 === 0) {
      message.error("Vui lòng chọn số sao đánh giá!");
      return;
    }

    if (!reviewForm.comment.trim()) {
      message.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    setSubmittingReview(true);
    try {
      await addRating(reviewForm);
      message.success("Đánh giá của bạn đã được gửi thành công!");
      setReviewForm({
        rating1: 0,
        comment: "",
        contributedComment: "",
      });
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi đánh giá!");
    } finally {
      setSubmittingReview(false);
    }
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
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <StarFilled
                      key={star}
                      className="text-yellow-400 text-3xl"
                    />
                  ))}
                </div>
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
      </div>
    </div>
  );
};

export default JobDetail;
