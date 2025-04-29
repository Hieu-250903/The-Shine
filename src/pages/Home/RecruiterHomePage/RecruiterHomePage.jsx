import React from "react";
import homeFindCddSecctionbg from "../../../assets/iamges/homeFindCddSecctionbg.jpg";
import cddListBg from "../../../assets/iamges/cddListBg.jpg";
import cddRedyBg from "../../../assets/iamges/cddRedyBg.jpg";
import { RightCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RecruiterHomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overlay-black-to-transparent " />
        <img
          src={homeFindCddSecctionbg}
          alt="Background"
          className="object-contain"
          loading="lazy"
        />
        <div
          className="absolute top-1/2 right-0 flex flex-col items-end gap-4"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7FA6EE] to-[#A6F6FF] text-4xl font-bold text-right">
            TÌM ỨNG VIÊN DỄ DÀNG <br /> ỨNG TUYỂN NHANH
          </span>
          <span className="line-clamp-6 max-w-96 text-white text-right text-xs tracking-widest">
            Chúng tôi là cầu nối giúp người tìm việc và nhà tuyển dụng kết nối
            với nhau một cách nhanh chóng, dễ dàng và hiệu quả. Dù bạn đang tìm
            kiếm công việc ngắn hạn hay dài hạn, nền tảng của chúng tôi giúp bạn
            tiếp cận hàng ngàn cơ hội việc làm chỉ trong vài giây. Với quy trình
            đơn giản, minh bạch và linh hoạt.
          </span>
          <button
            onClick={() => navigate("/recruiter-create-post")}
            className="py-4 px-2 max-w-3/4 rounded-md bg-gradient-to-r from-[#5CA8BF] to-[#35479A] text-white font-bold mt-10 cursor-pointer"
          >
            TẠO BÀI ĐĂNG NGAY
          </button>
        </div>
      </section>
      <section className="relative min-h-screen w-full overflow-hidden">
        <img
          src={cddListBg}
          alt="Background"
          className="object-contain"
          loading="lazy"
        />
        <div className="bg-[rgba(0,0,0,.4)] absolute inset-0" />
        <div
          className="absolute top-1/2 left-12 flex flex-col items-start gap-4"
          style={{
            transform: "translateY(-50%)",
          }}
        >
          <span className="block text-white text-4xl font-bold text-left">
            DANH SÁCH <br />
            ỨNG VIÊN TIỀM NĂNG
          </span>
          <span className="line-clamp-6 max-w-96 text-white text-left text-xs tracking-widest">
            Chúng tôi là cầu nối giúp người tìm việc và nhà tuyển dụng kết nối
            với nhau một cách nhanh chóng, dễ dàng và hiệu quả. Dù bạn đang tìm
            kiếm công việc ngắn hạn hay dài hạn, nền tảng của chúng tôi giúp bạn
            tiếp cận hàng ngàn cơ hội việc làm chỉ trong vài giây. Với quy trình
            đơn giản, minh bạch và linh hoạt.
          </span>
          <button
            onClick={() => navigate("/potential-candidate")}
            className=" flex items-center py-4 px-2  rounded-md bg-gradient-to-r from-[#9D64FE] via-[#3D9ABE] to-[#200189]  text-white font-bold mt-10 cursor-pointer"
          >
            Danh sách ứng viên tiềm năng
            <div className=" ml-4 mr-4">
              <RightCircleFilled />
            </div>
          </button>
        </div>
      </section>
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overlay-black-to-transparent " />
        <img
          src={cddRedyBg}
          alt="Background"
          className="object-contain"
          loading="lazy"
        />
        <div
          className="absolute top-1/2 right-0 flex flex-col items-end gap-4"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="block text-white text-4xl font-bold text-right">
            Hàng nghìn ứng viên <br /> sẵn sàng làm việc!
          </span>
          <span className="line-clamp-6 max-w-96 text-white text-right text-xs tracking-widest">
            Kết nối ứng viên với công việc phù hợp chỉ trong vài phút!
          </span>
          <button
            onClick={() => navigate("/candidate-list")}
            className="py-4 px-2 max-w-3/4 rounded-md bg-slate-200 text-[#3A5388] font-bold mt-10 cursor-pointer"
          >
            TÌM ỨNG VIÊN NGAY
          </button>
        </div>
      </section>
    </div>
  );
};

export default RecruiterHomePage;
