import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();
  const isAuthen = localStorage.getItem("isAuthen") === "true";

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      navigator("/profile");
    } else if (key === "logout") {
      localStorage.removeItem("isAuthen");
      message.success("Đăng xuất thành công");
      navigator("/login");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Hồ sơ</Menu.Item>
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
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
              <div className="flex items-center gap-2 hover:text-gray-400 cursor-pointer">
                <UserOutlined className="text-xl" />
                <span>BHV101</span>
              </div>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400">
              ĐĂNG NHẬP
            </Link>
            <Link to="/register" className="hover:text-gray-400">
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
