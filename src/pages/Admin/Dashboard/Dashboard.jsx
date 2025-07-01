import React, { useEffect, useState } from "react";
import { getPaymentApi } from "../../../services/payment";
import {
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import PaymentChart from "../../../components/Charts/PaymentChart";
import RatingPieCharts from "../../../components/Charts/PieChart";
const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getPaymentApi();
        if (res) setPayments(res);
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Thống kê
  const completed = payments.filter((p) => p.status === "COMPLETED");
  const pending = payments.filter((p) => p.status === "PENDING");
  const failed = payments.filter((p) => p.status === "FAILED");
  const totalRevenue = completed.reduce((sum, p) => sum + (p.amount || 0), 0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  const formatDate = (date) =>
    date ? new Date(date).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }) : "-";

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <DollarOutlined className="text-blue-400" /> Dashboard Doanh thu ứng viên
        </h1>
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(totalRevenue)}</p>
            </div>
            <DollarOutlined className="text-2xl text-green-400" />
          </div>
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-400">{completed.length}</p>
            </div>
            <CheckCircleOutlined className="text-2xl text-green-400" />
          </div>
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-400">{pending.length}</p>
            </div>
            <ClockCircleOutlined className="text-2xl text-yellow-400" />
          </div>
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Thất bại</p>
              <p className="text-2xl font-bold text-red-400">{failed.length}</p>
            </div>
            <CloseCircleOutlined className="text-2xl text-red-400" />
          </div>
        </div>
        {/* Bảng giao dịch gần đây */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileTextOutlined className="text-blue-400" /> Giao dịch gần đây
          </h2>
          {loading ? (
            <div className="text-gray-400">Đang tải dữ liệu...</div>
          ) : payments.length === 0 ? (
            <div className="text-gray-400">Không có giao dịch nào.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="p-3">Mã giao dịch</th>
                    <th className="p-3">Số tiền</th>
                    <th className="p-3">Thời gian</th>
                    <th className="p-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.slice(0, 10).map((p) => (
                    <tr key={p.paymentId} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="p-3 font-mono">{p.transactionId}</td>
                      <td className="p-3 text-green-400">{formatCurrency(p.amount)}</td>
                      <td className="p-3">{formatDate(p.paidAt)}</td>
                      <td className="p-3">
                        {p.status === "COMPLETED" && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-300 border border-green-700">Hoàn thành</span>
                        )}
                        {p.status === "PENDING" && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-900 text-yellow-300 border border-yellow-700">Đang xử lý</span>
                        )}
                        {p.status === "FAILED" && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-900 text-red-300 border border-red-700">Thất bại</span>
                        )}
                        {p.status === "CANCELLED" && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-700 text-gray-300 border border-gray-600">Đã hủy</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <PaymentChart />
        <RatingPieCharts />
      </div>
    </div>
  );
};

export default Dashboard;
