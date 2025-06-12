import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import CardcCrcular from "../../../components/CardcCrcular/CardcCrcular";
import roleBg_1 from "../../../assets/iamges/roleBg_1.jpg";
import roleBg_2 from "../../../assets/iamges/roleBg_2.jpg";
const roles = [
  {
    key: "candidate",
    title: "ỨNG VIÊN",
    bgColor: "#D16853",
    imgUrl: roleBg_1,
  },
  {
    key: "recruiter",
    title: "NHÀ TUYỂN DỤNG",
    bgColor: "#4AA0B5",
    imgUrl: roleBg_2,
  },
];

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleRoleSelect = (role) => {
    if (role === "candidate") {
      navigate(`/register`);
    } else if (role === "recruiter") {
      navigate("/register-recruiter");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://s3-alpha-sig.figma.com/img/31d8/ed2e/14e425f9ba6916bafefd96ecdfa093a0?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WhThI2W3mFXKIz6RKPT~jgNKYJJR1P55z~Tr7R4SziS2o-NNAof9gP~cHBfR~IOaRVjfr5ekxUBHb4UdvqCGs6hj4WEAK6WLyzX2kETX2qT1yjaSDuboDjcvrZwLMlzMQ2rYIewYJMDNvQqt1kdqW2svKtB0O6FA4XxbCzV9v3WgMxVkHKD1h9rWFTbnVc57LodZASlUOKLeTFGWwzGj-qfUbarohV7MYAt4sDwh-JLOwEg7dZoIUbViwwnqF2aMKFwGmBXahVvtZGSBlIQx9sCOCs2ET85Y5GH8c2fA9b6z18DH9ZmYSO6NLz4npYNYJTvN5791ZhFk-fXfMWXBJA__')",
          }}
        >
          <div className="flex flex-col h-full w-full bg-[rgba(0,0,0,.6)] bg-opacity-50">
            <div className="relative h-full w-full flex flex-col items-center justify-center">
              <CloseOutlined
                className="absolute top-4 right-4 !text-white text-2xl cursor-pointer z-20"
                onClick={handleClose}
              />
              <div className="w-full max-w-2xl px-4 flex justify-around items-center gap-40">
                {roles.map((role) => (
                  <CardcCrcular
                    key={role.key}
                    title={role.title}
                    bgColor={role.bgColor}
                    imgUrl={role.imgUrl}
                    onSelect={() => handleRoleSelect(role.key)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
