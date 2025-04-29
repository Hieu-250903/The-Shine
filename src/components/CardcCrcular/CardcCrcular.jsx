import { Button } from "antd";

const CardcCrcular = ({ title, bgColor, imgUrl, onSelect, desc }) => {
  return (
    <div className="text-center">
      <div className="relative mb-2">
        <div
          className="w-80 overflow-hidden border-4 border-white cursor-pointer"
          style={{
            height: "480px",
            borderTopLeftRadius: "200px",
            borderTopRightRadius: "200px",
          }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url('${imgUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {desc ? (
              <div className="absolute bottom-2 right-0 left-0 text-2xl font-bold text-blue-400">
                {desc}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Button
        className="w-full py-1 h-12 text-white font-medium border-none"
        style={{
          backgroundColor: bgColor,
          borderRadius: "0",
          fontSize: "16px",
        }}
        onClick={onSelect}
      >
        {title}
      </Button>
    </div>
  );
};

export default CardcCrcular;
