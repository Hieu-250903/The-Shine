import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getPieChart1, getPieChart2 } from "../../services/rate"; // Import API functions

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const RatingPieCharts = () => {
  const [pieChart1Data, setPieChart1Data] = useState(null);
  const [pieChart2Data, setPieChart2Data] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      setLoading(true);
      try {
        const [res1, res2] = await Promise.all([getPieChart1(), getPieChart2()]);
        console.log("Response 1:", res1);
        console.log("Response 2:", res2);

        const processChartData = (response) => {
          // Check if response.data exists and is an array, otherwise use response directly
          const data = Array.isArray(response.data) ? response.data : response;
          if (!Array.isArray(data)) {
            console.warn("Invalid data format:", data);
            return {
              labels: [],
              datasets: [{ data: [], backgroundColor: [], hoverOffset: 20 }],
            };
          }
          return {
            labels: data.map((item) => `${item.star} Sao`),
            datasets: [
              {
                data: data.map((item) => item.percentage || 0),
                backgroundColor: [
                  "#FF6B6B", // 1 Star
                  "#FFD93D", // 2 Star
                  "#6BCB77", // 3 Star
                  "#4D96FF", // 4 Star
                  "#9B59B6", // 5 Star
                ],
                hoverOffset: 20,
              },
            ],
          };
        };

        setPieChart1Data(processChartData(res1));
        setPieChart2Data(processChartData(res2));
      } catch (error) {
        if (error.response) {
          console.error("Server responded with error:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
        setError("Không thể tải dữ liệu biểu đồ!");
      } finally {
        setLoading(false);
      }
    };

    fetchPieChartData();
  }, []);

  const chartOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: { font: { size: 12 }, color: "#fff" },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const percentage = context.parsed;
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Phân bố đánh giá
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4 text-center">
              Biểu đồ đánh giá 1
            </h3>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-400">Đang tải...</span>
              </div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : (
              <div className="h-64">
                <Pie data={pieChart1Data} options={chartOptions} />
              </div>
            )}
          </div>
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4 text-center">
              Biểu đồ đánh giá 2
            </h3>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-400">Đang tải...</span>
              </div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : (
              <div className="h-64">
                <Pie data={pieChart2Data} options={chartOptions} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPieCharts;