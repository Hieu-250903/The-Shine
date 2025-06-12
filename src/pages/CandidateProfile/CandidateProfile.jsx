import {
  FileOutlined,
  LeftOutlined,
  RightOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Rate, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useresumebg from "../../assets/iamges/useresumebg.jpg";
import {
  addCVFile,
  downloadFile,
  getFileById,
  getFileUserInfo,
  uploadFile,
} from "../../services/file";

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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userFiles, setUserFiles] = useState([]);
  const fileInputRef = useRef(null);

  const data = isEditMode ? profileData.editMode : profileData.viewMode;

  useEffect(() => {
    loadUserFiles();
  }, []);

  const loadUserFiles = async () => {
    try {
      setLoading(true);
      const response = await getFileUserInfo();
      if (response) {
        setUserFiles(response);
        const cvFile = response.find((file) => file.type === "cv");
        if (cvFile) {
          setUploadedFile({
            id: cvFile.id,
            name: cvFile.originalName || cvFile.name,
            url: cvFile.url || cvFile.link,
            size: cvFile.size
              ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB`
              : "N/A",
            uploadDate: cvFile.createdAt
              ? new Date(cvFile.createdAt).toLocaleString("vi-VN")
              : "N/A",
          });
        }
      }
    } catch (error) {
      console.error("Error loading user files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    setIsEditMode(false);
    message.success("Đã lưu thông tin hồ sơ");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      message.error("Chỉ chấp nhận file PDF!");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      message.error("File không được vượt quá 10MB!");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData);

      if (response.link || response.id) {
        setUploadedFile({
          id: response.id,
          name: file.name,
          url: response.link || response.url,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          uploadDate: new Date().toLocaleString("vi-VN"),
        });
        if (response.id) {
          try {
            const resCv = await addCVFile(response.id);
            if (resCv.isSucceed) {
              message.success(
                "Tải lên CV thành công và đã liên kết với hồ sơ!"
              );
            }
          } catch (cvError) {
            console.error("Error adding CV file:", cvError);
            message.success("Tải lên CV thành công!");
          }
        } else {
          message.success("Tải lên CV thành công!");
        }
        loadUserFiles();
      } else {
        throw new Error(
          response?.message || "Upload failed - Invalid response format"
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Tải lên thất bại";
      message.error(`Tải lên thất bại: ${errorMessage}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const openFileUpload = () => {
    fileInputRef.current?.click();
  };
  const viewUploadedFile = () => {
    if (!uploadedFile?.id) {
      message.error("Không có thông tin file để xem");
      return;
    }

    navigate(`/cv/${uploadedFile.id}`);
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    message.success("Đã xóa file CV khỏi hồ sơ");
  };

  const downloadCV = async () => {
    if (!uploadedFile?.id) {
      message.error("Không có file để tải xuống");
      return;
    }

    try {
      const response = await downloadFile(uploadedFile.id);
      if (response) {
        const blob = new Blob([response], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          uploadedFile?.name || uploadedFile?.originalName || "CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        message.success("Tải xuống thành công!");
      }
    } catch (error) {
      console.error("Download error:", error);
      message.error("Tải xuống thất bại. Vui lòng thử lại!");
    }
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
        {loading && (
          <div className="text-center py-4">
            <span className="text-white">Đang tải thông tin...</span>
          </div>
        )}

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
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <button
                        onClick={openFileUpload}
                        disabled={uploading}
                        className="bg-white rounded-full px-6 py-2 text-black cursor-pointer hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <UploadOutlined />
                        {uploading ? "Đang tải lên..." : "Tải lên CV (PDF)"}
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {uploadedFile && (
                      <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileOutlined className="text-xl text-red-400" />
                            <div>
                              <p className="font-semibold text-white">
                                {uploadedFile.name}
                              </p>
                              <div className="flex gap-4 text-xs text-gray-300">
                                <span>Kích thước: {uploadedFile.size}</span>
                                <span>ID: {uploadedFile.id}</span>
                              </div>
                              <p className="text-xs text-gray-300">
                                Tải lên: {uploadedFile.uploadDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={viewUploadedFile}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Xem PDF
                            </button>
                            <button
                              onClick={downloadCV}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Tải xuống
                            </button>
                            <button
                              onClick={removeUploadedFile}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex">
                    <button className="bg-[#A15037] px-6 py-2 hover:bg-white hover:text-black cursor-pointer uppercase rounded-full">
                      Sửa đường link Portfolio
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={uploadedFile ? viewUploadedFile : undefined}
                    className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black cursor-pointer"
                  >
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
