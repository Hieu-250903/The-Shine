import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPaymentChartDataApi } from "../../services/payment";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PaymentChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("month");
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(7); // Adjusted to include "2025-07"
  const [startYear, setStartYear] = useState(2025);
  const [endYear, setEndYear] = useState(2025);
  const [startDate, setStartDate] = useState(new Date(2025, 0, 1)); // January 1, 2025
  const [endDate, setEndDate] = useState(new Date(2025, 6, 1));    // July 1, 2025

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = [2024, 2025, 2026];

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const chartParams = {
          dayOrMonth: filterType,
          startMonth: filterType === "day" ? (startDate?.getMonth() + 1 || 1) : startMonth,
          startYear: filterType === "day" ? (startDate?.getFullYear() || 2025) : startYear,
          startDay: filterType === "day" ? (startDate?.getDate() || 1) : 1,
          endMonth: filterType === "day" ? (endDate?.getMonth() + 1 || 7) : endMonth,
          endYear: filterType === "day" ? (endDate?.getFullYear() || 2025) : endYear,
          endDay: filterType === "day" ? (endDate?.getDate() || 1) : 1,
        };
        console.log("Chart Params:", JSON.stringify(chartParams, null, 2));
        const response = await getPaymentChartDataApi(chartParams);
        console.log("Full API Response:", JSON.stringify(response, null, 2)); // Log full response

        let data = [];
        if (Array.isArray(response)) {
          data = response; // Handle plain array response
        } else if (response && response.data) {
          data = Array.isArray(response.data) ? response.data : [];
        } else if (response && response.result) {
          data = Array.isArray(response.result) ? response.result : [];
        } else {
          console.warn("No recognizable data structure in response:", JSON.stringify(response));
          data = [];
        }

        let completeData = [];

        if (filterType === "month") {
          const start = new Date(startYear, startMonth - 1, 1);
          const end = new Date(endYear, endMonth, 0);
          for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
            const time = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            let item;
            const exactMatch = data.find((item) => item.time === time);
            if (exactMatch) {
              console.log(`Matched ${time} with ${JSON.stringify(exactMatch)}`);
              item = exactMatch;
            } else {
              console.log(`No exact match for ${time}, defaulting to { time, totalAmount: 0 }`);
              item = { time, totalAmount: 0 };
            }
            completeData.push(item);
          }
        } else {
          for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const time = d.toISOString().split('T')[0];
            const item = data.find((item) => item.time === time) || { time, totalAmount: 0 };
            completeData.push(item);
          }
        }

        console.log("Complete Data:", JSON.stringify(completeData, null, 2)); // Debug: Log complete data
        setChartData({
          labels: completeData.map((item) => item.time),
          datasets: [
            {
              label: "Total Amount",
              data: completeData.map((item) => item.totalAmount || 0),
              fill: false,
              borderColor: "#4D96FF",
              backgroundColor: "#4D96FF",
              tension: 0.1,
            },
          ],
        });
        console.log("Chart Data:", JSON.stringify(chartData, null, 2)); // Debug: Log chart data
      } catch (error) {
        console.error("API Error:", error.response ? error.response : error.message);
        setError("Không thể tải dữ liệu biểu đồ thanh toán!");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [filterType, startMonth, endMonth, startYear, endYear, startDate, endDate]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff" },
      },
      title: {
        display: true,
        text: "Thanh toán theo thời gian",
        color: "#fff",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            console.log("Tooltip Parsed Value:", context.parsed.y);
            return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Thời gian", color: "#fff" },
        ticks: { color: "#fff" },
      },
      y: {
        title: { display: true, text: "Tổng số tiền (VND)", color: "#fff" },
        ticks: {
          color: "#fff",
          beginAtZero: true,
          callback: (value) => formatCurrency(value),
        },
      },
    },
  };

  const displayChartData = chartData || {
    labels: [],
    datasets: [{ label: "Total Amount", data: [], borderColor: "#4D96FF", backgroundColor: "#4D96FF", tension: 0.1 }],
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div>
            <label className="mr-2">Lọc theo:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="month">Tháng</option>
              <option value="day">Ngày</option>
            </select>
          </div>
          <div className="flex gap-4">
            {filterType === "month" ? (
              <>
                <div>
                  <label className="mr-2">Năm bắt đầu:</label>
                  <select
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mr-2">Tháng bắt đầu:</label>
                  <select
                    value={startMonth}
                    onChange={(e) => setStartMonth(Number(e.target.value))}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mr-2">Năm kết thúc:</label>
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mr-2">Tháng kết thúc:</label>
                  <select
                    value={endMonth}
                    onChange={(e) => setEndMonth(Number(e.target.value))}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="mr-2">Ngày bắt đầu:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => date && setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholderText="Chọn ngày bắt đầu"
                    minDate={new Date(2025, 0, 1)}
                    maxDate={new Date(2026, 0, 1)}
                  />
                </div>
                <div>
                  <label className="mr-2">Ngày kết thúc:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => date && setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholderText="Chọn ngày kết thúc"
                    minDate={startDate}
                    maxDate={new Date(2026, 0, 1)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Biểu đồ thanh toán</h2>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Đang tải...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="h-64">
            <Line data={displayChartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentChart;