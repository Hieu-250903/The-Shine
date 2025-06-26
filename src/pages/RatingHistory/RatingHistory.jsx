import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Star,
  Calendar,
  MessageCircle,
  User,
  Filter,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  X,
  Check,
} from "lucide-react";
import {
  getUserRating,
  userUpdateRating,
  userDeleteRating,
} from "../../services/rate";
import { message } from "antd";

const RatingHistory = () => {
  const [allReview, setAllReview] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Edit modal states
  const [editingRating, setEditingRating] = useState(null);
  const [editForm, setEditForm] = useState({
    ratingId: "",
    rating1: 0,
    comment: "",
    contributedComment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUserRating();
      if (res) {
        setAllReview(res);
        setFilteredRatings(res);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit rating
  const handleEdit = (rating) => {
    setEditingRating(rating.ratingId);
    setEditForm({
      ratingId: rating.ratingId,
      rating1: rating.rating1,
      comment: rating.comment || "",
      contributedComment: rating.contributedComment || "",
    });
  };

  const handleUpdateRating = async () => {
    setIsSubmitting(true);
    try {
      await userUpdateRating(editForm);
      const updatedReviews = allReview.map((review) =>
        review.ratingId === editForm.ratingId
          ? { ...review, ...editForm }
          : review
      );
      setAllReview(updatedReviews);
      setEditingRating(null);
      setEditForm({
        ratingId: "",
        rating1: 0,
        comment: "",
        contributedComment: "",
      });

      message.success("Cập nhật đánh giá thành công!");
    } catch (error) {
      console.error("Error updating rating:", error);
      message.error("Có lỗi xảy ra khi cập nhật đánh giá!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (ratingId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) return;
    setDeletingId(ratingId);
    try {
      await userDeleteRating(ratingId);
      const updatedReviews = allReview.filter(
        (review) => review.ratingId !== ratingId
      );
      setAllReview(updatedReviews);

      message.success("Xóa đánh giá thành công!");
    } catch (error) {
      console.error("Error deleting rating:", error);
      message.error("Có lỗi xảy ra khi xóa đánh giá!");
    } finally {
      setDeletingId(null);
    }
  };

  const EditableStarRating = ({ rating, onRate }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className="text-2xl hover:scale-110 transition-transform cursor-pointer"
          >
            <Star
              size={20}
              className={
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400 hover:text-yellow-200"
              }
            />
          </button>
        ))}
        <span className="ml-2 text-white text-sm">
          {rating > 0 ? `${rating}/5 sao` : "Chưa đánh giá"}
        </span>
      </div>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Star Rating Component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-500"
            }
          />
        ))}
        <span className="ml-2 text-sm text-gray-400">{rating}/5</span>
      </div>
    );
  };

  // Filter and Search
  useEffect(() => {
    let filtered = allReview;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (rating) =>
          rating.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rating.contributedComment
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          rating.reviewer?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Rating filter
    if (filterRating !== "all") {
      filtered = filtered.filter(
        (rating) => rating.rating1 === parseInt(filterRating)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "highest") {
        return b.rating1 - a.rating1;
      } else if (sortBy === "lowest") {
        return a.rating1 - b.rating1;
      }
      return 0;
    });

    setFilteredRatings(filtered);
  }, [allReview, searchTerm, filterRating, sortBy]);

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  const getRatingBg = (rating) => {
    if (rating >= 4) return "bg-green-900/20 border-green-500/30";
    if (rating >= 3) return "bg-yellow-900/20 border-yellow-500/30";
    return "bg-red-900/20 border-red-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Lịch sử đánh giá</h1>
                <p className="text-gray-400 text-sm">
                  {filteredRatings.length} đánh giá tổng cộng
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Filter size={16} />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-800/50 border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm đánh giá..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Rating Filter */}
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả đánh giá</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao</option>
                <option value="3">3 sao</option>
                <option value="2">2 sao</option>
                <option value="1">1 sao</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="highest">Đánh giá cao nhất</option>
                <option value="lowest">Đánh giá thấp nhất</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Đang tải...</span>
          </div>
        ) : filteredRatings.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chưa có đánh giá nào</h3>
            <p className="text-gray-400">
              {searchTerm || filterRating !== "all"
                ? "Không tìm thấy kết quả phù hợp với bộ lọc"
                : "Bạn chưa có đánh giá nào. Hãy tham gia vào các công việc và để lại đánh giá!"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRatings.map((rating) => (
              <div
                key={rating.ratingId}
                className={`p-6 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${getRatingBg(
                  rating.rating1
                )}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {rating.reviewer?.name || "Ẩn danh"}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar size={14} />
                        {formatDate(rating.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <StarRating rating={rating.rating1} />
                      <span
                        className={`text-sm font-medium ${getRatingColor(
                          rating.rating1
                        )}`}
                      >
                        {rating.rating1 >= 4
                          ? "Tuyệt vời"
                          : rating.rating1 >= 3
                          ? "Tốt"
                          : rating.rating1 >= 2
                          ? "Trung bình"
                          : "Kém"}
                      </span>
                    </div>
                  </div>
                </div>

                {rating.comment && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <MessageCircle size={14} />
                      Nhận xét
                    </h4>
                    <p className="text-gray-100 leading-relaxed bg-gray-800/30 p-4 rounded-lg">
                      {rating.comment}
                    </p>
                  </div>
                )}

                {rating.contributedComment &&
                  rating.contributedComment !== "string" && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Edit3 size={14} />
                        Góp ý thêm
                      </h4>
                      <p className="text-gray-100 leading-relaxed bg-gray-800/30 p-4 rounded-lg border-l-4 border-blue-500">
                        {rating.contributedComment}
                      </p>
                    </div>
                  )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>ID: {rating.ratingId.slice(0, 8)}...</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(rating)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit3 size={14} />
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleDelete(rating.ratingId)}
                      disabled={deletingId === rating.ratingId}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      {deletingId === rating.ratingId ? "Đang xóa..." : "Xóa"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingRating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Chỉnh sửa đánh giá</h2>
                <button
                  onClick={() => setEditingRating(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Đánh giá sao:
                  </label>
                  <EditableStarRating
                    rating={editForm.rating1}
                    onRate={(rating) =>
                      setEditForm((prev) => ({ ...prev, rating1: rating }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nhận xét:
                  </label>
                  <textarea
                    value={editForm.comment}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Góp ý thêm:
                  </label>
                  <textarea
                    value={editForm.contributedComment}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        contributedComment: e.target.value,
                      }))
                    }
                    placeholder="Những đóng góp, gợi ý khác..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setEditingRating(null)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateRating}
                  disabled={isSubmitting || editForm.rating1 === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Cập nhật
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RatingHistory;
