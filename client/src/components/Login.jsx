import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
const Login = () => {
  const [state,setState] = useState('Login')
  const {setShowLogin} = useContext(AppContext)
  useEffect(()=>{
     document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      } 
  },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30
    flex justify-center items-center '>
      <form className='relative bg-white p-10 rounded-xl text-slate-500'>
             <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state === 'Login' ?'Đăng nhập':'Đăng ký'}</h1>
             <p className='text-sm text-center'>{state === 'Login' ? 'Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục' : 'Vui lòng nhập các thông tin dưới để đăng ký'}</p>
            
           {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img className='h-6 w-6' src={assets.profile_icon} alt=''></img>
              <input className='outline-none text-sm' type='text' placeholder='Họ tên' required></input>
             </div>}

               <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
              <img className='h-6 w-6' src={assets.email_icon} alt=''></img>
              <input className='outline-none text-sm' type='email' placeholder='Email' required></input>
             </div>

               <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
              <img className='h-6 w-6' src={assets.lock_icon} alt=''></img>
              <input className='outline-none text-sm' type='password' placeholder='Mật khẩu' required></input>
             </div>

             <p className='text-sm text-blue-600 my-4 cursor-pointer'>Quên mật khẩu?</p>
             <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Đăng nhập' : 'Tạo tài khoản'}</button>
            
            { state === 'Login' ? <p className='mt-5 text-center'>Bạn không có tài khoản?
             <span onClick={()=>{setState('Sign Up')}} className='text-blue-600 cursor-pointer'> Đăng ký</span></p>
             :  
             <p className='mt-5 text-center'>Bạn đã có tài khoản?
             <span onClick={()=>{setState('Login')}} className='text-blue-600 cursor-pointer'> Đăng nhập</span></p>}
             
             <img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt='' className='absolute top-5 
             right-5 cursor-pointer'></img>
      </form>
    </div>
  )
}

export default Login