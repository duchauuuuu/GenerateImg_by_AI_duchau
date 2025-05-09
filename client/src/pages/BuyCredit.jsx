import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
const BuyCredit = () => {
  const {user} = useContext(AppContext)
  return (
    <motion.div className='min-h-[80vh] text-center pt-14 mb-10'
     initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1 , y: 0}}
    viewport={{once:true}}>
        <button className='border border-gray-400 px-10 py-2 
        rounded-full mb-6'>Các gói tín dụng của chúng tôi</button>
        <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>
          Chọn gói tín dụng của bạn
        </h1>
        <div className='flex flex-wrap justify-center gap-6 text-left'>
          {plans.map((item,index)=>{
             return(
              <div key={index} className='bg-white drop-shadow-sm border-none rounded-lg py-12
              px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
                   <img width={40} src={assets.logo_icon} alt=''></img>
                   <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
                   <p className='text-sm'>{item.desc}</p>
                   <p className='mt-6'><span className='text-3xl 
                   font-medium'>${item.price}</span> / {item.credits} tín dụng</p>
                   <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md 
                   py-2.5 min-w-52'>{user ? 'Mua ngay' : 'Bắt đầu'}</button>
              </div>
             )
          })}
        </div>
    </motion.div>
  )
}

export default BuyCredit