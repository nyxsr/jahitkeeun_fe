import React, { useEffect, useState } from "react";
import loginBg from "../../assets/login-bg.svg";
import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IS_AUTH } from "../../slice/isAuthSlice";
import { IN_NAVBAR_APP } from "../../slice/inNavbarApp";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const token = sessionStorage.getItem('token')
  const {state} = useLocation();

  useEffect(()=>{
    if (state?.warning) {
      toast.warning(state.warning)
    }
  },[])

  useEffect(()=>{
    if (token) {
      navigate('../app/home')
    }
  },[])

  let isAuthSelected = localStorage.getItem("isAuthSelected");

  const authHome = () => {
    dispatch(IS_AUTH(0));
    isAuthSelected = localStorage.getItem("isAuthSelected");
    window.location.href = "/";
  };

  const loginClicked = async () => {
    const loading = toast.loading("Sedang Diproses dulu ya...");
    try {
      const response = await axios.post(
        "https://api.jahitkeeun.my.id/api/auth/login",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      //Base Response Success
      //response.data.data.token
      toast.update(loading, {
        render: "Berhasil Masuk!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      sessionStorage.setItem("token", response.data.data.token);
      sessionStorage.setItem("data", JSON.stringify(response.data.data));
      dispatch(IN_NAVBAR_APP(true));
      if (response.data.data.role ==='client') {
        navigate("../app/home");
        navigate(0);
      }else if(response.data.data.role === 'taylor'){
        navigate("../app/taylor/home");
        navigate(0);
      }else if(response.data.data.role === 'convection'){
        navigate("../app/convection/home");
        navigate(0);
      }
     
    } catch (error) {
      {
        error.response.data.data.password &&
        toast.update(loading,{
          render:error.response.data.data?.password[0],
          type:'error',
          isLoading:false,
          autoClose:3000
        });
      }
      {
        error.response.data.data.email &&
        toast.update(loading,{
          render:error.response.data.data?.email[0],
          type:'error',
          isLoading:false,
          autoClose:3000
        });
      }
      {
        error.response.data.meta.message &&
        toast.update(loading,{
          render:error.response.data.meta?.message,
          type:'error',
          isLoading:false,
          autoClose:3000
        });
      }
    }
  };
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);
  // console.log(data)
  return (
    <>
      <div className="bg-white w-screen h-screen">
        <div className="lg:w-1/3 md:w-2/3 sm:h-screen w-screen mx-auto relative -z-0 bg-[#FFF8EA] pb-32">
          <ToastContainer/>
          <motion.div className="absolute border-2 border-black text-4xl p-3 rounded-md bg-white top-5 left-4">
            <BiArrowBack onClick={authHome} />
          </motion.div>
          <img src={loginBg} alt="" className="w-72 absolute top-52 -z-10" />
          <div className="pt-36 px-5">
            <p className="text-4xl font-bold">Hi, Ketemu lagi...</p>
            <p>Silahkan login untuk melanjutkan</p>
            <div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-7 pt-5 z-20"
              >
                <input
                  type="email"
                  className="py-3 px-3 text-lg border border-[#1f1f1f] rounded-md"
                  autoFocus
                  placeholder="Masukkan email anda..."
                  onChange={(e) =>
                    setData((data) => ({ ...data, email: e.target.value }))
                  }
                />
                <input
                  type="password"
                  className="py-3 px-3 text-lg border border-[#1f1f1f] rounded-md"
                  placeholder="Masukkan Password anda..."
                  onChange={(e) =>
                    setData((data) => ({ ...data, password: e.target.value }))
                  }
                />
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="bg-[#F1C232] py-4 rounded-md text-xl font-semibold"
                    onClick={loginClicked}
                  >
                    Masuk
                  </button>
                  <p className="text-center">atau</p>
                  <button
                    type="submit"
                    className="bg-[#402E32] text-zinc-50 py-4 rounded-md text-xl font-semibold"
                    onClick={() => navigate("/register")}
                  >
                    Daftar Disini!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
