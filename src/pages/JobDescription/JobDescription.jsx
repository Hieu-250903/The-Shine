import jobListBackground from "../../assets/iamges/jobListbackground.jpg";
import { LeftOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageLoading } from "../../components/Loading/Loading";

// Mock job data
const mockJobsData = [
  {
    id: 1,
    position: "Nhân viên thiết kế đồ họa",
    type: "Part time/ Freelancer",
    location: "Làm việc tại nhà hoặc tại văn phòng (Hồ Chí Minh)",
    description: [
      "Thiết kế brochure, banner, poster theo yêu cầu của Khách hàng.",
      "Sáng tạo nội dung đồ họa cho mạng xã hội, website, và nhiều lĩnh vực đa dạng.",
      "Chỉnh sửa, tối ưu hình ảnh để phù hợp với nhiều định dạng khác.",
      "Phối hợp với team marketing để triển khai các dự án.",
    ],
    requirements: [
      "Thành thạo Photoshop, Illustrator (Biết Figma là lợi thế).",
      "Có tư duy mỹ thuật, sáng tạo, nắm bắt xu hướng thiết kế.",
      "Có kinh nghiệm làm việc hoặc sản phẩm thực tế từ các dạng công việc.",
      "Tư duy giải quyết các vấn đề nhanh chóng và sáng tạo.",
    ],
    benefits: [
      "Thu nhập: 8-10 triệu/tháng (hoặc tính theo sản phẩm).",
      "Làm việc linh hoạt, có hỗ trợ tại xa.",
      "Môi trường sáng tạo, năng động, là nơi phát triển kỹ năng.",
      "Có hồ sơ làm các dự án lớn, xây dựng portfolio chuyên nghiệp.",
    ],
  },
  {
    id: 2,
    position: "Lập trình viên Frontend",
    type: "Full time",
    location: "Văn phòng (Hồ Chí Minh)",
    description: [
      "Phát triển giao diện người dùng cho các ứng dụng web.",
      "Tối ưu hóa hiệu suất và tương thích trên các trình duyệt.",
      "Làm việc với RESTful API và thư viện frontend hiện đại.",
      "Cộng tác với đội ngũ Backend để triển khai các tính năng mới.",
    ],
    requirements: [
      "Thành thạo HTML5, CSS3, JavaScript/TypeScript.",
      "Kinh nghiệm với React, Vue hoặc Angular (tối thiểu 2 năm).",
      "Hiểu biết về responsive design và UX/UI.",
      "Có khả năng làm việc trong môi trường Agile/Scrum.",
    ],
    benefits: [
      "Thu nhập: 15-25 triệu/tháng (tùy năng lực).",
      "Chế độ bảo hiểm đầy đủ theo quy định.",
      "13 tháng lương và thưởng theo hiệu suất.",
      "Cơ hội đào tạo và phát triển chuyên môn.",
    ],
  },
];

// Simulate API call with delay
const fetchJobById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const job = mockJobsData.find((job) => job.id === parseInt(id));
      resolve(job || mockJobsData[0]); // Default to first job if not found
    }, 500); // Simulate 500ms network delay
  });
};

const JobDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchJobById(id || 1)
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <PageLoading />;
  }

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
            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">VỊ TRÍ</h2>
                <p className="text-white text-sm">{job.position}</p>
              </div>
            </div>

            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">HÌNH THỨC</h2>
                <p className="text-white text-sm">{job.type}</p>
              </div>
            </div>

            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">ĐỊA ĐIỂM</h2>
                <p className="text-white text-sm">{job.location}</p>
              </div>
            </div>

            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">MÔ TẢ CÔNG VIỆC</h2>
                {job.description.map((item, index) => (
                  <p key={`desc-${index}`} className="text-white text-sm mb-2">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex mb-8">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">YÊU CẦU</h2>
                {job.requirements.map((item, index) => (
                  <p key={`req-${index}`} className="text-white text-sm mb-2">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex mb-12">
              <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <h2 className="text-white font-bold mb-1">QUYỀN LỢI</h2>
                {job.benefits.map((item, index) => (
                  <p key={`ben-${index}`} className="text-white text-sm mb-2">
                    {item}
                  </p>
                ))}
              </div>
            </div>

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
