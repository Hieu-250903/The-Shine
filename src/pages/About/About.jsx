import React from "react";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import whobackground from "../../assets/iamges/who.png";
import connectionAboutbackground from "../../assets/iamges/connectionAbout.jpg";
import vaueBackground from "../../assets/iamges/vaueBackgroundl.jpg";
import journeyAheadBackground from "../../assets/iamges/journeyAheadBackground.jpg";
const About = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* About Us Section - "CHÚNG TÔI LÀ AI?" */}
      <section className="relative bg-white text-black">
        {/* Decorative triangle in top left */}
        <div
          className="absolute left-0 top-0 w-24 h-24 bg-gray-500"
          style={{ clipPath: "polygon(0 0, 0% 100%, 100% 0)" }}
        ></div>

        {/* Decorative triangle in bottom left */}
        <div
          className="absolute left-0 bottom-0 w-24 h-24 bg-gray-500"
          style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%)" }}
        ></div>

        {/* Decorative element in top right */}
        <div className="absolute right-0 top-0">
          <div className="w-64 h-24 bg-gray-800 transform -skew-x-12 translate-x-12"></div>
        </div>

        {/* Horizontal lines */}
        <div className="absolute top-12 left-0 w-48 h-2 bg-black"></div>
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-3/4 h-1 bg-black"></div>

        <div className="max-w-6xl mx-auto px-8 py-16 flex relative">
          <div className="w-1/2 pr-12">
            <h2 className="text-3xl font-bold mb-8">CHÚNG TÔI LÀ AI?</h2>
            <div className="space-y-6">
              <p className="text-gray-700 text-sm">
                Trong một thế giới không ngừng thay đổi, nơi có hội và trình
                năng luôn canh tranh, The Shine đã đến với sứ mệnh đặt lại cơ
                nghiệp của những người đi trước. Để tạo nên những điều vĩ đại,
                chúng tôi cần một đội ngũ mạnh mẽ, một hệ sinh thái đủ mọi nền
                công nghệ và con người cùng hòa quyện để tạo ra những sự thay
                đổi.
              </p>
              <p className="text-gray-700 text-sm">
                The Shine tin rằng mỗi cá nhân đều có những giá trị đặc biệt,
                những điều mà họ có thể mài sắc những mảnh nhỏ xương phô hơn để
                phát triển và dẫn dắt những người khác. Chúng tôi muốn được kết
                nối cùng bạn để từng giai đoạn trong hành trình đó mang đến trải
                nghiệm tốt nhất tới các quý đối tác.
              </p>
              <p className="text-gray-700 text-sm">
                Chúng tôi không đơn thuần là một nền tảng giao tiếp hiện đại hai
                mà bằng công đoạn mới những giao diện dễ sử dụng, tạo nên những
                trải nghiệm giúp kết nối hàng triệu dấu.
              </p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center relative">
            <img
              src={whobackground}
              alt="Scrabble tiles"
              className="w-96 h-96 object-cover rotate-6"
            />
          </div>

          {/* Chat bubble button */}
          <div className="absolute bottom-20 right-8">
            <Button
              type="primary"
              shape="circle"
              size="large"
              className="!bg-red-500 border-none w-12 h-12 flex items-center justify-center"
              icon={
                <MessageOutlined style={{ fontSize: "20px", color: "white" }} />
              }
            />
          </div>
        </div>
      </section>

      {/* Connection Section - "KẾT NỐI VÀ KIẾN TẠO" */}
      <section className="bg-gray-900 relative">
        <div className="relative">
          {/* Full-width background image - ensure full display */}
          <img
            src={connectionAboutbackground}
            alt="Connection background"
            className="w-full max-h-[1000px] object-cover"
            style={{ objectPosition: "center 20%" }}
          />

          {/* Absolutely positioned text overlay - RIGHT ALIGNED */}
          <div className="absolute inset-0 flex flex-col justify-center items-end px-12">
            <div className="max-w-lg mr-0 ml-auto">
              <h2 className="text-3xl font-bold mb-8 text-white">
                KẾT NỐI VÀ KIẾN TẠO
              </h2>
              <div className="space-y-4">
                <p className="text-gray-200 text-sm">
                  Ở The Shine, chúng tôi đặt mình vào vấn đạt mạnh của sự kết
                  nối. Mỗi kết nối đồng nghĩa đang phát triển và thế giới đất
                  nước trở nên rộng lớn hơn với đến hướng đến cộng đồng công
                  nghệ tương lai thực bay chất lượng hơn.
                </p>
                <p className="text-gray-200 text-sm">
                  Chúng tôi hơn tất cả cam kết đồng hướng người có thêu cầu và
                  những giải pháp nhỏ nhất, với họ không chỉ đơn thuần là một
                  nền tảng trung gian, The Shine là một hệ thống sẽ mãi tiếp tục
                  phát triển gồm một số nền tảng và thích ứng mang lại sự thay
                  đổi tích cực cho mỗi đối tác của chúng tôi.
                </p>
                <p className="text-gray-200 text-sm">
                  Sứ mệnh của chúng tôi không chỉ là giúp người dùng tìm được
                  thứ họ cần tìm mà gúp họ trên con đường thức tỉnh, khám phá
                  những khả năng vô hạn đó để kết nối với hành tinh phát triển
                  đầu tư.
                </p>
                <p className="text-gray-200 text-sm">
                  Chúng tôi tin rằng kết nối không chỉ là một hành động, nó là
                  một cơ hội để phát triển. Mỗi sự nhận thức là một lời nhắc, là
                  sự kết hợp trọng điểm về thuật ngữ.
                </p>
                <p className="text-gray-200 text-sm">
                  Cùng nhau có thể làm nên hơn cả điều hơn những chúng mình trên
                  người trưởng có bọn mình, hướng đến tương lai, mở rộng sự kết
                  nối, và luôn luôn phát triển công.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Core Values Section - "GIÁ TRỊ CỐT LÕI" */}
      <section className="relative bg-gray-100 text-black">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="flex">
            {/* Phần ảnh */}
            <div className="w-full absolute inset-0">
              <img
                src={vaueBackground}
                alt="Asian woman in white clothes"
                className="w-full h-full object-fill"
              />
            </div>

            {/* Phần nội dung */}
            <div className="w-1/2 pr-8 relative z-10">
              <h2 className="text-3xl font-bold mb-6">GIÁ TRỊ CỐT LÕI</h2>

              <p className="text-gray-700 text-sm mb-4">
                Tại The Shine, mỗi quyết định và hành động của chúng tôi đều dựa
                trên những giá trị cốt lõi sau:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">1. Minh bạch & Tin cậy</h3>
                  <p className="text-gray-700 text-sm">
                    Trong mọi tình huống, chúng tôi đặt nền tảng minh bạch, quan
                    tâm cá nhân lên đầu tiên để xây dựng và duy trì niềm Theog
                    tin từ khách hàng, đối tác và cộng đồng xã hội của The Shine
                    luôn hướng đến.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">2. Chất lượng đỉnh cao</h3>
                  <p className="text-gray-700 text-sm">
                    Chúng tôi không chỉ mong cải thiện chất lượng mà chúng tôi
                    còng cầu không ngừng cải tiến. Theog mong tạo trình thêong
                    só tương, mọi nhât định chúng đến hài nghiệm tốt nhất cho
                    người dùng. Đội ngũ tài năng, phi tứe, chất của chúng tôi là
                    đại The Shine luôn tận dụng thông minh để bản tâng thành
                    trên.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">3. Cộng đồng & Kết nối</h3>
                  <p className="text-gray-700 text-sm">
                    Không chỉ dừng lại ở việc xây dựng một nền tảng mà còn lưu
                    dụng như cộng xự của các bạn. Chúng tôi muốn hiểu rõ nhu cầu
                    để hổ trợ nhà và công nhau phát triển. Mỗi nền tảng của
                    chúng tôi đều công lợi cho tất cáo người dùng tại mọi nơi
                    trên thế giới cũng như mỗi đối tác nhà cung cấp các thời
                    điểm kết nối chuong đơn lên thầm tình.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">4. Phát triển bền vững</h3>
                  <p className="text-gray-700 text-sm">
                    Chúng tôi không chấp nhận những gói trị ngắn hạn mà luôn
                    hướng đến sự phát triển bền vững. Điều này có nghĩa là mọi
                    khi nới tại The Shine chúng chiệt định từng là một quốc điều
                    khoản mà hệ sự đồng thuận. Đi cùng với thên quan, chúng tôi
                    tức là gia tăng áp dụng và nhân khẩu Ivọng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Ahead Section - "HÀNH TRÌNH PHÍA TRƯỚC" */}
      <section className="relative bg-gray-100 text-black">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="flex h-[900px]">
            {/* Phần ảnh */}
            <div className="w-full absolute inset-0">
              <img
                src={journeyAheadBackground}
                alt="Asian woman in white clothes"
                className="w-full h-full object-fill"
              />
            </div>

            {/* Phần nội dung */}
            <div className="w-1/2" />
            <div className="w-1/2 pr-8 relative z-10">
              <h2 className="text-4xl font-bold mb-8 text-white">
                HÀNH TRÌNH PHÍA TRƯỚC
              </h2>

              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Chúng tôi mời bạn cùng đồng hành phía trước của cải tiến và sự
                  đổi động những nuối tiêu chí của chúng có chèn hơn thông người
                  khác, bởi đồng nghĩa điều đó hoàn thành.
                </p>

                <p className="text-gray-300 text-sm">
                  Trong phần kết nối khách hàng với hệ thống chúng tôi các hào
                  đồi người dùng công dựng thành nhiều. Điều chéng tám giúp đó
                  không thí đoán và của tâng tất cá công việc sẽ nghiệm, nền
                  tảng mà anh ứng. Với các thiết vi linh hoạt sẽ giúp bạn cũng
                  hông.
                </p>

                <p className="text-gray-300 text-sm">
                  Hành trình này không chỉ với chúng tôi, mà còn với tất cá các
                  bạn. Hãy cùng xự dụng, chia sẽ bé chúng ta đồng hành xây dựng
                  "The Shine" - một nền tảng hữu ích, được đưa từ tường tâm, có
                  những giá trị mở rông như một công cụng đáp ứng mọi người.
                </p>

                <p className="text-gray-300 text-sm">
                  Hãy cùng The Shine trên một hành trình giúp đỡ chuyền thành
                  công.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
