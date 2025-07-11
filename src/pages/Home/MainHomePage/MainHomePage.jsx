import { CommentOutlined } from "@ant-design/icons";
import React from "react";
import benefitsBackgournd from "../../../assets/iamges/benefitsBackgournd.jpg";
import connectionBackground from "../../../assets/iamges/connectionBackground.png";
import fueure1background from "../../../assets/iamges/feature_1 .jpg";
import fueure2background from "../../../assets/iamges/feature_2 .jpg";
import fueure3background from "../../../assets/iamges/feature_3 .jpg";
import featureBackground from "../../../assets/iamges/featureBackground .jpg";
import servicesAbout from "../../../assets/iamges/servicesAbout.png";
import theshinebackground from "../../../assets/iamges/theshine.png";
import { useNavigate } from "react-router-dom";
const MainHomePage = () => {
  const navigator = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white">
      <section
        className="relative h-[920px] flex items-center justify-center bg-black z-10"
        style={{
          backgroundImage: `url(${theshinebackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              className="w-32 h-32 bg-white rounded-full absolute"
              style={{
                boxShadow: "0 0 100px 50px rgba(255,255,255,0.8)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,0 100,50 50,100 0,50" fill="white" />
              </svg>
            </div>
          </div>
        </div>
        <div className="z-10 text-center text-black">
          <h2 className="text-8xl font-bold mb-4">THE SHINE</h2>
          <p className="text-xl">
            THẾ GIỚI NƠI ỨNG VIÊN <br />
            VÀ NHÀ TUYỂN DỤNG KẾT NỐI VỚI NHAU
          </p>
        </div>
        <div className="absolute right-[6%] bottom-[12%] cursor-pointer">
          <CommentOutlined size={60} className="text-6xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 mt-20">
            <div className="w-1/4 bg-[#414952] h-2.5 shadow-xl" />
            <div className="w-1/6 bg-[#414952] h-2.5 shadow-xl mt-10" />
          </div>

          <div className="w-[280px] h-40 relative">
            <div className="clip-trapezoid w-full h-full bg-[#414952] absolute -top-24 -right-32 shadow-xl" />
          </div>
          <div className="w-[280px] h-[280px] relative">
            <div className="clip-round-45  w-full h-full bg-[#414952] shadow-xl" />
          </div>
        </div>
        <div className="flex justify-between max-w-6xl mx-auto px-8">
          <div className="w-1/3 p-4 text-center">
            <div
              className="w-32 h-32 shadow-xl mx-auto mb-4 bg-gray-700 rounded-lg transform rotate-45"
              style={{
                backgroundImage: `url(${fueure1background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <h3 className="text-lg font-bold uppercase mb-2  text-[#502C21]">
              KHÁCH HÀNG
            </h3>
            <p className="text-sm text-[#502C21]">
              Khách hàng không chỉ là những người sử dụng dịch vụ, mà còn là đối
              tác đồng hành cùng chúng tôi trong hành trình phát triển. Chúng
              tôi luôn lắng nghe, thấu hiểu và mang đến những giải pháp tốt
              nhất, giúp khách hàng đạt được mục tiêu của mình một cách hiệu quả
              nhất.
            </p>
          </div>

          <div className="w-1/3 p-4 text-center">
            <div
              className="w-32 h-32 shadow-xl mx-auto mb-4 bg-gray-700 rounded-full"
              style={{
                backgroundImage: `url(${fueure2background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <h3 className="text-lg font-bold uppercase mb-2 text-[#502C21]">
              The Shine
            </h3>
            <p className="text-sm text-[#502C21]">
              THE SHINE không chỉ là một nền tảng kết nối công việc, mà còn là
              một hệ sinh thái hỗ trợ cho cả ứng viên và nhà tuyển dụng. Chúng
              tôi tin rằng mỗi cá nhân đều có giá trị riêng, và công việc phù
              hợp sẽ giúp họ tỏa sáng theo cách của mình.
            </p>
          </div>

          <div className="w-1/3 p-4 text-center">
            <div
              className="w-32 h-32 shadow-xl mx-auto mb-4 bg-gray-700 rounded-lg"
              style={{
                backgroundImage: `url(${fueure3background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <h3 className="text-lg font-bold uppercase mb-2 text-[#502C21]">
              ĐỐI TÁC
            </h3>
            <p className="text-sm text-[#502C21]">
              Chúng tôi trân trọng sự hợp tác cùng các doanh nghiệp, tổ chức và
              cá nhân để cùng nhau tạo ra những cơ hội việc làm tốt nhất. Đối
              tác của chúng tôi không chỉ là những nhà cung cấp dịch vụ, mà còn
              là những người bạn đồng hành, chia sẻ giá trị và tầm nhìn phát
              triển bền vững.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div className="relative h-52 w-72">
            <div className="clip-future-end w-full h-full top-0 -left-20 shadow-xl bg-[#414952]" />
          </div>
          <div className="flex-1/2 mt-20 items-end float-end flex flex-col">
            <div className="w-1/4 bg-[#414952] h-2.5 shadow-xl" />
            <div className="w-1/2 bg-[#414952] h-2.5 shadow-xl mt-10" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="py-16 px-8 bg-black"
        style={{
          backgroundImage: `url(${benefitsBackgournd})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "right center",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            QUYỀN LỢI TUYỆT VỜI <br /> KHI SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI
          </h2>
          <div className="mb-8">
            <div class="inline-block px-4 py-2 bg-gradient-to-r from-white to-black text-black text-lg font-medium min-w-md">
              Đối với ứng viên
            </div>
            <p className="text-slate-300 mt-2">
              Tiếp cận nhanh chóng với nhiều cơ hội việc làm chất lượng.
              <br /> Tối ưu hóa hồ sơ để thu hút nhà tuyển dụng. <br /> Hỗ trợ
              phát triển kỹ năng thông qua các tài nguyên hữu ích.
            </p>
          </div>

          <div className="mb-8">
            <div class="inline-block px-4 py-2 bg-gradient-to-r from-white to-black text-black text-lg font-medium min-w-md">
              Đối với nhà tuyển dụng
            </div>
            <p className="text-slate-300 mt-2">
              Tìm kiếm ứng viên phù hợp nhanh chóng và hiệu quả.
              <br /> Tiết kiệm thời gian tuyển dụng với hệ thống lọc thông minh.
              <br />
              Nâng cao thương hiệu tuyển dụng, thu hút nhân tài chất lượng.
            </p>
          </div>
        </div>
      </section>

      {/* Connection Section */}
      <section className="relative w-full h-[800px] overflow-hidden">
        <img
          src={connectionBackground}
          alt="Connection Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative max-w-6xl mx-auto h-full flex flex-col justify-between px-8 py-16">
          <h2 className="text-6xl font-bold text-[#393939] mt-28">
            SỰ KẾT NỐI
          </h2>
          <h2 className="text-6xl font-bold text-[#393939] mt-56 text-end">
            SỰ KẾT NỐI
          </h2>
          <span className="text-center text-[#393939] font-extralight tracking-widest">
            GIỮA NGƯỜI ỨNG VIÊN VÀ NHÀ TUYỂN DỤNG <br /> TÌM VIỆC NHANH CHÓNG,
            TÌM NGƯỜI DỄ DÀNG
          </span>
        </div>
      </section>
      {/* about Section */}

      <section className="relative w-full h-[800px] overflow-hidden">
        {/* Background Image */}
        <img
          src={servicesAbout}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 uppercase leading-tight tracking-widest">
            THE SHINE
          </h1>

          <div className="w-32 h-1 bg-blue-500 mt-2 mb-6"></div>

          <p className="text-xs md:text-sm text-gray-800 tracking-widest mb-10">
            CÙNG CHÚNG TÔI PHÁT TRIỂN MỘT TƯƠNG LAI MẠNH MẼ
          </p>

          <button
            onClick={() => navigator("/about")}
            className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-700 transition cursor-pointer"
          >
            Tìm hiểu thêm
            <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full h-[800px] overflow-hidden bg-black">
        <img
          src={featureBackground}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-20 py-10">
          {/* Left Text */}
          <div className="text-white w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 uppercase">
              THE SHINE <br /> ĐƯA BẠN ĐẾN <br /> TƯƠNG LAI
            </h1>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              Câu lạc bộ doanh nghiệp đẳng cấp nhất hiện tại, nơi kết nối bạn
              với một mạng lưới kinh doanh toàn cầu đầy uy tín và sáng tạo, khơi
              nguồn động lực mạnh mẽ cho sự phát triển bền vững cá nhân và doanh
              nghiệp.
              <br />
              <br />
              Dù đã đạt được thành tích lớn đến đâu, câu lạc bộ cũng sẽ đưa bạn
              tiến xa hơn, hỗ trợ trọn vẹn hành trình xây dựng giá trị và thành
              công bền vững trong kỷ nguyên mới.
              <br />
              <br />
              Hãy gia nhập để tiến xa hơn, mạnh mẽ hơn, bứt phá mọi giới hạn của
              chính mình và cùng chung tay kiến tạo một tương lai thịnh vượng
              cho thế hệ hôm nay và mai sau.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainHomePage;
