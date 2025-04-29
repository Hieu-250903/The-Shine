import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useresumebg from "../../assets/iamges/useresumebg.jpg";
export const profileData = {
  viewMode: {
    title: "THE SHINE",
    subtitle: "TẠO HỒ SƠ",
    description: `Là một Quản lý Tài chính với 4 năm kinh nghiệm, tôi có kỹ năng phân tích tài chính, lập kế hoạch ngân sách và tối ưu hóa dòng tiền để giúp doanh nghiệp phát triển bền vững. Với tư duy chiến lược và khả năng ra quyết định dựa trên dữ liệu, tôi luôn tìm kiếm những giải pháp hiệu quả nhằm nâng cao hiệu suất tài chính và giảm thiểu rủi ro. Tôi không chỉ giỏi con số, mà còn có khả năng lãnh đạo và phối hợp chặt chẽ với các bộ phận để đạt được mục tiêu chung.`,
    info: {
      fullName: "Victoria Sinclair",
      id: "459023",
      dob: "02/09/1994",
      experience: "Có 4 năm kinh nghiệm quản lí tài chính",
      phone: "0123456789",
    },
    files: {
      cv: "CV",
      portfolio: "PORTFOLIO",
    },
  },
  editMode: {
    title: "THE SHINE",
    subtitle: "TẠO HỒ SƠ",
    description: `Là một duyệt lý tài chính với 4 năm kinh nghiệm, lời có kỹ năng phân tiền tài chính, lớp tế hoạch ngân cách và rối mỏi đường trên để giao doanh nghiệp phát triển bản vững, với từ duy chích được khởi nông ra quyết định dựa mua đã thực hiện làm viêm nhưng giới thiệu. Lắc quá mức những con liệu suất tài chính và giám trình mức. Từ không thì giới con số, mở con chiều trong danh động mở hội học nhờ các với các bộ phận để đạt được mục tiêu chung.`,
    info: {
      fullName: "Vincenzo Sánctan",
      dob: "03/09/1992",
      experience: "4 năm kinh nghiệm quan hóa kinh chính",
      phone: "03/04/2020",
    },
    files: {
      cv: "Đối file",
      portfolio: "Sửa đường link",
    },
  },
};

const CandidateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const data = isEditMode ? profileData.editMode : profileData.viewMode;

  const handleSave = () => {
    // Xử lý lưu dữ liệu ở đây
    setIsEditMode(false);
  };

  return (
    <div
      className="text-white"
      style={{
        backgroundImage: `url(${useresumebg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[rgba(0,0,0,.4)] pb-6">
        <div className="flex items-start gap-10">
          <div className="flex flex-col p-2 px-8">
            <div className="relative">
              <img
                src={useresumebg}
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
          </div>

          <div className="space-y-8 mt-12">
            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                {data.title}
              </h2>
              <p className="text-sm text-gray-300 mb-2">{data.subtitle}</p>

              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4 mt-6">
                MÔ TẢ BẢN THÂN
              </h2>
              {isEditMode ? (
                <textarea
                  className="w-full h-40 p-2 bg-transparent text-white rounded border border-white"
                  value={data.description}
                  onChange={(e) => (data.description = e.target.value)}
                />
              ) : (
                <p className="text-sm leading-relaxed text-gray-300 max-w-[600px]">
                  {data.description}
                </p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                THÔNG TIN
              </h2>
              <div className="text-sm space-y-2 text-gray-300">
                {isEditMode ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white w-32">
                        Họ và tên:
                      </span>
                      <input
                        type="text"
                        className="bg-transparent text-white rounded border border-white  p-1  flex-1"
                        value={data.info.fullName}
                        onChange={(e) => (data.info.fullName = e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white w-32">
                        Ngày sinh:
                      </span>
                      <input
                        type="text"
                        className="bg-transparent text-white rounded border border-white  p-1  flex-1"
                        value={data.info.dob}
                        onChange={(e) => (data.info.dob = e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white w-32">
                        Kinh nghiệm:
                      </span>
                      <input
                        type="text"
                        className="bg-transparent text-white rounded border border-white  p-1  flex-1"
                        value={data.info.experience}
                        onChange={(e) =>
                          (data.info.experience = e.target.value)
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white w-32">SĐT:</span>
                      <input
                        type="text"
                        className="bg-transparent text-white rounded border border-white  p-1  flex-1"
                        value={data.info.phone}
                        onChange={(e) => (data.info.phone = e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-bold text-white">Họ và tên:</span>{" "}
                      {data.info.fullName}
                    </p>
                    <p>
                      <span className="font-bold text-white">Ngày sinh:</span>{" "}
                      {data.info.dob}
                    </p>
                    <p>
                      <span className="font-bold text-white">Kinh nghiệm:</span>{" "}
                      {data.info.experience}
                    </p>
                    <p>
                      <span className="font-bold text-white">SĐT:</span>{" "}
                      {data.info.phone}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                HỒ SƠ
              </h2>
              {isEditMode ? (
                <div className="flex">
                  <button className="bg-white rounded-tl-full rounded-bl-full px-6 py-2 text-black cursor-pointer">
                    CV
                  </button>
                  <button className="bg-[#A15037] px-6 py-2 hover:bg-white hover:text-black cursor-pointer uppercase rounded-tr-full rounded-br-full">
                    Đổi file
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black cursor-pointer">
                    {data.files.cv}
                  </button>
                  <button className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black cursor-pointer uppercase">
                    {data.files.portfolio}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div />
          {isEditMode ? (
            <button
              onClick={handleSave}
              className="mt-6 bg-white text-black font-bold text-xl px-10 py-4 cursor-pointer rounded-xl hover:bg-gray-200"
            >
              LƯU
            </button>
          ) : (
            <button
              onClick={() => setIsEditMode(true)}
              className="mt-6 bg-white text-black font-bold text-xl px-10 py-4 cursor-pointer rounded-xl hover:bg-gray-200"
            >
              Chỉnh sửa hồ sơ
            </button>
          )}
          <div
            className="flex items-center gap-2 cursor-pointer text-sm font-semibold hover:text-gray-400 pt-4 mr-20"
            onClick={() => (isEditMode ? setIsEditMode(false) : navigate(-1))}
          >
            {isEditMode ? <RightOutlined /> : <LeftOutlined />}
            <span>QUAY LẠI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
