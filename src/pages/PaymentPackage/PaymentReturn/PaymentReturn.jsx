import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotifyCpn from "../../../components/NotifyCpn/NotifyCpn";
import ReviewModal from "../../../components/ReviewModal/ReviewModal";
import { addRating, checkRating1 } from "../../../services/rate";

const PaymentReturn = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const isCancel = type === "cancel";

  const config = {
    status: isCancel ? "error" : "success",
    title: isCancel ? "THANH TOÁN THẤT BẠI" : "THANH TOÁN THÀNH CÔNG",
    message: isCancel
      ? "Có lỗi xảy ra hoặc bạn đã hủy thanh toán. Vui lòng thử lại."
      : "Giờ đây bạn có thể đăng bài theo ý muốn",
    buttonText: "Trở về",
    buttonBgColor: isCancel ? "red" : "green",
    buttonTextColor: "white",
  };
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(true);
 
  const handleReviewSubmitted = async (reviewForm) => {
    console.log("reviewForm", reviewForm);
    if (reviewForm.rating1 === 0) {
      message.error("Vui lòng chọn số sao đánh giá!");
      return;
    }
    if (!reviewForm.comment.trim()) {
      message.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }
    reviewForm.contributedComment = "1";
    try {
      await addRating(reviewForm);
      message.success("Đánh giá của bạn đã được gửi thành công!");
      setIsReviewModalOpen(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi đánh giá!");
    } finally {
      setIsReviewModalOpen(false);
    }
  };
  const handleCloseModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <div className="bg-slate-500">
      <NotifyCpn
        status={config.status}
        title={config.title}
        message={config.message}
        buttonText={config.buttonText}
        buttonBgColor={config.buttonBgColor}
        buttonTextColor={config.buttonTextColor}
        onButtonClick={() => navigate("/")}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseModal}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
};

export default PaymentReturn;
