import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Eye,
  Edit,
  Trash2,
  Filter,
  SortDesc,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GetByRecruiterIdApi } from "../../services/job";

const RecruiterListPost = () => {
  const [listJob, setListJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await GetByRecruiterIdApi();
        if (res) {
          setListJob(res);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(salary);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDaysAgo = (dateString) => {
    const diffTime = Math.abs(new Date() - new Date(dateString));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredJobs = listJob.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      job.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedJobs = filteredJobs.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.postedAt) - new Date(a.postedAt);
      case "oldest":
        return new Date(a.postedAt) - new Date(b.postedAt);
      case "salary":
        return b.salary - a.salary;
      case "applications":
        return b.applications.length - a.applications.length;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-300 text-lg">
            Đang tải danh sách công việc...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Quản lý tin tuyển dụng
              </h1>
              <p className="text-gray-400 mt-1">
                Tổng cộng {listJob.length} tin đăng tuyển
              </p>
            </div>
            <button
              onClick={() => navigator("/recruiter-create-post")}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Đăng tin mới
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên công việc, vị trí, công ty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="open">Đang tuyển</option>
                <option value="closed">Đã đóng</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>

            <div className="relative">
              <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="salary">Lương cao nhất</option>
                <option value="applications">Nhiều ứng viên nhất</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {sortedJobs.map((job) => (
            <div
              key={job.jobId}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white hover:text-blue-400 cursor-pointer transition-colors">
                          {job.title}
                        </h3>
                        {job.isUrgent && (
                          <span className="inline-flex items-center px-2.5 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Gấp
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 font-medium mb-1">
                        {job.position}
                      </p>
                      <p className="text-gray-400 text-sm mb-3">
                        {job.companyName}
                      </p>
                      <p className="text-gray-300 line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                      {formatSalary(job.salary)}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      {formatDate(job.postedAt)}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-2 text-orange-400" />
                      {job.applications.length} ứng viên
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status === "Open" ? "Đang tuyển" : "Đã đóng"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {getDaysAgo(job.postedAt)} ngày trước
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-6">
                  <button
                    onClick={() => navigator(`/job-detail/${job.jobId}`)}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Xem
                  </button>
                  <button
                    onClick={() => navigator(`/job-applican/${job.jobId}`)}
                    className="flex items-center justify-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Danh sách UV đã ứng tuyển
                  </button>
                  {/* <button
                    onClick={() => {}}
                    className="flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || filterStatus !== "all"
                ? "Không tìm thấy kết quả"
                : "Chưa có tin tuyển dụng nào"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc"
                : "Hãy bắt đầu bằng cách đăng tin tuyển dụng đầu tiên của bạn"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button
                onClick={() => navigator("/create-job")}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Đăng tin tuyển dụng
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterListPost;
