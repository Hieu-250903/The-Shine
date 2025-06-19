import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Building,
  Phone,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { applycationSeftApi } from "../../services/application";

const ApplicationHistory = () => {
  const [listApplication, setListApplication] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedCards, setExpandedCards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await applycationSeftApi();
        if (res) {
          setListApplication(res);
          setFilteredApplications(res);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = listApplication;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.job?.companyName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          app.job?.position?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (app) => app.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, listApplication]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(salary);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "applying":
        return "bg-blue-900/50 text-blue-300 border-blue-700";
      case "reviewed":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-700";
      case "accepted":
        return "bg-green-900/50 text-green-300 border-green-700";
      case "rejected":
        return "bg-red-900/50 text-red-300 border-red-700";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  const toggleExpanded = (applicationId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [applicationId]: !prev[applicationId],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-300">Đang tải lịch sử ứng tuyển...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Lịch Sử Ứng Tuyển
              </h1>
              <p className="text-gray-300">
                Quản lý và theo dõi các đơn ứng tuyển của bạn
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="bg-blue-900/50 border border-blue-700 px-4 py-2 rounded-lg">
                <span className="text-sm text-blue-300 font-medium">
                  Tổng cộng: {filteredApplications.length} đơn
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên công ty, vị trí, chức danh..."
                className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="applying">Đang ứng tuyển</option>
                <option value="reviewed">Đã xem xét</option>
                <option value="accepted">Được chấp nhận</option>
                <option value="rejected">Bị từ chối</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Không tìm thấy đơn ứng tuyển
              </h3>
              <p className="text-gray-400">
                Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div
                key={application.applicationId}
                className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-600"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {application.job?.title || "Chưa có tiêu đề"}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              <span>
                                {application.job?.companyName || "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{application.job?.location || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(application.appliedAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>
                          {application.job?.isUrgent && (
                            <span className="bg-red-900/50 text-red-300 border border-red-700 px-2 py-1 rounded-full text-xs font-medium">
                              Gấp
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Briefcase className="w-4 h-4 text-blue-400" />
                          <span>{application.job?.position || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span>
                            {application.job?.salary
                              ? formatSalary(application.job.salary)
                              : "Thỏa thuận"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span>{application.interviewType || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Phone className="w-4 h-4 text-orange-400" />
                          <span>{application.job?.contactPhone || "N/A"}</span>
                        </div>
                      </div>

                      {/* About section - always visible */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-300 mb-2">
                          Giới thiệu bản thân:
                        </h4>
                        <p className="text-gray-100 text-sm leading-relaxed">
                          {application.about || "Chưa có thông tin"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {expandedCards[application.applicationId] && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-100 mb-3">
                            Chi tiết công việc
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-100">
                                Mô tả:
                              </span>
                              <p className="text-gray-200 mt-1">
                                {application.job?.description || "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-100">
                                Yêu cầu:
                              </span>
                              <p className="text-gray-200 mt-1">
                                {application.job?.requirements || "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-100">
                                Kinh nghiệm:
                              </span>
                              <p className="text-gray-200 mt-1">
                                {application.job?.experience || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100 mb-3">
                            Quyền lợi & Thông tin thêm
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-100">
                                Quyền lợi:
                              </span>
                              <p className="text-gray-200 mt-1">
                                {application.job?.benefits || "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-100">
                                Về bản thân:
                              </span>
                              <p className="text-gray-200 mt-1">
                                {application.aboutMe || "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-100">
                                Ngày đăng:
                              </span>
                              <p className="text-gray-200 mt-1">
                                {application.job?.postedAt
                                  ? formatDate(application.job.postedAt)
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Toggle Button */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <button
                      onClick={() => toggleExpanded(application.applicationId)}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>
                        {expandedCards[application.applicationId]
                          ? "Thu gọn"
                          : "Xem chi tiết"}
                      </span>
                      {expandedCards[application.applicationId] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationHistory;
