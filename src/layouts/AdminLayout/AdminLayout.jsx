import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  TeamOutlined,
  CreditCardOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ArrowDownToDotIcon, AxeIcon, BugIcon, GemIcon, GpuIcon, StarIcon } from "lucide-react";
import Cookie from "js-cookie";
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    // {
    //   key: "users",
    //   icon: <TeamOutlined />,
    //   label: "Quản lý người dùng",
    //   path: "/admin/users",
    // },
    {
      key: "payments",
      icon: <CreditCardOutlined />,
      label: "Quản lý thanh toán",
      path: "/admin/payment",
    },
    {
      key: "rating",
      icon: <StarIcon />,
      label: "Quản lý đánh giá",
      path: "/admin/rating",
    },
    {
      key: "rating",
      icon: <GemIcon />,
      label: "Tạo nhà tuyển dụng",
      path: "/register-recruiter",
    },
    
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const isActiveMenu = (path) => {
    // return location.pathname === path || location.pathname.startsWith(path + '/');
    return false;
  };
  const handleLogout = () => {
    localStorage.clear();
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            {!collapsed && (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-white font-semibold text-lg">
                  Admin Panel
                </span>
              </div>
            )}
            {collapsed && (
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleMenuClick(item.path)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                    isActiveMenu(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span className={`text-lg ${collapsed ? "mx-auto" : "mr-3"}`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}

                  {collapsed && (
                    <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t border-gray-700">
          

          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 group relative mt-1`}
          >
            <span className={`text-lg ${collapsed ? "mx-auto" : "mr-3"}`}>
              <LogoutOutlined />
            </span>
            {!collapsed && <span className="font-medium">Đăng xuất</span>}

            {collapsed && (
              <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Đăng xuất
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button>

              <div className="ml-4">
                <h1 className="text-xl font-semibold text-white">
                  Admin Panel
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-64"
                />
              </div>

              {/* <button className="relative p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                <BellOutlined className="text-lg" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button> */}

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserOutlined className="text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-white">
                    Admin User
                  </div>
                  <div className="text-xs text-gray-400">admin@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
