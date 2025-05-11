import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser} =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password
        });
       console.log(data);
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
         
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
          const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password
        });
        console.log(data);
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
       
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30
    flex justify-center items-center "
    >
      <motion.form
        onSubmit={
          onSubmitHandler
        }
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state === "Login" ? "Đăng nhập" : "Đăng ký"}
        </h1>
        <p className="text-sm text-center">
          {state === "Login"
            ? "Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục"
            : "Vui lòng nhập các thông tin dưới để đăng ký"}
        </p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img className="h-6 w-6" src={assets.profile_icon} alt=""></img>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              className="outline-none text-sm"
              type="text"
              placeholder="Họ tên"
              required
            ></input>
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img className="h-6 w-6" src={assets.email_icon} alt=""></img>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="outline-none text-sm"
            type="email"
            placeholder="Email"
            required
          ></input>
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img className="h-6 w-6" src={assets.lock_icon} alt=""></img>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="outline-none text-sm"
            type="password"
            placeholder="Mật khẩu"
            required
          ></input>
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Quên mật khẩu?
        </p>
        <button   className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer">
          {state === "Login" ? "Đăng nhập" : "Tạo tài khoản"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Bạn không có tài khoản?
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-blue-600 cursor-pointer"
            >
              {" "}
              Đăng ký
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Bạn đã có tài khoản?
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-blue-600 cursor-pointer"
            >
              {" "}
              Đăng nhập
            </span>
          </p>
        )}

        <img
          onClick={() => {
            setShowLogin(false);
          }}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 
             right-5 cursor-pointer"
        ></img>
      </motion.form>
    </div>
  );
};

export default Login;
