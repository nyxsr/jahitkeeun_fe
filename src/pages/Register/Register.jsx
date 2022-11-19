import React, { useEffect, useState } from "react";
import loginBg from "../../assets/login-bg.svg";
import {motion} from 'framer-motion'
import {BiArrowBack} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IS_AUTH } from "../../slice/isAuthSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let isAuthSelected = localStorage.getItem("isAuthSelected");
  
  const [data, setData] = useState({
    name:'',
    email:'',
    password:''
  })

  const registerHandle = async() =>{
    const loading = toast.loading('Sedang diproses...')
    try {
      const response = await axios.post('https://apijahitkeeun.tepat.co.id/api/auth/register', data,{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    }})
    console.log(response)
    toast.update(loading,{
      render:'Berhasil mendaftar!',
      type:'success',
      isLoading:false,
      autoClose:3000
    })
    setTimeout(()=>{
      navigate('/login')
    },2000)
    } catch (error) {
      {error.response.data.data.email &&
        toast.update(loading,{
          render:error.response.data.data.email[0],
          type:'error',
          isLoading:false,
          closeButton:true
        })}
 
     {error.response.data.data.name && 
      toast.update(loading,{
      render:error.response.data.data.name[0],
      type:'error',
      isLoading:false,
      closeButton:true
    })}
       
     
    
      {error.response.data.data.password && 
        toast.update(loading,{
        render:error.response.data.data.password[0],
        type:'error',
        isLoading:false,
        closeButton:true
      })}  
      
      console.log(error.response.data.data.email[0] || error.response.data.data.name[0] || error.response.data.data.password[0])
    }
  }
  
  const authHome = () => {
    dispatch(IS_AUTH(0))
    isAuthSelected = localStorage.getItem("isAuthSelected");
    window.location.href = '/'
  };
  useEffect(()=>{
    document.body.style.overflowX = 'hidden'
  },[])
  return (
    <>
      <div className="bg-white w-screen h-screen">
        <div className="lg:w-1/3 md:w-2/3 sm:h-screen w-screen mx-auto relative -z-0 bg-[#FFF8EA] pb-32">
          <ToastContainer/>
        <motion.div className="absolute border-2 border-black text-4xl p-3 rounded-md bg-white top-5 left-4">
          <BiArrowBack onClick={authHome}/>
        </motion.div>
          <img src={loginBg} alt="" className="w-72 absolute top-52 -z-10" />
          <div className="pt-36 px-5">
            <p className="text-4xl font-bold">Selamat datang !</p>
            <p>Ayo isi data-data berikut ini</p>
            <div>
              <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-7 pt-5 z-20">
                <input
                onChange={(e)=>setData((data)=>({...data,name:e.target.value}))}
                  type="text"
                  className="py-3 px-3 text-lg border border-[#1f1f1f] rounded-md"
                  autoFocus
                  placeholder="Masukkan nama anda..."
                  required
                />
                <input
                onChange={(e)=>setData((data)=>({...data,email:e.target.value}))}
                  type="email"
                  className="py-3 px-3 text-lg border border-[#1f1f1f] rounded-md"
                  placeholder="Masukkan email anda..."
                  required
                />
                 <input
                 onChange={(e)=>setData((data)=>({...data,password:e.target.value}))}
                  type="password"
                  className="py-3 px-3 text-lg border border-[#1f1f1f] rounded-md"
                  placeholder="Masukkan password anda..."
                  required
                />
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="bg-[#F1C232] py-4 rounded-md text-xl font-semibold"
                    onClick={registerHandle}
                  >
                    Daftar!
                  </button>
                  <p className="text-center">atau</p>
                  <button
                    className="bg-[#402E32] text-zinc-50 py-4 rounded-md text-xl font-semibold"
                    onClick={()=>navigate('/login')}
                  >
                    Sudah punya akun?
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

export default Register;
