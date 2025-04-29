import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
  RightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const NotifyCpn = ({
  status = "success",
  title,
  message,
  buttonText,
  onButtonClick,
  iconColor,
  buttonBgColor,
  buttonTextColor,
  showButton = true,
  customIcon,
}) => {
  const navigate = useNavigate();

  const statusConfigs = {
    success: {
      icon: (
        <CheckCircleFilled
          className={`!text-${iconColor || "green"}-500 !text-2xl`}
        />
      ),
      defaultTitle: "ỨNG TUYỂN THÀNH CÔNG!",
      defaultMessage: "Chờ phản hồi từ nhà tuyển dụng nhé",
      defaultButtonText: "THEO DÕI CÔNG VIỆC",
      defaultButtonBg: buttonBgColor || "white",
      defaultButtonTextColor: buttonTextColor || "blue-900",
    },
    warning: {
      icon: (
        <ExclamationCircleFilled
          className={`!text-${iconColor || "yellow"}-500 !text-2xl`}
        />
      ),
      defaultTitle: "CẢNH BÁO!",
      defaultMessage: "Vui lòng kiểm tra lại thông tin",
      defaultButtonText: "QUAY LẠI",
      defaultButtonBg: buttonBgColor || "yellow-500",
      defaultButtonTextColor: buttonTextColor || "white",
    },
    error: {
      icon: (
        <CloseCircleFilled
          className={`!text-${iconColor || "red"}-500 !text-2xl`}
        />
      ),
      defaultTitle: "ĐÃ XẢY RA LỖI!",
      defaultMessage: "Vui lòng thử lại sau",
      defaultButtonText: "THỬ LẠI",
      defaultButtonBg: buttonBgColor || "red-500",
      defaultButtonTextColor: buttonTextColor || "white",
    },
    info: {
      icon: (
        <InfoCircleFilled
          className={`!text-${iconColor || "blue"}-500 !text-2xl`}
        />
      ),
      defaultTitle: "THÔNG TIN",
      defaultMessage: "Vui lòng xem chi tiết bên dưới",
      defaultButtonText: "TIẾP TỤC",
      defaultButtonBg: buttonBgColor || "blue-500",
      defaultButtonTextColor: buttonTextColor || "white",
    },
  };

  const config = statusConfigs[status];
  const IconComponent = customIcon || config.icon;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl py-20 shadow-lg flex flex-col gap-6 items-center justify-center mx-auto bg-[rgba(0,0,0,.7)] p-5 rounded-lg">
        {IconComponent}
        <span className="text-white font-bold text-3xl text-center">
          {title || config.defaultTitle}
        </span>
        <span className="text-white text-center">
          {message || config.defaultMessage}
        </span>

        {showButton && (
          <div className="flex justify-center cursor-pointer">
            <button
              onClick={handleButtonClick}
              className={`bg-${config.defaultButtonBg} text-${config.defaultButtonTextColor} py-3 px-6 flex items-center cursor-pointer hover:bg-opacity-90 rounded-sm`}
            >
              {buttonText || config.defaultButtonText}
              <RightOutlined className="ml-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotifyCpn;
