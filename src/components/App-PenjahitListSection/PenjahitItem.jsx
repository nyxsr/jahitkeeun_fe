import React, { useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { NumericFormat } from 'react-number-format'

function PenjahitItem(props) {
  const baseStar = [];
  baseStar.length = props.rating ? props.rating : 0;

  
  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);
  return (
    <div className="flex justify-evenly w-80 mx-auto gap-5">
      <img
        src={"https://apijahitkeeun.tepat.co.id/photo-user/" + props.foto}
        className="w-1/4 object-cover md:w-1/3"
      />
      <div className="flex flex-col gap-2 w-full">
        <p className="font-bold text-xl md:text-2xl">{props.nama}</p>
        <p>{props?.distrik || props?.namaservis }</p>
        {props.price && <NumericFormat value={props.price} className='bg-transparent' thousandSeparator=',' prefix={'Rp.'} />}
        <p className="flex">
          {baseStar.length > 0 && <>
            {[...Array(baseStar.length)].map((e, i) => {
            return <AiFillStar key={i}/>;
          })}
          </>}
          {baseStar.length < 1 && <p>Belum ada rating</p>}
          
        </p>
      </div>
    </div>
  );
}

export default PenjahitItem;
