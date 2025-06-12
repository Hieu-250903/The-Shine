import { useEffect, useState, useMemo } from "react";
import { getPaymentApi } from "../../services/payment";
import dayjs from "dayjs";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getPaymentApi();
        if (res) {
          setPaymentHistory(res);
        }
      } catch (err) {
        setError("Không thể tải lịch sử thanh toán. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPayments = useMemo(() => {
    if (filterStatus === "ALL") return paymentHistory;
    return paymentHistory.filter((payment) => payment.status === filterStatus);
  }, [paymentHistory, filterStatus]);

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(start, start + itemsPerPage);
  }, [filteredPayments, currentPage]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedRow(null);
  };

  const toggleRow = (paymentId) => {
    setExpandedRow(expandedRow === paymentId ? null : paymentId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "SUCCESS":
        return "bg-green-100 text-green-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-['Inter'] tracking-tight">
          Lịch sử thanh toán
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {["ALL", "SUCCESS", "PENDING", "FAILED"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {status === "ALL" ? "Tất cả" : status}
            </button>
          ))}
          <button
            onClick={() => fetchData()}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Làm mới
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredPayments.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            Không có lịch sử thanh toán.
          </p>
        ) : (
          <div className="overflow-x-auto shadow-xl rounded-lg">
            <table className="w-full table-auto border-collapse bg-gray-800/50 backdrop-blur-sm">
              <thead>
                <tr className="bg-gray-900/80 text-left text-sm uppercase tracking-wider text-gray-300">
                  <th className="p-4 w-16"></th>
                  <th className="p-4">#</th>
                  <th className="p-4">Mã giao dịch</th>
                  <th className="p-4">Số tiền</th>
                  <th className="p-4">Thời gian</th>
                  <th className="p-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.map((payment, index) => (
                  <>
                    <tr
                      key={payment.paymentId}
                      className="border-b border-gray-700 hover:bg-gray-700/50 transition-all cursor-pointer"
                      onClick={() => toggleRow(payment.paymentId)}
                    >
                      <td className="p-4">
                        <button className="focus:outline-none">
                          {expandedRow === payment.paymentId ? (
                            <UpOutlined className="h-5 w-5 text-gray-400" />
                          ) : (
                            <DownOutlined className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="p-4">{payment.transactionId}</td>
                      <td className="p-4 font-mono">
                        {payment.amount.toLocaleString("vi-VN")} VND
                      </td>
                      <td className="p-4">
                        {dayjs(payment.paidAt).format("HH:mm DD/MM/YYYY")}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                    {expandedRow === payment.paymentId && (
                      <tr className="bg-gray-800/30">
                        <td colSpan="6" className="p-4">
                          <div className="text-sm text-gray-300">
                            <p>
                              <strong>Chi tiết:</strong>{" "}
                              {payment.details || "Không có chi tiết bổ sung."}
                            </p>
                            <p>
                              <strong>Mã hóa đơn:</strong> {payment.paymentId}
                            </p>
                            <p>
                              <strong>Ngày tạo:</strong>{" "}
                              {dayjs(
                                payment.createdAt || payment.paidAt
                              ).format("HH:mm DD/MM/YYYY")}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
