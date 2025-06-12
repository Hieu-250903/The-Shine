import {
  DownloadOutlined,
  FullscreenOutlined,
  LeftOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Button, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { downloadFile, getFileById } from "../../services/file";

const CVViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) loadFile();
  }, [id]);

  const base64ToBlobUrl = (base64Data, contentType = "application/pdf") => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length)
      .fill()
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    return URL.createObjectURL(blob);
  };

  const loadFile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFileById(id);
      if (response) {
        setFileData(response);
        if (response.url || response.link) {
          setPdfUrl(response.url || response.link);
        } else if (response.fileData) {
          const url = base64ToBlobUrl(response.fileData, response.contentType);
          setPdfUrl(url);
        } else {
          const downloadResponse = await downloadFile(id);
          if (downloadResponse) {
            const blob = new Blob([downloadResponse], {
              type: "application/pdf",
            });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
          } else {
            throw new Error("Không có dữ liệu file.");
          }
        }
      } else {
        throw new Error("Không tìm thấy file.");
      }
    } catch (error) {
      console.error("Lỗi tải file:", error);
      setError("Không thể tải file CV. Vui lòng thử lại!");
      message.error("Không thể tải file CV");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadFile(id);
      if (response) {
        const blob = new Blob([response], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          fileData?.fileName || fileData?.originalName || "CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        message.success("Tải xuống thành công!");
      }
    } catch (error) {
      console.error("Lỗi tải xuống:", error);
      message.error("Tải xuống thất bại!");
    }
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const toggleFullscreen = () => {
    const element = document.getElementById("pdf-container");
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Đang tải CV...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Không thể tải CV
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            type="primary"
            onClick={() => navigate(-1)}
            icon={<LeftOutlined />}
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-8 px-4"
      style={{
        backgroundImage: "url('/background-blur.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-xl shadow-md px-6 py-4 w-full max-w-5xl flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Button icon={<LeftOutlined />} onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <div>
            <h2 className="text-lg font-semibold">
              {fileData?.fileName || fileData?.originalName || "CV"}
            </h2>
            <p className="text-sm text-gray-500">
              {fileData?.uploadDate &&
                `Tải lên: ${new Date(fileData.uploadDate).toLocaleString(
                  "vi-VN"
                )}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button icon={<ZoomOutOutlined />} onClick={zoomOut} />
          <span className="text-sm min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button icon={<ZoomInOutlined />} onClick={zoomIn} />
          <Button icon={<FullscreenOutlined />} onClick={toggleFullscreen} />
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            Tải xuống
          </Button>
        </div>
      </div>

      <div
        id="pdf-container"
        className="bg-white rounded-xl shadow-lg overflow-auto w-full max-w-5xl"
        style={{ minHeight: "1100px", height: "calc(100vh - 260px)" }}
      >
        {pdfUrl ? (
          <div className="flex justify-center p-6">
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{
                minHeight: "1000px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                border: "none",
              }}
              title="CV PDF Viewer"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Không thể hiển thị file PDF</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Button
          type="primary"
          icon={<LeftOutlined />}
          onClick={() => navigate(-1)}
          size="large"
        >
          Quay lại hồ sơ
        </Button>
      </div>
    </div>
  );
};

export default CVViewer;
