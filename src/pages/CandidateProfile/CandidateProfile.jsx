import {
  FileOutlined,
  LeftOutlined,
  RightOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Rate, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cvupload from "../../assets/iamges/cvupload.jpg";
import {
  addCVFile,
  downloadFile,
  getFileUserInfo,
  uploadFile,
} from "../../services/file";
import { addRating, checkRating2 } from "../../services/rate";
import ReviewModal from "../../components/ReviewModal/ReviewModal";

const CandidateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalRating, setShowModalRating] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadUserFiles();
    const check = async () => {
      const res = await checkRating2();
    };
    check();
  }, []);

  const loadUserFiles = async () => {
    try {
      setLoading(true);
      const response = await getFileUserInfo();
      if (response) {
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      message.error("Chỉ chấp nhận file PDF!");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      message.error("File quá lớn! Vui lòng chọn file dưới 10MB.");
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
              message.success("Tải lên CV thành công và đã liên kết với hồ sơ!");
            }
          } catch {
            message.success("Tải lên CV thành công!");
          }
        } else {
          message.success("Tải lên CV thành công!");
        }
        loadUserFiles();
      } else {
        throw new Error(response?.message || "Upload failed");
      }
    } catch (error) {
      message.error(`Tải lên thất bại: ${error.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const openFileUpload = () => fileInputRef.current?.click();

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
      const blob = new Blob([response], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = uploadedFile?.name || "CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      message.success("Tải xuống thành công!");
    } catch (error) {
      message.error("Tải xuống thất bại. Vui lòng thử lại!");
    }
  };

  const handleReviewSubmitted = async (reviewForm) => {
    if (reviewForm.rating1 === 0) {
      message.error("Vui lòng chọn số sao đánh giá!");
      return;
    }
    if (!reviewForm.comment.trim()) {
      message.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }
    try {
      await addRating({
        rating1: reviewForm.rating1,
        comment: reviewForm.comment,
        contributedComment: "2",
      });
      message.success("Đánh giá của bạn đã được gửi thành công!");
    } catch {
      message.error("Có lỗi xảy ra khi gửi đánh giá!");
    } finally {
      setShowModalRating(false);
    }
  };

  return (
    <div
      className="text-white relative"
      style={{
        backgroundImage: `url(${cvupload})`,
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
                src={cvupload}
                alt="TLC Corp"
                className="rounded-lg object-cover w-[500px] h-[600px]"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Rate value={5} className="!flex !flex-col !text-3xl" />
              </div>
              <div className="text-4xl font-bold uppercase text-center absolute bottom-2 right-1/2 translate-x-[50%]">
                CV stage
              </div>
            </div>
          </div>

          <div className="space-y-8 mt-12">
            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                THE SHINE
              </h2>
              <p className="text-sm text-gray-300 mb-2">Tải lên CV của ứng viên</p>

              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4 mt-6">
                MÔ TẢ:
              </h2>
              <h1>
                Một CV tốt là ấn tượng đầu tiên của bạn với nhà tuyển dụng.
              </h1>
              <br />
              <p className="text-sm leading-relaxed text-gray-300 max-w-[600px]">
                CV làm nổi bật điểm mạnh, kinh nghiệm và giúp bạn nổi bật giữa
                các ứng viên khác. Một CV được chuẩn bị kỹ càng sẽ tăng cơ hội
                được mời phỏng vấn và thể hiện bạn là người chuyên nghiệp,
                nghiêm túc với công việc.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                THÔNG TIN
              </h2>
              <p className="text-sm text-400">
                CV bạn nộp gần nhất là CV sẽ được các nhà tuyển dụng tải về.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase border-l-4 pl-2 border-white mb-4">
                HỒ SƠ
              </h2>
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
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10">
          <button
            onClick={() => setShowModalRating(true)}
            className="border bg-white cursor-pointer rounded-md text-black font-bold px-2 py-3 hover:bg-slate-300"
          >
            Đánh giá chức năng
          </button>
        </div>

        {showModalRating && (
          <ReviewModal
            isOpen={showModalRating}
            onClose={() => setShowModalRating(false)}
            onReviewSubmitted={handleReviewSubmitted}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
