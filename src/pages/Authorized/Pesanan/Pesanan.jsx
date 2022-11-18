import React, { useState } from "react";

function Pesanan() {
    const [isSelected, setSelected] = useState(0);
  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
       <div className="flex border-b border-b-[#F1C232] scrollbar-thin scrollbar-thumb-[#402E32] scrollbar-track-zinc-200 h-28 overflow-x-scroll">
        <button className="px-12 border-r" onClick={()=>setSelected(0)} style={{backgroundColor: isSelected === 0 ? '#F1C232': ''}}>
            Semua Pembayaran
        </button>
        <button className="px-12 border-r" onClick={()=>setSelected(1)} style={{backgroundColor: isSelected === 1 ? '#F1C232': ''}}>
            Pembayaran Terkonfirmasi
        </button>
        <button className="px-12 border-r" onClick={()=>setSelected(2)} style={{backgroundColor: isSelected === 2 ? '#F1C232': ''}}>
            Menunggu Pickup
        </button>
        <button className=" px-12 border-r" onClick={()=>setSelected(3)} style={{backgroundColor: isSelected === 3 ? '#F1C232': ''}}>
            Pesanan Dalam Pengiriman
        </button>
        <button className=" px-12 border-r" onClick={()=>setSelected(4)} style={{backgroundColor: isSelected === 4 ? '#F1C232': ''}}>
            Proses Jahit
        </button>
        <button className=" px-12 border-r" onClick={()=>setSelected(5)} style={{backgroundColor: isSelected === 5 ? '#F1C232': ''}}>
            Dalam Pengantaran
        </button>
        <button className=" px-12 border-r" onClick={()=>setSelected(6)} style={{backgroundColor: isSelected === 6 ? '#F1C232': ''}}>
            Tambahan Biaya
        </button>
        <button className=" px-12 border-r" onClick={()=>setSelected(7)} style={{backgroundColor: isSelected === 7 ? '#F1C232': ''}}>
            Pesanan Selesai
        </button>
        <button className=" px-12 border-r" onClick={()=>setSelected(8)} style={{backgroundColor: isSelected === 8 ? '#F1C232': ''}}>
            Pesanan Diterima
        </button>
       </div>
       <div>
        <p>Conditional rendering inside</p>
       </div>
      </div>
    </div>
  );
}

export default Pesanan;
