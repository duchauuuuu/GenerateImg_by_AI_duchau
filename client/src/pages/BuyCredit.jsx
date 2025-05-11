import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleBuy = async (plan) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    try {
      console.log("Initiating MoMo payment, token:", token);
      const { data } = await axios.post(
        `${backendUrl}/api/user/create-momo-payment`,
        {
          amount: plan.price,
          planId: plan.id,
          credits: plan.credits,
        },
        { headers: { token, Authorization: `Bearer ${token}` } }
      );
      console.log("MoMo payment response:", data);
      if (data.success) {
        window.location.href = data.payUrl;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in handleBuy:", error);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      className='min-h-[80vh] text-center pt-14 mb-10'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>
        Các gói tín dụng của chúng tôi
      </button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>
        Chọn gói tín dụng của bạn
      </h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border-none rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'
          >
            <img width={40} src={assets.logo_icon} alt='' />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>{item.price.toLocaleString('vi-VN')} VND</span> / {item.credits} tín dụng
            </p>
            <button
              onClick={() => handleBuy(item)}
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'
            >
              {user ? 'Mua ngay' : 'Bắt đầu'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;