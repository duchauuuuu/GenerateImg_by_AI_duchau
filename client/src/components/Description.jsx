import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
const Description = () => {
  return (
    <motion.div className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1 , y: 0}}
    viewport={{once:true}}>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Tạo hình ảnh AI
      </h1>
      <p className="text-gray-500 mb-8">
        Biến trí tưởng tượng của bạn thành hình ảnh
      </p>
      <div className="flex flex-col gap-5 md:gap-14  md:flex-row items-center">
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">Giới thiệu Trình tạo văn bản thành hình ảnh hỗ trợ AI</h2>
          <p className="text-gray-600 mb-4">
            Dễ dàng hiện thực hóa ý tưởng của bạn bằng trình tạo hình ảnh AI
            miễn phí của chúng tôi. Cho dù bạn cần hình ảnh ấn tượng hay hình
            ảnh độc đáo, công cụ của chúng tôi sẽ biến đổi văn bản của bạn thành
            hình ảnh bắt mắt chỉ với một vài cú nhấp chuột. Hãy tưởng tượng, mô
            tả và xem nó trở nên sống động ngay lập tức.
          </p>
          <p className="text-gray-600">
            Chỉ cần nhập lời nhắc văn bản, và AI tiên tiến của chúng tôi sẽ tạo
            ra hình ảnh chất lượng cao trong vài giây. Từ hình ảnh sản phẩm đến
            thiết kế nhân vật và chân dung, ngay cả những khái niệm chưa tồn tại
            cũng có thể được hình dung một cách dễ dàng. Được hỗ trợ bởi công
            nghệ AI tiên tiến, khả năng sáng tạo là vô hạn!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
