import useresumebg from "../../../assets/iamges/useresumebg.jpg";
import createResume from "../../../assets/iamges/createResume.jpeg";
import { Modal } from "antd";
import React from "react";
import CardcCrcular from "../../CardcCrcular/CardcCrcular";

const ResumeModal = ({ open, onClose, onSelectResume }) => {
  const resumeOptions = [
    {
      title: "Sử dụng",
      bgColor: "#1890ff",
      imgUrl: useresumebg,
      desc: "Victoria Sinclair",
    },
    {
      title: "Tạo ngay",
      bgColor: "#52c41a",
      imgUrl: createResume,
      desc: "CHƯA CÓ HỒ SƠ",
    },
  ];

  const handleSelectResume = (resume) => {
    console.log("Đã chọn hồ sơ:", resume);
    onSelectResume(resume);
    onClose();
  };

  return (
    <Modal open={open} footer={null} onCancel={onClose} centered width={800}>
      <div className="flex justify-center gap-8 z-30">
        {resumeOptions.map((resume, index) => (
          <CardcCrcular
            key={index}
            title={resume.title}
            bgColor={resume.bgColor}
            imgUrl={resume.imgUrl}
            onSelect={() => handleSelectResume(resume)}
            desc={resume.desc}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ResumeModal;
