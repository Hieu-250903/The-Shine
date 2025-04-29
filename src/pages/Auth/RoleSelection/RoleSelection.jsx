import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import CardcCrcular from "../../../components/CardcCrcular/CardcCrcular";
const roles = [
  {
    key: "candidate",
    title: "ỨNG VIÊN",
    bgColor: "#D16853",
    imgUrl:
      "https://s3-alpha-sig.figma.com/img/465e/1832/d05fe9bc58aec579dbc285e0a9935ad7?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bqcZtkbJrQJQ1yzU3nlDZFLo4fYnkUT04V1ZmHOSbWBli8nDZF5CQtUDv919dWL6aIj~D5C1W4uPiI1NZHPmMDcUh~s~GbEgGW7HiKRPkN5FPIoMCSLzXjztNXzwa8TMyyN8YaIH7uVaE23s9nY2vm9jnnhRcuzANKSgVnj0BVkrptO1UZX7dKR-sQ0-ixwONV5mgyOYR4e1LhG1EqXeewRVjz9H0JZD5rhIaIkT2jzCfHsXHYVE2tJ1mww5JuQvAVyzh-jZitL-ry0-PEZoEI3-vDUqTI98PesaF14AFO71AjwoclNPfhQ8XkyqbWKHVucvz~~vvvvlSRE405KOVQ__",
  },
  {
    key: "recruiter",
    title: "NHÀ TUYỂN DỤNG",
    bgColor: "#4AA0B5",
    imgUrl:
      "https://s3-alpha-sig.figma.com/img/565b/3af5/ba2d41fe57ee87679333c94a03e5268f?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FYyU~kdXeyaaMLJwqyLienCAxom6NgsTnI7nQqkm11uNIXyffXgTVCSJTBrHoufSeUp0~Mv~XDi3y2UVYdOGTrKNfCowltYI9EHdrRPRgtAuCz0u9yMtcpp8A4n6VfkGbDHLGIaUWIyRqmn3r2vy-kbw-8SwOHSKb3P07NaG3aSUUDV24gHkLlGCsOX6KrnGPpiFjUNG2Y9ymj1qi6PW7XmqRgZSiKCzvNj096edrUcrr9DgzUs-SG1lzBuD0JRzUIcwwGS6K0qybji~I2l7lYLcKOL-ErRx~CWOpxtR90Az0GNf-VAcebEavY5zC~8GLsiTX7w18cvYkKQTE3Dwrg__",
  },
];

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleRoleSelect = (role) => {
    localStorage.setItem("isAuthen", "true");
    localStorage.setItem("role", role);
    navigate(`/`);
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
