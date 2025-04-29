import React, { useRef } from "react";
import botentialBackgournd from "../../assets/iamges/botentialBackgournd.jpg";
import botentialSpecialBackground from "../../assets/iamges/botentialSpecialBackground.jpg";
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
const candidates = [
  {
    name: "SIMON CRODY",
    image:
      "https://s3-alpha-sig.figma.com/img/465e/1832/d05fe9bc58aec579dbc285e0a9935ad7?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bqcZtkbJrQJQ1yzU3nlDZFLo4fYnkUT04V1ZmHOSbWBli8nDZF5CQtUDv919dWL6aIj~D5C1W4uPiI1NZHPmMDcUh~s~GbEgGW7HiKRPkN5FPIoMCSLzXjztNXzwa8TMyyN8YaIH7uVaE23s9nY2vm9jnnhRcuzANKSgVnj0BVkrptO1UZX7dKR-sQ0-ixwONV5mgyOYR4e1LhG1EqXeewRVjz9H0JZD5rhIaIkT2jzCfHsXHYVE2tJ1mww5JuQvAVyzh-jZitL-ry0-PEZoEI3-vDUqTI98PesaF14AFO71AjwoclNPfhQ8XkyqbWKHVucvz~~vvvvlSRE405KOVQ__",
    rating: 4,
  },
  {
    name: "PETER HARDER",
    image:
      "https://s3-alpha-sig.figma.com/img/565b/3af5/ba2d41fe57ee87679333c94a03e5268f?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FYyU~kdXeyaaMLJwqyLienCAxom6NgsTnI7nQqkm11uNIXyffXgTVCSJTBrHoufSeUp0~Mv~XDi3y2UVYdOGTrKNfCowltYI9EHdrRPRgtAuCz0u9yMtcpp8A4n6VfkGbDHLGIaUWIyRqmn3r2vy-kbw-8SwOHSKb3P07NaG3aSUUDV24gHkLlGCsOX6KrnGPpiFjUNG2Y9ymj1qi6PW7XmqRgZSiKCzvNj096edrUcrr9DgzUs-SG1lzBuD0JRzUIcwwGS6K0qybji~I2l7lYLcKOL-ErRx~CWOpxtR90Az0GNf-VAcebEavY5zC~8GLsiTX7w18cvYkKQTE3Dwrg__",
    rating: 5,
  },
  {
    name: "CLARA SENRIC",
    image:
      "https://s3-alpha-sig.figma.com/img/565b/3af5/ba2d41fe57ee87679333c94a03e5268f?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FYyU~kdXeyaaMLJwqyLienCAxom6NgsTnI7nQqkm11uNIXyffXgTVCSJTBrHoufSeUp0~Mv~XDi3y2UVYdOGTrKNfCowltYI9EHdrRPRgtAuCz0u9yMtcpp8A4n6VfkGbDHLGIaUWIyRqmn3r2vy-kbw-8SwOHSKb3P07NaG3aSUUDV24gHkLlGCsOX6KrnGPpiFjUNG2Y9ymj1qi6PW7XmqRgZSiKCzvNj096edrUcrr9DgzUs-SG1lzBuD0JRzUIcwwGS6K0qybji~I2l7lYLcKOL-ErRx~CWOpxtR90Az0GNf-VAcebEavY5zC~8GLsiTX7w18cvYkKQTE3Dwrg__",
    rating: 5,
    featured: true,
  },
  {
    name: "VICTORIA SINCLAIR",
    image:
      "https://s3-alpha-sig.figma.com/img/565b/3af5/ba2d41fe57ee87679333c94a03e5268f?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FYyU~kdXeyaaMLJwqyLienCAxom6NgsTnI7nQqkm11uNIXyffXgTVCSJTBrHoufSeUp0~Mv~XDi3y2UVYdOGTrKNfCowltYI9EHdrRPRgtAuCz0u9yMtcpp8A4n6VfkGbDHLGIaUWIyRqmn3r2vy-kbw-8SwOHSKb3P07NaG3aSUUDV24gHkLlGCsOX6KrnGPpiFjUNG2Y9ymj1qi6PW7XmqRgZSiKCzvNj096edrUcrr9DgzUs-SG1lzBuD0JRzUIcwwGS6K0qybji~I2l7lYLcKOL-ErRx~CWOpxtR90Az0GNf-VAcebEavY5zC~8GLsiTX7w18cvYkKQTE3Dwrg__",
    rating: 5,
  },
  {
    name: "MERHI DOLICA",
    image:
      "https://s3-alpha-sig.figma.com/img/465e/1832/d05fe9bc58aec579dbc285e0a9935ad7?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bqcZtkbJrQJQ1yzU3nlDZFLo4fYnkUT04V1ZmHOSbWBli8nDZF5CQtUDv919dWL6aIj~D5C1W4uPiI1NZHPmMDcUh~s~GbEgGW7HiKRPkN5FPIoMCSLzXjztNXzwa8TMyyN8YaIH7uVaE23s9nY2vm9jnnhRcuzANKSgVnj0BVkrptO1UZX7dKR-sQ0-ixwONV5mgyOYR4e1LhG1EqXeewRVjz9H0JZD5rhIaIkT2jzCfHsXHYVE2tJ1mww5JuQvAVyzh-jZitL-ry0-PEZoEI3-vDUqTI98PesaF14AFO71AjwoclNPfhQ8XkyqbWKHVucvz~~vvvvlSRE405KOVQ__",
    rating: 4,
  },
];
const FeaturedCandidates = [
  {
    name: "Clara Senric",
    image: "https://i.pravatar.cc/300?img=1",
    color: "bg-orange-400",
  },
  {
    name: "Clara Senric",
    image: "https://i.pravatar.cc/300?img=2",
    color: "bg-indigo-500",
  },
  {
    name: "Clara Senric",
    image: "https://i.pravatar.cc/300?img=3",
    color: "bg-rose-500",
  },
  {
    name: "Clara Senric",
    image: "https://i.pravatar.cc/300?img=4",
    color: "bg-green-500",
  },
];
const PotentialCandidate = () => {
  const carouselRef = useRef(null);
  const navigator = useNavigate();
  const prev = () => {
    carouselRef.current.prev();
  };

  const next = () => {
    carouselRef.current.next();
  };
  return (
    <div>
      <section
        className="relative  w-full overflow-hidden  py-18"
        style={{
          backgroundImage: `url(${botentialBackgournd})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute top-0 right-0 w-full h-full overlay-black-to-transparent " />

        <div className="relative z-10 flex flex-col items-center gap-12 p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#D1C4E9] uppercase">
            Các ứng viên tiềm năng
          </h1>

          <div className="flex flex-wrap justify-center gap-6">
            {candidates.map((candidate, idx) => {
              const middleIndex = Math.floor(candidates.length / 2);
              const distanceFromMiddle = Math.abs(idx - middleIndex);
              const translateY = distanceFromMiddle * 10;

              return (
                <div
                  key={idx}
                  style={{ transform: `translateY(${translateY}px)` }}
                  className={`relative w-60 rounded-2xl overflow-hidden shadow-lg ${
                    candidate.featured
                      ? "scale-110 shadow-2xl border-2 border-white"
                      : "opacity-80"
                  } transition-transform duration-300`}
                >
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="h-[380px] w-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3">
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarFilled key={i} className="!text-yellow-600" />
                      ))}
                    </div>
                    <div className="text-white text-center font-bold text-lg">
                      {candidate.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center bg-black py-40">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-full md:w-1/2 flex justify-center">
            <div className="relative w-80 h-[500px]">
              <div className="absolute inset-0 border-2 border-white transform translate-x-4 translate-y-4" />
              <div className="absolute inset-0 border-2 border-white transform -translate-x-4 -translate-y-4" />

              <img
                src="https://s3-alpha-sig.figma.com/img/465e/1832/d05fe9bc58aec579dbc285e0a9935ad7?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bqcZtkbJrQJQ1yzU3nlDZFLo4fYnkUT04V1ZmHOSbWBli8nDZF5CQtUDv919dWL6aIj~D5C1W4uPiI1NZHPmMDcUh~s~GbEgGW7HiKRPkN5FPIoMCSLzXjztNXzwa8TMyyN8YaIH7uVaE23s9nY2vm9jnnhRcuzANKSgVnj0BVkrptO1UZX7dKR-sQ0-ixwONV5mgyOYR4e1LhG1EqXeewRVjz9H0JZD5rhIaIkT2jzCfHsXHYVE2tJ1mww5JuQvAVyzh-jZitL-ry0-PEZoEI3-vDUqTI98PesaF14AFO71AjwoclNPfhQ8XkyqbWKHVucvz~~vvvvlSRE405KOVQ__"
                alt="Clara Senric"
                className="relative z-10 w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="absolute bottom-[-30px] flex gap-2 z-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarFilled key={i} className="!text-yellow-400 !text-4xl" />
              ))}
            </div>
          </div>

          {/* Phần nội dung */}
          <div className="w-full md:w-1/2 text-white flex flex-col gap-6 justify-end text-right">
            <h2 className="text-6xl font-bold">Clara Senric</h2>

            <p className="text-gray-300 leading-relaxed">
              Cô ấy là một người đầy nhiệt huyết và luôn đặt trọn tâm huyết vào
              mọi việc mình làm. Không chỉ sở hữu tư duy sắc bén, sự sáng tạo
              không giới hạn mà còn có một tinh thần trách nhiệm vô cùng cao.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Dù đối diện với thử thách lớn thế nào, cô vẫn luôn giữ được sự
              kiên định, kiên trì tìm ra giải pháp và không bao giờ bỏ cuộc. Bên
              cạnh tinh thần vững vàng và khả năng chuyên môn xuất sắc, cô còn
              là một người đồng đội tuyệt vời, luôn sẵn lòng hỗ trợ, truyền cảm
              hứng và tạo động lực cho những người xung quanh.
            </p>

            <div>
              <button className="px-8 py-4 bg-gradient-to-r cursor-pointer from-purple-500 to-blue-400 rounded-md text-white font-bold text-lg shadow-lg hover:opacity-90 transition">
                Mời phỏng vấn
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-center py-16 px-6"
        style={{
          backgroundImage: `url(${botentialSpecialBackground})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-4xl md:text-5xl text-white font-bold mb-12 text-center">
          CÁC ỨNG VIÊN NỔI BẬT
        </h2>

        <div className="relative w-full max-w-6xl">
          <button
            onClick={prev}
            className="absolute cursor-pointer' left-[-50px] top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white"
          >
            <LeftOutlined className="text-xl" />
          </button>

          <button
            onClick={next}
            className="absolute right-[-50px] cursor-pointer top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white"
          >
            <RightOutlined className="text-xl" />
          </button>

          <Carousel
            ref={carouselRef}
            slidesToShow={4}
            dots={false}
            draggable
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 640, settings: { slidesToShow: 1 } },
            ]}
          >
            {FeaturedCandidates.map((item, idx) => (
              <div key={idx} className="px-2">
                <div className="bg-black rounded-lg overflow-hidden shadow-lg flex flex-col items-center text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4 flex flex-col items-center">
                    <h3 className="text-white font-bold text-lg mb-3">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => navigator("/candidate-info/1")}
                      className={`px-6 py-2 ${item.color} rounded-full text-white font-semibold`}
                    >
                      XEM HỒ SƠ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="mt-16">
          <button
            className="px-8 py-4 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-100"
            onClick={() => navigator("/")}
          >
            QUAY LẠI TRANG CHỦ
          </button>
        </div>
      </section>
    </div>
  );
};

export default PotentialCandidate;
