import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl font-bold mb-2">THE SHINE</h2>
          <p className="text-sm mb-6 uppercase font-semibold tracking-wide">
            Nhận thông tin việc làm mới nhất
          </p>
          <p className="text-sm mb-4 text-gray-400">
            Đăng ký ngay để không bỏ lỡ các cơ hội việc làm phù hợp!
          </p>
          <div className="flex items-center border-b border-gray-400 py-2 mb-6">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12H8m0 0l-4 4m4-4l4-4m8 0l-4 4m0 0l-4-4"
              />
            </svg>
            <input
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Nhập email của bạn"
              aria-label="Email"
            />
          </div>
          <p className="text-sm text-gray-400">Kết nối với chúng tôi</p>
        </div>
        <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h3 className="font-bold mb-4">VỀ CHÚNG TÔI</h3>
            <p className="text-gray-400">
              The Shine là nền tảng kết nối việc làm dành cho cá nhân và doanh
              nghiệp. Chúng tôi giúp bạn tìm kiếm cơ hội phù hợp, từ công việc
              ngắn hạn đến dài hạn, với quy trình nhanh chóng và hiệu quả.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">DÀNH CHO ỨNG VIÊN</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Tìm kiếm việc làm</li>
              <li>Hồ sơ & Ứng tuyển</li>
              <li>Câu hỏi thường gặp</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">DÀNH CHO NHÀ TUYỂN DỤNG</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Đăng tin tuyển dụng</li>
              <li>Quản lý ứng viên</li>
              <li>Bảng giá & Dịch vụ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">HỖ TRỢ VÀ LIÊN HỆ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Hotline: 0123.456.789</li>
              <li>Email: support@theshine.com</li>
              <li>Địa chỉ: Số X, Đường Y, Thành phố Z</li>
            </ul>

            <h3 className="font-bold mt-6 mb-4">CHÍNH SÁCH VÀ ĐIỀU KHOẢN</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Quyền riêng tư</li>
              <li>Điều khoản sử dụng</li>
              <li>Hướng dẫn sử dụng</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
