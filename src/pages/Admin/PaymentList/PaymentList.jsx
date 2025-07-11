import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  DollarOutlined,
  ExportOutlined,
  EyeOutlined,
  FileTextOutlined,
  FilterOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getPaymentApi } from "../../../services/payment";

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPaymentApi();
      if (res) {
        setPaymentList(res);
        setFilteredPayments(res);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = paymentList;

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.transactionId
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.paymentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.applicationId
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, paymentList]);

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-900 text-green-300 border-green-700";
      case "PENDING":
        return "bg-yellow-900 text-yellow-300 border-yellow-700";
      case "FAILED":
        return "bg-red-900 text-red-300 border-red-700";
      case "CANCELLED":
        return "bg-gray-700 text-gray-300 border-gray-600";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircleOutlined />;
      case "PENDING":
        return <ClockCircleOutlined />;
      case "FAILED":
        return <CloseCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "COMPLETED":
        return "Hoàn thành";
      case "PENDING":
        return "Đang xử lý";
      case "FAILED":
        return "Thất bại";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate statistics
  const stats = {
    total: filteredPayments.length,
    completed: filteredPayments.filter((p) => p.status === "COMPLETED").length,
    pending: filteredPayments.filter((p) => p.status === "PENDING").length,
    failed: filteredPayments.filter((p) => p.status === "FAILED").length,
    totalAmount: filteredPayments
      .filter((p) => p.status === "COMPLETED")
      .reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <CreditCardOutlined className="text-2xl text-blue-400 mr-2" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Quản lý thanh toán</h1>
                <p className="text-gray-300 text-sm md:text-base">Theo dõi và quản lý tất cả các giao dịch thanh toán trong hệ thống</p>
              </div>
            </div>
            <button
              onClick={fetchData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md self-start md:self-auto"
            >
              <ReloadOutlined />
              Làm mới
            </button>
          </div>

          {/* Statistics Cards */}
          {/* XÓA toàn bộ đoạn grid thống kê này */}

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã giao dịch, ID thanh toán, ID ứng dụng..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    className="pl-10 pr-8 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[180px]"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="PAID">Hoàn thành</option>
                    <option value="PENDING">Đang xử lý</option>
                    <option value="CANCEL">Đã hủy</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment List */}
        {loading ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <ClockCircleOutlined className="text-6xl text-gray-500 mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Đang tải dữ liệu...
            </h3>
            <p className="text-gray-400">Vui lòng đợi trong giây lát</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <CreditCardOutlined className="text-6xl text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Không có giao dịch nào
            </h3>
            <p className="text-gray-400">
              {paymentList.length === 0
                ? "Chưa có giao dịch thanh toán nào trong hệ thống"
                : "Không tìm thấy giao dịch phù hợp với bộ lọc hiện tại"}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700 border-b border-gray-600">
                    <tr>
                      <th className="text-left p-4 text-gray-300 font-medium">Mã giao dịch</th>
                      {/* <th className="text-left p-4 text-gray-300 font-medium">
                        ID Ứng dụng
                      </th> */}
                      <th className="text-center p-4 text-gray-300 font-medium">Số tiền</th>
                      <th className="text-center p-4 text-gray-300 font-medium">Trạng thái</th>
                      <th className="text-center p-4 text-gray-300 font-medium">Thời gian</th>
                      {/* Xóa cột Hành động */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment, idx) => (
                      <tr
                        key={payment.paymentId}
                        className={`border-b border-gray-700 hover:bg-gray-750 transition-colors ${idx === filteredPayments.length - 1 ? 'last:rounded-b-xl' : ''}`}
                      >
                        <td className="p-4">
                          <div>
                            <p className="text-white font-medium">
                              {payment.transactionId}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {payment.paymentId.substring(0, 8)}...
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center align-middle">
                          <span className="text-gray-200 font-semibold">
                            {payment.applicationId || <span className="text-gray-400">N/A</span>}
                          </span>
                        </td>
                        <td className="p-4 text-center align-middle">
                          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}
                            style={{minWidth: '110px'}}>
                            {getStatusIcon(payment.status)}
                            <span className="ml-1">{getStatusText(payment.status)}</span>
                          </span>
                        </td>
                        <td className="p-4 text-center align-middle">
                          <div className="flex items-center justify-center text-gray-400 text-sm gap-1">
                            <CalendarOutlined />
                            <span>{formatDate(payment.paidAt)}</span>
                          </div>
                        </td>
                        {/* Xóa nút Chi tiết */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:hidden space-y-4">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.paymentId}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-semibold">
                        {payment.transactionId}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {payment.paymentId.substring(0, 16)}...
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">
                        {getStatusText(payment.status)}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Số tiền:</span>
                      <span className="text-green-400 font-semibold">
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ID Ứng dụng:</span>
                      <span className="text-gray-300">
                        {payment.applicationId || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Thời gian:</span>
                      <span className="text-gray-300">
                        {formatDate(payment.paidAt)}
                      </span>
                    </div>
                  </div>
                  {/* Xóa nút Xem chi tiết */}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Xóa toàn bộ phần selectedPayment và modal chi tiết */}
      </div>
    </div>
  );
};

export default PaymentList;
