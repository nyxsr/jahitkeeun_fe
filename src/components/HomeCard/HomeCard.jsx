import React from "react";
import { HiOutlineScissors } from "react-icons/hi";
import { motion } from "framer-motion";

function HomeCard(props) {
  return (
    <motion.div
      className="border-2 p-10 w-60 rounded-md hover:scale-110 hover:transition-all"
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      transition={{duration:.3,delay: props.id * 0.2}}
      viewport={{once:true}}
    >
      <HiOutlineScissors className="text-6xl text-[#F1C232]" />
      <p className="font-semibold text-xl">Baju Rusak ?</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, rerum!
      </p>
    </motion.div>
  );
}

export default HomeCard;
