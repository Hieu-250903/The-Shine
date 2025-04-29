import React, { useState } from "react";
import { Input, Button, Tag, Carousel, Rate } from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  StarFilled,
  CommentOutlined,
} from "@ant-design/icons";
import jobListbackground from "../../assets/iamges/jobListbackground.jpg";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStarFilter, setActiveStarFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(3);
  const navigator = useNavigate();
  const tags = [
    { id: "nhaplieu", name: "Nhập liệu" },
    { id: "vienbao", name: "Viễn bảo cáo" },
    { id: "dichthuat", name: "Dịch Thuật" },
    { id: "thietkeweb", name: "Thiết kế web" },
    { id: "laptrinh", name: "Lập trình số" },
    { id: "design", name: "Design" },
    { id: "phantichdulieu", name: "Phân tích dữ liệu" },
    { id: "vietkontent", name: "Viết content" },
  ];
  const imageList = [
    "https://i.pinimg.com/736x/6b/50/68/6b5068b66531d8a8825aa408104d957c.jpg",
    "https://i.pinimg.com/736x/12/5e/e3/125ee335832eab312813ed678a769148.jpg",
    "https://i.pinimg.com/736x/d5/95/dc/d595dc6745451258f1c41c37c94af583.jpg",
  ];
  const jobListings = [
    {
      id: 1,
      date: "23/03/2023",
      companyName: "TLC Corp",
      location: "079187",
      jobFunction: "Digital marketing",
      requirement: "Có bằng cấp",
      contact: "0123456789",
      rating: 5,
      image:
        "https://i.pinimg.com/736x/ee/16/f9/ee16f9bd17e80b730e8207418e7806d6.jpg",
    },
    {
      id: 2,
      date: "22/03/2023",
      companyName: "TLC Corp",
      location: "079187",
      jobFunction: "Digital marketing",
      requirement: "Có bằng cấp",
      contact: "0123456789",
      rating: 4,
      image:
        "https://i.pinimg.com/736x/ee/16/f9/ee16f9bd17e80b730e8207418e7806d6.jpg",
    },
    {
      id: 3,
      date: "21/03/2023",
      companyName: "TLC Corp",
      location: "079187",
      jobFunction: "Web Developer",
      requirement: "Có bằng cấp",
      contact: "0123456789",
      rating: 3,
      image:
        "https://i.pinimg.com/736x/ee/16/f9/ee16f9bd17e80b730e8207418e7806d6.jpg",
    },
    {
      id: 4,
      date: "20/03/2023",
      companyName: "TLC Corp",
      location: "079187",
      jobFunction: "Graphic Designer",
      requirement: "Có bằng cấp",
      contact: "0123456789",
      rating: 2,
      image:
        "https://i.pinimg.com/736x/ee/16/f9/ee16f9bd17e80b730e8207418e7806d6.jpg",
    },
    {
      id: 5,
      date: "19/03/2023",
      companyName: "TLC Corp",
      location: "079187",
      jobFunction: "Content Writer",
      requirement: "Có bằng cấp",
      contact: "0123456789",
      rating: 1,
      image:
        "https://i.pinimg.com/736x/ee/16/f9/ee16f9bd17e80b730e8207418e7806d6.jpg",
    },
  ];

  const handleStarFilter = (rating) => {
    if (activeStarFilter === rating) {
      setActiveStarFilter(null); // Toggle off if the same filter is clicked
    } else {
      setActiveStarFilter(rating);
    }
  };

  const filteredJobs = jobListings.filter((job) => {
    // Filter by star rating if active
    if (activeStarFilter !== null && job.rating !== activeStarFilter) {
      return false;
    }

    // Filter by search term if present
    if (
      searchTerm &&
      !job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.jobFunction.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen  text-white">
      <Carousel autoplay className="relative">
        {imageList.map((url, index) => (
          <div key={index}>
            <div className="relative h-[400px] bg-gray-900">
              <img
                src={url}
                alt={`Ảnh ${index + 1}`}
                className="w-full h-full object-contain opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white text-center">
                  CÔNG NGHỆ VÀ LẬP TRÌNH
                </h1>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div
        style={{
          backgroundImage: `url(${jobListbackground})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-[rgba(0,0,0,.3)]">
          <nav className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold">
              <MenuOutlined className="text-2xl" />
              <div className="text-sm">DANH SÁCH CÁC CÔNG VIỆC</div>
            </div>
            <CommentOutlined className="text-2xl bg-red-500 p-2 rounded-full cursor-pointer" />
          </nav>

          {/* Tags Section */}
          <div className="p-4 ">
            <div className="flex items-center mb-2 justify-center">
              <span className="mr-2 text-sm">TAG:</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="bg-transparent border border-slate-200 rounded-md cursor-pointer text-white px-2 py-1 hover:bg-[rgba(0,0,0,.8)] translate-1 ease-in-out"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2 my-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`flex items-center rounded-full px-3 py-1 cursor-pointer ${
                      activeStarFilter === num ? "bg-teal-500" : "bg-[#4D828C]"
                    }`}
                    onClick={() => handleStarFilter(num)}
                  >
                    <span className="mr-1">
                      {num.toString().padStart(2, "0")}
                    </span>
                    <StarFilled className="text-yellow-400" />
                  </div>
                ))}
              </div>

              <div className="flex items-center">
                <SearchOutlined className="mr-2 text-3xl cursor-pointer" />
                <input
                  placeholder="Tìm kiếm công việc..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-full bg-transparent border border-slate-300 py-2 px-3 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[rgba(0,0,0,.3)] p-4">
          <div className="mx-auto max-w-3/4 bg-[rgba(0,0,0,.6)] p-10 rounded-md">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="mb-4  rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="relative w-56 h-64 overflow-hidden rounded-lg">
                          <img
                            src={job.image}
                            alt={job.companyName}
                            className="w-full h-full object-cover mb-2"
                          />
                          <div className="absolute bottom-0 right-0 left-0 bg-[rgba(0,0,0,.8)] p-2 flex flex-col items-center gap-2">
                            <Rate value={job.rating} className="!text-xs" />
                            <div className="text-md font-bold text-white">
                              TLC CORP
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center gap-6">
                            <div className="text-md font-bold w-36">
                              Tên công ty:
                            </div>
                            <div className="text-xs text-slate-200">
                              {job.companyName}
                            </div>
                          </div>
                          <div className="mb-2 flex items-center gap-6">
                            <div className="text-md font-bold w-36">ID:</div>
                            <div className="text-xs text-slate-200">
                              {job.location}
                            </div>
                          </div>
                          <div className="mb-2 flex items-center gap-6">
                            <div className="text-md font-bold w-36">
                              Vị trí tuyển dụng:
                            </div>
                            <div className="text-xs text-slate-200">
                              {job.jobFunction}
                            </div>
                          </div>
                          <div className="mb-2 flex items-center gap-6">
                            <div className="text-md font-bold w-36">
                              Yêu cầu:
                            </div>
                            <div className="text-xs text-slate-200">
                              {job.requirement}
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="text-md font-bold w-36">
                              Liên hệ:
                            </div>
                            <div className="text-xs text-slate-200">
                              {job.contact}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-right">
                        <Button
                          className="bg-teal-600 text-white border-0 hover:bg-teal-700"
                          onClick={() => navigator(`/job-detail/${job.id}`)}
                        >
                          ỨNG TUYỂN
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p>Không tìm thấy công việc phù hợp với bộ lọc</p>
              </div>
            )}
            <div className="p-4">
              <Pagination
                current={currentPage}
                total={50}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
