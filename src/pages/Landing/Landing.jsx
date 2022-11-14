import React from "react";
import { HeaderWrapper } from "./style";
import { motion } from "framer-motion";
import HeaderWomanSewing from "../../assets/header-woman-sewing.png";

function Landing() {
  return (
    <>
    <HeaderWrapper className="md:py-32 h-screen md:h-fit lg:px-24 lg:h-[91vh]">
      <div className="flex flex-col gap-5 pt-12 px-5 w-full md:w-1/2 lg:w-full lg:px-24">
        <p className="text-2xl md:text-3xl lg:text-5xl w-fit px-3 lg:px-12 bg-slate-100 bg-opacity-80 py-3 font-bold">
          Temukan Penjahitmu
        </p>
        <p className="text-5xl bg-[#F1C232] px-3 lg:px-12 w-fit bg-opacity-80 py-3 font-bold">
          Dimanapun
        </p>
        <p className="text-5xl bg-[#F1C232] px-3 lg:px-12 w-fit bg-opacity-80 py-3 font-bold">
          Kapanpun
        </p>
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
        <img className="p-10 lg:p-0 lg:w-[80rem]" style={{zIndex:2}} src={HeaderWomanSewing} alt="" />
        {/* <img className='absolute w-[20rem] top-0' style={{zIndex:1}} src={HeaderSewing} alt="" /> */}
      </div>
    </HeaderWrapper>
    {/* <div className="my-40">
      <p className="text-center">Tentang Kami</p>
      <p className="text-center">Apa itu Jahitkeeun ?</p>
    </div> */}
    </>
  );
}

export default Landing;
