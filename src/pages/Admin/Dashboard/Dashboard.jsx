import React, { useEffect, useState } from "react";
import { getPaymentApi, getTotalPayment } from "../../../services/payment";
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
  const [totalPaymnt, setTotalPayment] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getPaymentApi();
        const resTotal = await getTotalPayment();

        if (res) setPayments(res);
        if (resTotal) setTotalPayment(resTotal);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Thống kê
  const completed = payments.filter((p) => p.status === "PAID");
  const pending = payments.filter((p) => p.status === "PENDING");
  const failed = payments.filter((p) => p.status === "CANCEL");

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "-";

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <DollarOutlined className="text-blue-400" /> Dashboard Doanh thu ứng
          viên
        </h1>
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(totalPaymnt)}
              </p>
            </div>
            <DollarOutlined className="text-2xl text-green-400" />
          </div>
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-400">
                {completed.length}
              </p>
            </div>
            <CheckCircleOutlined className="text-2xl text-green-400" />
          </div>
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-400">
                {pending.length}
              </p>
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

        <PaymentChart />
        <RatingPieCharts />
      </div>
    </div>
  );
};

export default Dashboard;
