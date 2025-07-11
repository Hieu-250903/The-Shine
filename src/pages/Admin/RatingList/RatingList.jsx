import {
  Award,
  BarChart3,
  Calendar,
  Eye,
  Filter,
  MessageCircle,
  RefreshCw,
  Search,
  Star,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllRating, userDeleteRating } from "../../../services/rate";

const RatingList = () => {
  const [allRating, setAllRating] = useState([]);
  const [filteredRating, setFilteredRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllRating();
      if (res) {
        setAllRating(res);
        setFilteredRating(res);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
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

  // Star Rating Display
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-500"
            }
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  // Filter and Search
  useEffect(() => {
    let filtered = allRating;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (rating) =>
          rating.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rating.contributedComment
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          rating.ratingId.toLowerCase().includes(searchTerm.toLowerCase())
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

    setFilteredRating(filtered);
  }, [allRating, searchTerm, filterRating, sortBy]);

  // Calculate statistics
  const stats = {
    total: allRating.length,
    average:
      allRating.length > 0
        ? (
            allRating.reduce((sum, r) => sum + r.rating1, 0) / allRating.length
          ).toFixed(1)
        : 0,
    fiveStars: allRating.filter((r) => r.rating1 === 5).length,
    oneStars: allRating.filter((r) => r.rating1 === 1).length,
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  const getRatingBadgeColor = (rating) => {
    if (rating >= 4)
      return "bg-green-900/30 text-green-400 border-green-500/30";
    if (rating >= 3)
      return "bg-yellow-900/30 text-yellow-400 border-yellow-500/30";
    return "bg-red-900/30 text-red-400 border-red-500/30";
  };

  // Handle delete
  const handleDelete = async (ratingId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) return;

    setDeletingId(ratingId);
    try {
      await userDeleteRating(ratingId);
      const updatedRatings = allRating.filter(
        (rating) => rating.ratingId !== ratingId
      );
      setAllRating(updatedRatings);
      alert("Xóa đánh giá thành công!");
    } catch (error) {
      console.error("Error deleting rating:", error);
      alert("Có lỗi xảy ra khi xóa đánh giá!");
    } finally {
      setDeletingId(null);
    }
  };

  // View detail
  const handleViewDetail = (rating) => {
    setSelectedRating(rating);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Quản Lý Đánh Giá
              </h1>
              <p className="text-gray-400 mt-2">
                Theo dõi và quản lý tất cả đánh giá từ người dùng
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Làm mới
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <BarChart3 className="text-blue-400" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tổng đánh giá</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-600/20 rounded-lg">
                  <TrendingUp className="text-yellow-400" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Điểm trung bình</p>
                  <p className="text-2xl font-bold">{stats.average}/5</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-600/20 rounded-lg">
                  <Award className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">5 sao</p>
                  <p className="text-2xl font-bold">{stats.fiveStars}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-600/20 rounded-lg">
                  <Users className="text-red-400" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">1 sao</p>
                  <p className="text-2xl font-bold">{stats.oneStars}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Bộ lọc & Tìm kiếm</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-blue-400 hover:text-blue-300"
            >
              <Filter size={16} />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo nội dung, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

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
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Đang tải dữ liệu...</span>
          </div>
        ) : filteredRating.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
            <MessageCircle size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Không có dữ liệu</h3>
            <p className="text-gray-400">
              {searchTerm || filterRating !== "all"
                ? "Không tìm thấy kết quả phù hợp với bộ lọc"
                : "Chưa có đánh giá nào trong hệ thống"}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-t-xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 font-semibold text-gray-300 border-b border-gray-700">
                <div className="col-span-2">ID Đánh Giá</div>
                <div className="col-span-1">Sao</div>
                <div className="col-span-3">Nội dung</div>
                <div className="col-span-2">Góp ý</div>
                <div className="col-span-2">Thời gian</div>
                <div className="col-span-2">Thao tác</div>
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm border-l border-r border-b border-gray-700 rounded-b-xl">
              {filteredRating.map((rating, index) => (
                <div
                  key={rating.ratingId}
                  className={`grid grid-cols-12 gap-4 p-4 hover:bg-gray-700/30 transition-colors ${
                    index !== filteredRating.length - 1
                      ? "border-b border-gray-700/50"
                      : ""
                  }`}
                >
                  <div className="col-span-2">
                    <span className="text-sm font-mono text-blue-400">
                      {rating.ratingId.slice(0, 8)}...
                    </span>
                  </div>

                  <div className="col-span-1">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${getRatingBadgeColor(
                        rating.rating1
                      )}`}
                    >
                      <Star size={12} className="fill-current" />
                      {rating.rating1}
                    </div>
                  </div>

                  <div className="col-span-3">
                    <p
                      className="text-sm text-gray-300 truncate"
                      title={rating.comment}
                    >
                      {rating.comment || "Không có nội dung"}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p
                      className="text-sm text-gray-400 truncate"
                      title={rating.contributedComment}
                    >
                      {rating.contributedComment || "Không có góp ý"}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar size={12} />
                      {formatDate(rating.createdAt)}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetail(rating)}
                        className="p-1.5 text-blue-400 hover:bg-blue-900/20 rounded transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(rating.ratingId)}
                        disabled={deletingId === rating.ratingId}
                        className="p-1.5 text-red-400 hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                        title="Xóa"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center text-sm text-gray-400">
              Hiển thị {filteredRating.length} trên tổng số {allRating.length}{" "}
              đánh giá
            </div>
          </>
        )}

        {showDetailModal && selectedRating && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Chi tiết đánh giá</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        ID Đánh Giá
                      </label>
                      <p className="font-mono text-sm text-blue-400">
                        {selectedRating.ratingId}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Reviewer ID
                      </label>
                      <p className="font-mono text-sm text-purple-400">
                        {selectedRating.reviewerId}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Đánh giá
                    </label>
                    <StarRating rating={selectedRating.rating1} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Nội dung đánh giá
                    </label>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-gray-200">
                        {selectedRating.comment || "Không có nội dung"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Thời gian tạo
                    </label>
                    <p className="text-gray-200">
                      {formatDate(selectedRating.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={() => handleDelete(selectedRating.ratingId)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Xóa đánh giá này
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingList;
