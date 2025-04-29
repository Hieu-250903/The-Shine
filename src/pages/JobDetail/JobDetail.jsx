import jobListbackground from "../../assets/iamges/jobListbackground.jpg";
import {
  CommentOutlined,
  LeftOutlined,
  LikeOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const applications = [
    {
      name: "Nguyễn Trọng A",
      rating: 4,
      comment: "Rất tốt",
      date: "03 - 07 - 2025",
    },
    {
      name: "Hồ Tấn B",
      rating: 3,
      comment: "Tạm được",
      date: "26 - 03 - 2025",
    },
    {
      name: "Nguyễn Ngọc C",
      rating: 5,
      comment: "Tuyệt",
      date: "04 - 01 - 2025",
    },
  ];

  const timeline = [
    {
      date: "03 - 07 - 2025",
      content: "Được tuyển thành nhân viên hỗ trợ sự kiện tại Công ty X.",
    },
    {
      date: "12 - 06 - 2025",
      content: "Được book làm thiết kế poster quảng cáo cho Nhà hàng Y.",
    },
    {
      date: "26 - 05 - 2025",
      content: "Tham gia dự án xây dựng hệ thống ngân hàng tại Công ty Z.",
    },
    {
      date: "13 - 04 - 2025",
      content: "Hoàn thành chuyên đề phát triển sản phẩm cho Cửa hàng A.",
    },
    {
      date: "10 - 02 - 2025",
      content: "Được tuyển dụng làm trợ lý bán hàng theo ca tại Shop B.",
    },
  ];

  return (
    <div
      className="text-white"
      style={{
        backgroundImage: `url(${jobListbackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[rgba(0,0,0,.4)] pb-6">
        <div className="flex items-center gap-2 cursor-pointer text-sm font-semibold hover:text-gray-400 pt-4 pl-10">
          <LeftOutlined />
          <span>QUAY LẠI</span>
        </div>
        <div className="flex items-start gap-10 mt-4">
          <div className="flex flex-col p-2 px-8">
            <div className="relative">
              <img
                src="https://i.pinimg.com/736x/5a/89/6d/5a896d18e2916972896bca216120bc38.jpg"
                alt="TLC Corp"
                className="rounded-lg object-cover w-[500px] h-[600px]"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Rate value={4} className="!flex !flex-col !text-3xl" />
              </div>
              <div className="text-4xl font-bold uppercase text-center absolute bottom-2 right-1/2 translate-x-[50%]">
                TLC Corp
              </div>
            </div>
            <button
              onClick={() => navigator(`/job-application/${id}`)}
              className="mt-6 bg-white text-black font-bold text-xl px-10 py-4 cursor-pointer rounded-xl hover:bg-gray-200"
            >
              ỨNG TUYỂN
            </button>
          </div>

          <div className="space-y-8 mt-12">
            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                Giới thiệu công việc
              </h2>
              <p className="text-sm leading-relaxed text-gray-300">
                Là một Quản lý Tài chính với 5 năm kinh nghiệm, tôi có kỹ năng
                phân tích tài chính, lập kế hoạch ngân sách và hỗ trợ doanh
                nghiệp phát triển bền vững...
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                Thông tin
              </h2>
              <div className="text-sm space-y-2 text-gray-300">
                <p>
                  <span className="font-bold text-white">Tên công ty:</span> TLC
                  Corp
                </p>
                <p>
                  <span className="font-bold text-white">ID:</span> 0991807
                </p>
                <p>
                  <span className="font-bold text-white">
                    Vị trí tuyển dụng:
                  </span>{" "}
                  Digital marketing
                </p>
                <p>
                  <span className="font-bold text-white">Yêu cầu:</span> Có bằng
                  cấp
                </p>
                <p>
                  <span className="font-bold text-white">Liên hệ:</span>{" "}
                  0123456789
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                Về công ty
              </h2>
              <div className="flex gap-4">
                <button className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black cursor-pointer">
                  WEB
                </button>
                <button
                  onClick={() => navigator(`/job-description/${id}`)}
                  className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black cursor-pointer"
                >
                  CHI TIẾT CÔNG VIỆC
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Application History */}
        <div className="mt-12 bg-[rgba(0,0,0,.6)] p-6 mx-auto max-w-[75%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {applications.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-gray-800 p-3 rounded-full">
                    <UserOutlined className="text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 my-1">
                      <div className="flex">
                        {[...Array(item.rating)].map((_, idx) => (
                          <StarFilled
                            key={idx}
                            className="text-yellow-400 text-sm"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <p className="text-sm text-gray-300">{item.comment}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="bg-white px-1 rounded-full w-6 cursor-pointer hover:bg-gray-200">
                        <LikeOutlined color="black" className="!text-black" />
                      </button>
                      <button className="bg-white px-1 rounded-full w-6 cursor-pointer hover:bg-gray-200">
                        <CommentOutlined
                          color="black"
                          className="!text-black"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <span className="text-center text-2xl block absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[rgba(0,0,0,.7)] text-white font-bold py-2 px-4 rounded-md">
                LỊCH SỬ ỨNG TUYỂN
              </span>
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-500"></div>
              <div className="space-y-10 pl-10">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-8 top-1 w-4 h-4 bg-white rounded-full"></div>
                    <p className="text-white font-medium">{item.date}</p>
                    <p className="text-sm text-gray-400">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
