import React, { useContext } from 'react'
import { assets } from "../assets/assets";
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler = () => {
    if(user){
      navigate('/result')
    }
    else{
      setShowLogin(true)
    }
  }
  return (
    <motion.div className='flex flex-col justify-center 
    items-center text-center my-20'
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1 , y: 0}}
    viewport={{once:true}}>

      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 
      rounded-full border border-neutral-500'
       initial={{opacity:0, y:-20}}
       animate={{opacity:1, y:0}}
       transition={{duration:0.8, delay:0.2}}>
        <p>Trình tạo văn bản hình ảnh tốt nhất</p>
        <img src={assets.star_icon}></img>
      </motion.div>
      
      <motion.h1 className='text-4xl max-w-[300] sm:text-6xl sm:max-w-[620px] 
      mx-auto mt-10 text-center'>
              Biến văn bản thành <span className='text-blue-600'
               initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{duration:2, delay:0.4}} >hình ảnh</span>, chỉ trong vài giây.
      </motion.h1>
      
      <motion.p className='text-center max-w-xl mx-auto mt-5'
       initial={{opacity:0, y:20}}
       animate={{opacity:1, y:0}}
       transition={{duration:0.8, delay:0.6}}>
        Tạo hình ảnh chất lượng cao từ văn bản của bạn với công nghệ AI tiên tiến. 
        Chỉ cần nhập mô tả và để chúng tôi làm phần còn lại.
      </motion.p>
      
      <motion.button onClick={()=>{onClickHandler()}} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 
      flex items-center gap-2 rounded-full cursor-pointer'
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{default:{duration:0.8}, opacity:{duration:1, delay:0.8}}}>
           Tạo hình ảnh ngay
           <img className='h-6' src={assets.star_group} alt=''></img>
      </motion.button>
      
      <motion.div className='flex flex-wrap justify-center mt-16 gap-3'
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:1, delay:1}}
      >
        {
          Array(6).fill('').map((item, index) => {
            return (
              <motion.img className='rounded hover:scale-105 transition-all 
              duration-300 cursor-pointer max-sm:w-10' 
              src={index % 2 ===0 ? assets.sample_img_2 : assets.sample_img_1} 
              alt='' key={index} width={70}
              whileHover={{scale:1.05, duration:0.1}}></motion.img>
            )
          })
        }
      </motion.div>
      <motion.p className='mt-2 text-neutral-600'
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{duration:0.8, delay:1.2}}>Hình ảnh được tạo ra từ tưởng tượng</motion.p>

    </motion.div>
  )
}

export default Header