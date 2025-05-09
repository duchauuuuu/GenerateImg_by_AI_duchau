import React, { useState } from 'react'
import {assets} from '../assets/assets'
import {motion} from 'framer-motion'
const Result = () => {
  const [image,setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input,setInput] = useState('')

  const onSubmitHandler =async (e) => {

  }

  return (
    <motion.form onClick={(e)=>{onSubmitHandler}} className='flex flex-col min-h-[90vh] 
    justify-center items-center'
      initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1 , y: 0}}
    viewport={{once:true}}>
    <div>
      <div className='relative'>
        <img src={image} alt='' className='max-w-sm rounded'></img>
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 
        ${loading ? 'w-full transition-all duration-[10s]' : 'w-0' }
        `}></span>
      </div>
      <p className={!loading ? 'hidden' : '' }>Đang tải...</p>
    </div>
    { !isImageLoaded && <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
      <input onChange={(e)=>{setInput(e.target.value)}} value={input} type='text' placeholder='Mô tả hình ảnh mà bạn muốn tạo' className='flex-1 bg-transparent 
      outline-none ml-8 max-sm:w-20 placeholder-color'></input>
      <button type='submit' className='bg-zinc-900 px-10 
      sm:px-16 py-3 rounded-full'>Tạo ảnh</button>
    </div>
    }
   {
    isImageLoaded &&  <div className='flex flex-wrap gap-2 justify-center text-white 
    text-sm p-0.5 mt-10 rounded-full'>
      <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900 
      text-black px-8 py-3 rounded-full cursor-pointer'>Tạo ảnh khác</p>
      <a href={image} download className=' bg-zinc-900 
       px-10 py-3 rounded-full cursor-pointer'>Tải xuống</a>
    </div>
   }
    </motion.form>
  )
}

export default Result