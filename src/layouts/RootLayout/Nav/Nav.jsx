import {
  AppleFilled,
  BuildFilled,
  HistoryOutlined,
  LogoutOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import { Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();
  const isAuthen = localStorage.getItem("isAuthen") === "true";
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      navigator("/profile");
    } else if (key === "payment-history") {
      navigator("/payment-history");
    } else if (key === "company") {
      navigator("/company");
    } else if (key === "application-history") {
      navigator("/application-history");
    } else if (key === "recruiter-list-post") {
      navigator("/recruiter-list-post");
    } else if (key === "rating-history") {
      navigator("/rating-history");
    } else if (key === "logout") {
      localStorage.removeItem("isAuthen");
      message.success("Đăng xuất thành công");
      navigator("/login");
    }
  };

  useEffect(() => {
    if (isAuthen) {
      const localUser = localStorage.getItem("userInfo");
      const localRole = localStorage.getItem("role");
      if (localUser) setUser(JSON.parse(localUser));
      if (localRole) setRole(localRole);
    }
  }, [isAuthen]);
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Hồ sơ
      </Menu.Item>
      {role === "recruiter" ? (
        <>
          <Menu.Item key="company" icon={<BuildFilled />}>
            Công ty
          </Menu.Item>
          <Menu.Item key="recruiter-list-post" icon={<Newspaper />}>
            Bài viết đã đăng
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="application-history" icon={<AppleFilled />}>
          Lịch sử ứng tuyển
        </Menu.Item>
      )}
      <Menu.Item key="payment-history" icon={<HistoryOutlined />}>
        Lịch sử thanh toán
      </Menu.Item>
      <Menu.Item key="rating-history" icon={<StarFilled />}>
        Lịch sử đánh giá
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-[#161616] text-white p-6 flex items-center justify-between">
      <div className="flex items-center gap-8 text-sm font-semibold uppercase">
        <Link to="/about" className="hover:text-gray-400">
          THE SHINE
        </Link>
        <Link to="/recruiter-create-post" className="hover:text-gray-400">
          ĐĂNG TUYỂN
        </Link>
        <Link to="/candidate-list" className="hover:text-gray-400">
          ỨNG VIÊN
        </Link>
      </div>

      <div
        onClick={() => navigator("/")}
        className="text-4xl font-bold uppercase tracking-wider cursor-pointer"
      >
        THE SHINE
      </div>

      <div className="flex items-center gap-6 text-sm font-semibold">
        {isAuthen ? (
          <>
            <Link to="/service-packages" className="hover:text-gray-400">
              GÓI DỊCH VỤ
            </Link>
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="flex items-center gap-2 hover:text-gray-400 cursor-pointer max-w-[140px]">
                <UserOutlined className="text-xl" />
                <span className="truncate overflow-hidden whitespace-nowrap">
                  {user?.email || "user"}
                </span>
              </div>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400">
              ĐĂNG NHẬP
            </Link>
            <Link to="/role-selection" className="hover:text-gray-400">
              ĐĂNG KÝ
            </Link>
          </>
        )}
        <div className="hover:text-gray-400 cursor-pointer">VN&gt;</div>
      </div>
    </nav>
  );
};

export default Navbar;
