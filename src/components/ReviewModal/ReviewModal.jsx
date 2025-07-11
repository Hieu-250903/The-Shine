import { useState } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { addRating } from "../../services/rate";
import { message } from "antd";

const ReviewModal = ({ isOpen, onClose, onReviewSubmitted }) => {
  const [reviewForm, setReviewForm] = useState({
    rating1: 0,
    comment: "",
    contributedComment: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);

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
              <StarFilled className="!text-yellow-400" />
            ) : (
              <StarOutlined className="text-gray-400 hover:text-yellow-200" />
            )}
          </button>
        ))}
        <span className="ml-2 text-gray-600 text-sm">
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
    setSubmittingReview(true);
    try {
      const reviewData = {
        ...reviewForm,
      };
      setReviewForm({
        rating1: 0,
        comment: "",
        contributedComment: "",
      });

      if (onReviewSubmitted) {
        onReviewSubmitted(reviewData);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleModalCancel = () => {
    setReviewForm({
      rating1: 0,
      comment: "",
      contributedComment: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.6)] bg-opacity-50"
        onClick={handleModalCancel}
      ></div>

      <div className="relative bg-slate-200 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Đánh giá</h2>
          <button
            onClick={handleModalCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá sao: <span className="text-red-500">*</span>
            </label>
            <StarRating rating={reviewForm.rating1} onRate={handleStarClick} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhận xét: <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reviewForm.comment}
              onChange={(e) => handleReviewChange("comment", e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn về công việc này..."
              rows={4}
              maxLength={500}
              className="w-full text-black placeholder:text-gray-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {reviewForm.comment.length}/500
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-slate-200">
          <button
            onClick={handleModalCancel}
            disabled={submittingReview}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmitReview}
            disabled={submittingReview}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submittingReview ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
