import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  MapPin,
  Briefcase,
  Eye,
  Mail,
  Phone,
  ArrowLeft,
  Filter,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { getApplicanJob } from "../../services/application";
import { useNavigate, useParams } from "react-router-dom";

const RecruiterJobApplican = () => {
  const [listApplican, setListApplican] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        setLoading(true);
        const res = await getApplicanJob(id);
        if (res) {
          setListApplican(res);
          setFilteredApplicants(res);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData(id);
  }, [id]);

  useEffect(() => {
    let filtered = listApplican;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.candidate?.user?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          app.candidate?.user?.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplicants(filtered);
  }, [searchTerm, statusFilter, listApplican]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Applying":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "Reviewing":
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      case "Accepted":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Applying":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Reviewing":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Accepted":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 mt-4">Đang tải danh sách ứng viên...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </button>
              <div className="h-6 w-px bg-gray-600"></div>
              <h1 className="text-xl font-semibold">Danh sách ứng viên</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <User className="w-4 h-4" />
              <span>{filteredApplicants.length} ứng viên</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Applying">Đang ứng tuyển</option>
              <option value="Reviewing">Đang xem xét</option>
              <option value="Accepted">Đã chấp nhận</option>
              <option value="Rejected">Đã từ chối</option>
            </select>
          </div>
        </div>

        {filteredApplicants.length === 0 ? (
          <div className="text-center py-16">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">
              Không có ứng viên nào
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "All"
                ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                : "Chưa có ứng viên nào ứng tuyển cho vị trí này"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredApplicants.map((application) => (
              <div
                key={application.applicationId}
                className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={
                            application.candidate?.user?.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              application.candidate?.user?.name || "Unknown"
                            )}&background=3b82f6&color=ffffff&size=60`
                          }
                          alt={application.candidate?.user?.name}
                          className="w-15 h-15 rounded-full object-cover ring-2 ring-gray-700"
                        />
                        {application.candidate?.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {application.candidate?.featured && (
                          <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                            <span className="text-xs text-white">★</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {application.candidate?.user?.name ||
                              "Không có tên"}
                          </h3>
                          <div
                            className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {getStatusIcon(application.status)}
                            <span>{application.status}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{application.candidate?.user?.email}</span>
                          </div>
                          {application.candidate?.user?.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>{application.candidate?.user?.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Ứng tuyển: {formatDate(application.appliedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-750 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-gray-300">
                          Học vấn
                        </span>
                      </div>
                      <p className="text-white">
                        {application.candidate?.education || "Chưa cập nhật"}
                      </p>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-gray-300">
                          Mức lương mong muốn
                        </span>
                      </div>
                      <p className="text-white">
                        {application.candidate?.incomeRange || "Chưa cập nhật"}
                      </p>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-gray-300">
                          Hình thức phỏng vấn
                        </span>
                      </div>
                      <p className="text-white">
                        {application.interviewType || "Chưa xác định"}
                      </p>
                    </div>
                  </div>

                  {application.candidate?.workHistories &&
                    application.candidate.workHistories.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-300 mb-3">
                          Kinh nghiệm làm việc
                        </h4>
                        <div className="space-y-2">
                          {application.candidate.workHistories.map(
                            (work, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-gray-750 rounded-lg p-3"
                              >
                                <div>
                                  <p className="text-white font-medium">
                                    {work.position}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    {work.company}
                                  </p>
                                </div>
                                <span className="text-sm text-gray-400">
                                  {work.duration}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  <div className="space-y-4">
                    {application.about && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Giới thiệu về công việc
                        </h4>
                        <p className="text-gray-300 bg-gray-750 rounded-lg p-4">
                          {application.about}
                        </p>
                      </div>
                    )}
                    {application.aboutMe && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Giới thiệu bản thân
                        </h4>
                        <p className="text-gray-300 bg-gray-750 rounded-lg p-4">
                          {application.aboutMe}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterJobApplican;
