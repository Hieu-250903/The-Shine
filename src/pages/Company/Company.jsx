import {
  BookFilled,
  BuildFilled,
  CalendarFilled,
  EditFilled,
  GlobalOutlined,
  PlusCircleFilled,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCompany, createCompany } from "../../services/company";
const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchCompany = async () => {
    const res = await getCompany();
    if (res) {
      setCompanies(res);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, []);

  const onSubmit = async (data) => {
    try {
      handleCloseModal();
      setIsLoading(false);
      const newCompany = {
        name: data.name,
        link: data.link,
      };
      const res = await createCompany(newCompany);
      if (res) {
        await fetchCompany().then(() => setIsLoading(true));
      }
    } catch (error) {
      console.error("Error saving company:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
    reset();
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    reset({
      name: company.companyName,
      link: company.website,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (companyId) => {
    setCompanies((prev) =>
      prev.filter((company) => company.companyId !== companyId)
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <BuildFilled className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Quản lý Công ty
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý thông tin các công ty tuyển dụng
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <PlusCircleFilled className="h-5 w-5" />
              <span>Thêm công ty</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {companies.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-24 w-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
              <BuildFilled className="h-12 w-12 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Chưa có công ty nào
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Bạn chưa có công ty nào trong hệ thống. Hãy tạo công ty đầu tiên
              để bắt đầu tuyển dụng.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <PlusCircleFilled className="h-5 w-5" />
              <span>Tạo công ty đầu tiên</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <div
                key={company.companyId}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      {company.logoFile ? (
                        <img
                          src={company.logoFile}
                          alt="Logo"
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <BuildFilled className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(company)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <EditFilled className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(company.companyId)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TransactionOutlined className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {company.companyName}
                      </h3>
                      {company.website && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <GlobalOutlined className="h-4 w-4 mr-2" />
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-600 transition-colors truncate"
                          >
                            {company.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-gray-500 text-sm">
                      <CalendarFilled className="h-4 w-4 mr-2" />
                      <span>Tạo ngày {formatDate(company.createdAt)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <BookFilled className="h-4 w-4 text-indigo-500" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {company.jobs?.length || 0}
                        </div>
                        <div className="text-xs text-gray-500">Việc làm</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <UserOutlined className="h-4 w-4 text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-500">Ứng viên</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCompany ? "Chỉnh sửa công ty" : "Tạo công ty mới"}
              </h2>
              <p className="text-gray-600 mt-2">
                {editingCompany
                  ? "Cập nhật thông tin công ty"
                  : "Điền thông tin để tạo công ty mới"}
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên công ty *
                </label>
                <input
                  {...register("name", {
                    required: "Vui lòng nhập tên công ty",
                  })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Nhập tên công ty"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website
                </label>
                <input
                  {...register("link", {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message:
                        "Vui lòng nhập URL hợp lệ (bắt đầu với http:// hoặc https://)",
                    },
                  })}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="https://example.com"
                />
                {errors.link && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.link.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  )}
                  <span>{editingCompany ? "Cập nhật" : "Tạo công ty"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
