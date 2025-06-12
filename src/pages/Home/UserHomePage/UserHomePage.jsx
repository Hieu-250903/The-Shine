import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import createCvbackground from "../../../assets/iamges/createCvbackground.jpg";
import workdayBackground from "../../../assets/iamges/workdayBackground.jpg";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../../services/category";
const UserHomePage = () => {
  const navigate = useNavigate();
  const [jobCategories, setJobCategories] = useState([]);
  useEffect(() => {
    const fetchCategoryData = async () => {
      const res = await getAllCategory();
      console.log("res", res);
      if (res) {
        setJobCategories(res);
      }
    };
    fetchCategoryData();
  }, []);
  return (
    <div className="w-full">
      <section className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${createCvbackground})`,
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 text-[#BD775A] z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            TÌM VIỆC DỄ DÀNG
            <br />
            NHẬN JOB NGAY VÀ LUÔN
          </h1>

          <div className="max-w-2xl mb-8 text-lg md:text-xl text-white">
            <p className="mb-4">
              Chúng tôi là các nội giậc người tim vền có thể tuyển dạng lãnh đối
              với hoàn nội quản thanh chứng để không sản hồn nhân.
            </p>
            <p>
              Để bằng công tin hiện đúng việc ngắn ban hàng đầu học vấn bằng cửa
              dụng tài giá, lựa tiếp hợp, trong quan trọt bởi việc ban nhà mạnh
              gửi góp. Với công ty và đơn giá, mình hoàn cảnh hành.
            </p>
          </div>

          <div className="w-20 h-1 bg-white my-6" />

          <Button
            onClick={() => navigate("/candidate-create-profile")}
            type="primary"
            size="large"
            className="w-fit !bg-[#BD775A] text-white font-bold py-6 px-8 flex items-center"
          >
            <span className="text-lg">TẠO HỒ SƠ NGAY</span>
            <ArrowRightOutlined className="ml-2" />
          </Button>
        </div>
      </section>
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${workdayBackground})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 text-white z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            1000+ CÔNG VIỆC
            <br />
            ĐƯỢC ĐĂNG MỖI NGÀY!
          </h2>

          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            Chúng tôi giúp hàng ngàn người tìm được việc làm nhanh chóng và tác
            động.
          </p>

          <Button
            type="primary"
            size="large"
            className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 flex items-center"
            onClick={() => navigate("/job-list")}
          >
            <span className="text-lg">XEM CÔNG VIỆC</span>
            <ArrowRightOutlined className="ml-2" />
          </Button>
        </div>
      </section>
      <div className="relative w-full min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${createCvbackground})`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            DANH MỤC CÔNG VIỆC NỔI BẬT
          </h1>

          <div className="space-y-8">
            {jobCategories?.map((category, index) => (
              <div
                onClick={() =>
                  navigate(`/job-list?category=${category.categoryId}}`)
                }
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                  {category.title}
                </h2>

                <ul className="space-y-2 mb-6">
                  {category?.subItems &&
                    category.subItems.split(",").map((item, i) => (
                      <li key={i} className="text-gray-700 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 mt-2 mr-2 bg-blue-500 rounded-full"></span>
                        {item.trim()}
                      </li>
                    ))}
                </ul>

                <div className="text-right">
                  <Button
                    type="text"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center ml-auto"
                  >
                    ĐẾN XEM <ArrowRightOutlined className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
