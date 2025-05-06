import React from 'react'
import { assets } from "../assets/assets";
const Header = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
      <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 
      rounded-full border border-neutral-500'>
        <p>Trình tạo văn bản hình ảnh tốt nhất</p>
        <img src={assets.star_icon}></img>
      </div>
      <h1 className='text-4xl max-w-[300] sm:text-6xl sm:max-w-[620px] 
      mx-auto mt-10 text-center'>
              Biến văn bản thành <span className='text-blue-600'>hình ảnh</span>, chỉ trong vài giây.
      </h1>
      <p className='text-center max-w-xl mx-auto mt-5'>
        Tạo hình ảnh chất lượng cao từ văn bản của bạn với công nghệ AI tiên tiến. 
        Chỉ cần nhập mô tả và để chúng tôi làm phần còn lại.
      </p>
      <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 
      flex items-center gap-2 rounded-full'>
           Tạo hình ảnh ngay
           <img className='h-6' src={assets.star_group} alt=''></img>
      </button>
      <div className='flex flex-wrap justify-center mt-16 gap-3'>
        {
          Array(6).fill('').map((item, index) => {
            return (
              <img className='rounded hover:scale-105 transition-all 
              duration-300 cursor-pointer max-sm:w-10' 
              src={index % 2 ===0 ? assets.sample_img_2 : assets.sample_img_1} 
              alt='' key={index} width={70}></img>
            )
          })
        }
      </div>
      <p className='mt-2 text-neutral-600'>Hình ảnh được tạo ra từ tưởng tượng</p>

    </div>
  )
}

export default Header