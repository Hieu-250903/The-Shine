import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import ccdListBg from "../../assets/iamges/cddListBg2.jpg";
import { useNavigate } from "react-router-dom";
const mockCandidates = [
  {
    id: "093871",
    name: "SIMON VOCLARI",
    image:
      "https://i.pinimg.com/736x/a1/18/2f/a1182f1dcb1e9afda517026981fa826e.jpg",
    position: "Nhân viên",
    field: "Digital Marketing",
    degree: "Cử nhân",
    experience: "4 năm",
    languages: "Tiếng Anh, Tiếng Trung",
    salary: "8tr - 10tr",
    status: "chua-nhan-viec",
  },
  {
    id: "093872",
    name: "KASA MADILEN",
    image:
      "https://i.pinimg.com/736x/a1/18/2f/a1182f1dcb1e9afda517026981fa826e.jpg",
    position: "Tiếp viên hàng không",
    field: "Hàng không",
    degree: "Cử nhân",
    experience: "6 năm",
    languages: "Tiếng Anh, Tiếng Thái",
    salary: "12tr - 15tr",
    status: "da-nhan-viec",
  },
  {
    id: "093873",
    name: "JOHN WESKLY",
    image:
      "https://i.pinimg.com/736x/a1/18/2f/a1182f1dcb1e9afda517026981fa826e.jpg",
    position: "Nhân viên",
    field: "Digital Marketing",
    degree: "Cử nhân",
    experience: "4 năm",
    languages: "Tiếng Anh, Tiếng Trung",
    salary: "8tr - 10tr",
    status: "dang-ban",
  },
  {
    id: "093873",
    name: "JOHN WESKLY",
    image:
      "https://i.pinimg.com/736x/a1/18/2f/a1182f1dcb1e9afda517026981fa826e.jpg",
    position: "Nhân viên",
    field: "Digital Marketing",
    degree: "Cử nhân",
    experience: "4 năm",
    languages: "Tiếng Anh, Tiếng Trung",
    salary: "8tr - 10tr",
    status: "dang-ban",
  },
];

const statusOptions = [
  { label: "Chưa nhận việc", value: "chua-nhan-viec", color: "green" },
  { label: "Đã nhận việc", value: "da-nhan-viec", color: "red" },
  { label: "Đang bận", value: "dang-ban", color: "gray" },
];

export default function CandidateList() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState([]);
  const navigator = useNavigate();
  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchName =
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.id.includes(search);
    const matchStatus =
      filterStatus.length === 0 || filterStatus.includes(candidate.status);
    return matchName && matchStatus;
  });

  const toggleStatus = (status) => {
    setFilterStatus((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  return (
    <div
      className="p-6 bg-gray-100 min-h-screen"
      style={{
        backgroundImage: `url(${ccdListBg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto">
        <div className="text-sm text-black mb-3">
          Trang chủ {"<"} Danh sách nhân sự {"<"} Thông tin
        </div>

        <h1 className="text-6xl font-bold text-[#253E63] mb-8 text-center">
          DANH SÁCH ỨNG VIÊN
        </h1>

        <div className="flex items-center justify-center my-10">
          <div className="flex items-center justify-center w-full md:max-w-4xl ">
            <div className="bg-black !text-white h-12 px-4 rounded-tl-full rounded-bl-full flex items-center cursor-pointer">
              <SearchOutlined />
            </div>
            <input
              type="text"
              placeholder="Nhập tên ứng viên hoặc ID"
              className="w-full outline-none border border-[#253E63] h-12 px-4 rounded-tr-full rounded-br-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="flex items-center justify-center bg-white shadow px-4 py-2 rounded-full font-bold text-blue-900 cursor-pointer"
              >
                0{num} ⭐
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <span>{option.label}</span>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={filterStatus.includes(option.value)}
                  onChange={() => toggleStatus(option.value)}
                  className="accent-current"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto">
          {filteredCandidates.map((candidate) => (
            <div
              className="flex items-center opacity-90 text-white p-4 rounded-xl shadow-lg"
              style={{
                backgroundColor:
                  candidate.status === "chua-nhan-viec" ? "#3B4351" : "#433B35",
              }}
            >
              <div className="flex flex-col items-center pr-6 border-r border-r-slate-400 ">
                <img
                  src={candidate.image}
                  alt="Profile"
                  className="rounded-lg w-44 h-52 object-cover"
                />
                <p className="font-bold mt-2 text-center">{candidate.name}</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigator("/candidate-info/1")}
                  className="mt-3 bg-white text-black font-bold py-1 px-4 rounded-full hover:bg-gray-200 cursor-pointer"
                >
                  XEM HỒ SƠ
                </button>
              </div>
              <div className="flex-1 pl-4 text-sm space-y-2 flex flex-col justify-start h-full gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span>Trạng thái hoạt động</span>
                </div>
                <div>
                  <strong className="text-white font-semibold">ID:</strong>{" "}
                  {candidate.id}
                </div>
                <div>
                  <strong className="text-white font-semibold">Vị trí:</strong>{" "}
                  {candidate.position}
                </div>
                <div>
                  <strong className="text-white font-semibold">
                    Ngành nghề:
                  </strong>{" "}
                  {candidate.field}
                </div>
                <div>
                  <strong className="text-white font-semibold">Học vấn:</strong>{" "}
                  {candidate.degree}
                </div>
                <div>
                  <strong className="text-white font-semibold">
                    Số năm kinh nghiệm:
                  </strong>{" "}
                  {candidate.experience}
                </div>
                <div>
                  <strong className="text-white font-semibold">
                    Ngoại ngữ:
                  </strong>{" "}
                  {candidate.languages}
                </div>
                <div>
                  <strong className="text-white font-semibold">
                    Mức lương mong muốn:
                  </strong>{" "}
                  {candidate.salary}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-12">
          <Pagination current={20} />
        </div>
      </div>
    </div>
  );
}
