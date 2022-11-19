import React, { useEffect } from "react";
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'

function PenjahitItem(props) {
    const baseStar = ['','','','','']
    useEffect(()=>{
        document.body.style.overflowY = 'hidden'
    },[])
  return (
    <div className="flex px-8 md:px-10 gap-5">
      <img src="https://source.unsplash.com/100x100?person" className="w-1/2 md:w-1/3" />
      <div className="flex flex-col gap-2">
        <p className="font-bold text-2xl md:text-2xl">{props.nama}</p>
        <p>Jenis Keahlian</p>
        <p className="flex">
          {baseStar.map((v, i) => {
            return <AiFillStar key={i} />;
          })}
        </p>
      </div>
    </div>
  );
}

export default PenjahitItem;
