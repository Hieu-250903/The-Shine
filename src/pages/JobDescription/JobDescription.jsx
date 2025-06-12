import jobListBackground from "../../assets/iamges/jobListbackground.jpg";
import { LeftOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageLoading } from "../../components/Loading/Loading";
import { getJobByIdApi } from "../../services/job";

const JobDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      setLoading(true);
      try {
        const res = await getJobByIdApi(id);
        if (res) {
          setJobDetail(res);
        }
      } catch (error) {
        console.error("Error fetching job detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetail();
  }, [id]);

  if (loading) {
    return <PageLoading />;
  }

  const {
    position,
    type,
    location,
    description,
    jobDetails,
    requirements,
    benefits,
    salary,
    contactPhone,
  } = jobDetail;

  const renderList = (text, prefix) => {
    if (!text) return null;
    return text
      .split(/[\n\r]+|\. +/)
      .filter(Boolean)
      .map((item, index) => (
        <p key={`${prefix}-${index}`} className="text-white text-sm mb-2">
          {item.trim()}
        </p>
      ));
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${jobListBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[rgba(0,0,0,.4)] pb-6">
        <h1 className="text-4xl font-bold text-white text-center py-16">
          CHI TIẾT CÔNG VIỆC
        </h1>
        <div className="w-4xl shadow-2xl bg-[rgba(0,0,0,.7)] mx-auto rounded-md py-8">
          <div className="max-w-3xl mx-auto">
            {/* Position */}
            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">VỊ TRÍ</h2>
                <p className="text-white text-sm">{position || "Chưa có"}</p>
              </div>
            </div>

            {/* Type */}
            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">HÌNH THỨC</h2>
                <p className="text-white text-sm">{type || "Chưa rõ"}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">ĐỊA ĐIỂM</h2>
                <p className="text-white text-sm">{location || "Không có"}</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">MÔ TẢ CÔNG VIỆC</h2>
                {renderList(description || jobDetails, "desc")}
              </div>
            </div>

            {/* Requirements */}
            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">YÊU CẦU</h2>
                {renderList(requirements, "req")}
              </div>
            </div>

            {/* Benefits */}
            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">QUYỀN LỢI</h2>
                {renderList(benefits, "ben")}
              </div>
            </div>

            {/* Salary */}
            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">MỨC LƯƠNG</h2>
                <p className="text-white text-sm">
                  {salary ? `${salary.toLocaleString()} VND` : "Thỏa thuận"}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex mb-12">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">LIÊN HỆ</h2>
                <p className="text-white text-sm">
                  SĐT: {contactPhone || "Chưa cung cấp"}
                </p>
              </div>
            </div>

            {/* Back button */}
            <div className="flex justify-center cursor-pointer">
              <button
                onClick={() => navigate(-1)}
                className="bg-white text-blue-900 py-3 px-6 flex items-center cursor-pointer hover:bg-slate-200 rounded-sm"
              >
                <LeftOutlined className="mr-4" />
                QUAY LẠI BÀI ĐĂNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
