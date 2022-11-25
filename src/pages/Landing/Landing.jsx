import React, { useEffect, useState } from "react";
import {useInView} from 'react-intersection-observer'
import { HeaderWrapper } from "./style";
import { motion, useAnimation } from "framer-motion";
import HeaderWomanSewing from "../../assets/header-woman-sewing.webp";
import AboutImage from '../../assets/about-image.webp'
import HomeCard from "../../components/HomeCard/HomeCard";
import JoinWoman from '../../assets/join-woman.webp'
import karakter from '../../assets/karakter.webp'
import logo from "../../assets/logo.svg";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";


function Landing() {
  const {ref, inView} = useInView();
  const controls = useAnimation();
  const navbar = localStorage.getItem('isAuthSelected')
  const navigate = useNavigate()
  const [isLoading,setLoading] = useState(true);
  useEffect(()=>{
    if (inView) {
      controls.start({
        opacity:1,
        transition:{
        duration:1,
        delayChildren: 0, // this will set a delay before the children start animating
        staggerChildren: 0.3  // this will set the time inbetween children animation
        }
      })
    }
    if(!inView){
      controls.start({
        opacity:0
      })
    }
  },[inView])
  
  const setLocalStorage = () =>{
    localStorage.setItem('isAuthSelected',0)
    navigate(0)
  }

  useEffect(()=>{
  let ignore = false
  if (!ignore) {
    if (!navbar) {
      setLocalStorage()
  }  
  }
  return ()=>{
    ignore = true
  }
  },[])
  return (
    <>
      <HeaderWrapper className="md:py-32 pt-20 h-screen md:h-fit lg:px-24 lg:h-[91vh]">
        <div className="flex flex-col gap-5 pt-12 px-5 w-full md:w-1/2 lg:w-full lg:px-24">
          <motion.p
            drag
            whileDrag={{ scale: 1.3 }}
            whileHover={{ y: -10 }}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1, delay:.2}}
            className="text-2xl md:text-3xl lg:text-5xl w-fit px-3 lg:px-12 bg-slate-100 bg-opacity-80 py-3 font-bold"
          >
            Temukan Penjahitmu
          </motion.p>
          <motion.p
            drag
            whileDrag={{ scale: 1.3 }}
            whileHover={{ y: -10 }}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1, delay:.4}}
            className="text-5xl bg-[#F1C232] px-3 lg:px-12 w-fit bg-opacity-80 py-3 font-bold"
          >
            Dimanapun
          </motion.p>
          <motion.p
            drag
            whileDrag={{ scale: 1.3 }}
            whileHover={{ y: -10 }}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1, delay:.5}}
            className="text-5xl bg-[#F1C232] px-3 lg:px-12 w-fit bg-opacity-80 py-3 font-bold"
          >
            Kapanpun
          </motion.p>
          <motion.div
            whileTap={{ x: 5 }}
            whileHover={{ x: 10 }}
            className="group flex justify-end items-end lg:items-start flex-col"
          >
            <a href="" className="text-zinc-50 group-hover:text-zinc-50 py-3">
              Pelajari Selengkapnya
            </a>
            <motion.hr className="border-[#F1C232] w-52 group-hover:w-72 group-hover:transition-all mt-3" />
          </motion.div>
        </div>
        <div className="relative hidden md:block lg:pr-52">
          <motion.img
            drag
            className="p-10 lg:p-0 lg:w-[80rem]"
            src={HeaderWomanSewing}
            alt=""
            width={1280}
          />
          {/* <img className='absolute w-[20rem] top-0' style={{zIndex:1}} src={HeaderSewing} alt="" /> */}
        </div>
      </HeaderWrapper>
      <div className="my-40 scroll-m-5 lg:scroll-m-28" id="about">
        <div className="flex flex-col justify-center items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center text-[#F1C232]"
          >
            Tentang Kami
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-3xl lg:text-5xl"
          >
            Apa itu Jahitkeeun ?
          </motion.p>
          <motion.hr
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-52 mt-5 lg:mt-8 border-[#F1C232]"
          />
        </div>
        <div className="flex justify-center gap-4 items-center flex-col mt-12 lg:mt-20">
      <motion.img src={AboutImage} alt="" initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:.5, delay:.2}} viewport={{once:true}} />
      <p className="text-center w-90 md:w-[40rem] lg:w-[70rem]">Aplikasi untuk membuka kesempatan penjahit rumahan agar mendapatkan klien ataupun pekerjaan borongan. Kami menyediakan sebuah tempat dimana Penjahit dan Klien bertemu.</p>
        </div>
        <motion.div animate={controls} viewport={{once:true}} ref={ref} className="flex px-10 justify-center items-center gap-5 lg:justify-evenly mt-10 flex-col md:flex-row md:flex-wrap">
          <HomeCard id={1}/>
          <HomeCard id={2}/>
          <HomeCard id={3}/>
          <HomeCard id={4}/>
        </motion.div>
      </div>
      <section className="bg-[#F1C232] relative py-10 md:py-20 scroll-m-28 overflow-x-hidden overflow-y-hidden" id='join'>
         <img src={karakter} alt="" className="absolute h-full right-[18rem] py-10 z-0" />
         <div className="flex flex-col lg:flex-row justify-between px-0 md:px-14">
          <div className="flex flex-col justify-center px-10 lg:px-30 z-10">
            <motion.p initial={{opacity:0, x:-10}} whileInView={{opacity:1, x:0}} transition={{delay:.9, duration:1}} viewport={{once:true}} className="font-bold text-3xl lg:text-6xl leading-[1.2]">Ayo bergabung menjadi bagian</motion.p>
            <motion.p initial={{opacity:0, x:-10}} whileInView={{opacity:1, x:0}} transition={{delay:.9, duration:1}} viewport={{once:true}} className="font-bold text-4xl lg:text-8xl text-zinc-50 leading-[1.2]">Penjahit Rumahan</motion.p>
            <motion.p initial={{opacity:0, x:-10}} whileInView={{opacity:1, x:0}} transition={{delay:.9, duration:1}} viewport={{once:true}} className="font-bold text-4xl lg:text-7xl text-zinc-50 leading-[1.2]">Sejahtera!</motion.p>
            <motion.button initial={{opacity:0, x:-10}} whileInView={{opacity:1, x:0}} whileHover={{scale:1.2}} viewport={{once:true}} transition={{type:'spring', bounce:.6, duration:.5}} className="font-semibold bg-zinc-50 w-fit px-10 py-5 text-xl rounded-2xl mt-5 shadow-xl">Daftar Sekarang!</motion.button>
          </div>
          <motion.img initial={{opacity:0, x:20}} whileInView={{opacity:1, x:0}} transition={{delay:.9, duration:1}} viewport={{once:true}} src={JoinWoman} alt="" className="z-20 absolute md:block w-full md:w-[30rem] md:right-0 -right-32 bottom-0"/>
         </div>
      </section>
      <div className="my-32 scroll-m-28" id="kontak">
        <div className="flex justify-evenly items-center flex-col md:flex-row border-2 mx-16 py-10 md:py-0 gap-10 md:gap-0">
          <img src={logo} alt="" className="w-52 pt-8" width={208}/>
          <p className="text-center md:text-left">Anda memiliki pertanyaan atau keluhan ?</p>
          <button className="bg-zinc-50 px-5 py-3 text-xl shadow-lg rounded-lg">Kontak Kami</button>
        </div>
      </div>
    <Footer/>
    </>
  );
}

export default Landing;
