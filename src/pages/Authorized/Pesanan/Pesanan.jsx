import axios from "axios";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Pesanan() {
  const [isSelected, setSelected] = useState(0);

  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
        <div className="flex border-b border-b-[#F1C232] scrollbar-thin scrollbar-thumb-[#402E32] scrollbar-track-zinc-200 h-28 overflow-x-scroll">
          <button
            className="px-12 border-r"
            onClick={() => setSelected(0)}
            style={{ backgroundColor: isSelected === 0 ? "#F1C232" : "" }}
          >
            Semua Pembayaran
          </button>
          <button
            className="px-12 border-r"
            onClick={() => setSelected(1)}
            style={{ backgroundColor: isSelected === 1 ? "#F1C232" : "" }}
          >
            Pembayaran Terkonfirmasi
          </button>
          <button
            className="px-12 border-r"
            onClick={() => setSelected(2)}
            style={{ backgroundColor: isSelected === 2 ? "#F1C232" : "" }}
          >
            Menunggu Pickup
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(3)}
            style={{ backgroundColor: isSelected === 3 ? "#F1C232" : "" }}
          >
            Pesanan Dalam Pengiriman
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(4)}
            style={{ backgroundColor: isSelected === 4 ? "#F1C232" : "" }}
          >
            Proses Jahit
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(5)}
            style={{ backgroundColor: isSelected === 5 ? "#F1C232" : "" }}
          >
            Dalam Pengantaran
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(6)}
            style={{ backgroundColor: isSelected === 6 ? "#F1C232" : "" }}
          >
            Tambahan Biaya
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(7)}
            style={{ backgroundColor: isSelected === 7 ? "#F1C232" : "" }}
          >
            Pesanan Selesai
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(8)}
            style={{ backgroundColor: isSelected === 8 ? "#F1C232" : "" }}
          >
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

export function PesananTaylor(props) {
  const data = JSON.parse(sessionStorage.getItem("data"));
  const token = sessionStorage.getItem("token");
  const [isSelected, setSelected] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const [list, setList] = useState();

  const getPesanan = async () => {
    try {
      const response = await axios.get(
        `http://apijahitkeeun.tepat.co.id/api/dashboardtaylororder/${parseInt(
          data.taylor.user_id
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getPesanan();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
        <div className="flex border-b border-b-[#F1C232] scrollbar-thin scrollbar-thumb-[#402E32] scrollbar-track-zinc-200 h-28 overflow-x-scroll">
          <button
            className="px-12 border-r"
            onClick={() => setSelected(0)}
            style={{ backgroundColor: isSelected === 0 ? "#F1C232" : "" }}
          >
            Semua Pembayaran
          </button>
          <button
            className="px-12 border-r"
            onClick={() => setSelected(1)}
            style={{ backgroundColor: isSelected === 1 ? "#F1C232" : "" }}
          >
            Pembayaran Terkonfirmasi
          </button>
          <button
            className="px-12 border-r"
            onClick={() => setSelected(2)}
            style={{ backgroundColor: isSelected === 2 ? "#F1C232" : "" }}
          >
            Menunggu Pickup
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(3)}
            style={{ backgroundColor: isSelected === 3 ? "#F1C232" : "" }}
          >
            Pesanan Dalam Pengiriman
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(4)}
            style={{ backgroundColor: isSelected === 4 ? "#F1C232" : "" }}
          >
            Proses Jahit
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(5)}
            style={{ backgroundColor: isSelected === 5 ? "#F1C232" : "" }}
          >
            Dalam Pengantaran
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(6)}
            style={{ backgroundColor: isSelected === 6 ? "#F1C232" : "" }}
          >
            Tambahan Biaya
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(7)}
            style={{ backgroundColor: isSelected === 7 ? "#F1C232" : "" }}
          >
            Pesanan Selesai
          </button>
          <button
            className=" px-12 border-r"
            onClick={() => setSelected(8)}
            style={{ backgroundColor: isSelected === 8 ? "#F1C232" : "" }}
          >
            Pesanan Diterima
          </button>
        </div>
        <div>
          <AnimatePresence>
            {isLoading && <p className="text-center">Memuat pesanan...</p>}
            {isLoading === false && (
              <>
                {isSelected === 0 && (
                    <>
                    <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                      <p className="font-bold">Nama Penjahit</p>
                      <p className="">No. Invoice</p>
                    </div>
                    <p className="bg-[#f1c232] py-1 px-2 rounded-md">Status Bayar</p>
                  </div>
                  <hr />
                  <div className="flex justify-around py-3">
                    <img src="https://source.unsplash.com/100x100" alt="" className="rounded-md" />
                    <div className="flex flex-col">
                        <p className="font-bold text-xl">Nama Item</p>
                        <p>Nama Service</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p>x1</p>
                        <p>Rp.Total Bayar</p>
                    </div>
                 
                  </div>
                  <hr />
                  <div className="flex items-center px-3 py-3 justify-between">
                        <p>1 item</p>
                        <div className="flex flex-col items-end">
                            <p>Total Pembayaran:</p>
                            <p className="font-bold">Rp.300000</p>
                        </div>
                    </div>
                    </div>
                    <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                      <p className="font-bold">Nama Penjahit</p>
                      <p className="">No. Invoice</p>
                    </div>
                    <p className="bg-[#f1c232] py-1 px-2 rounded-md">Status Bayar</p>
                  </div>
                  <hr />
                  <div className="flex justify-around py-3">
                    <img src="https://source.unsplash.com/100x100" alt="" className="rounded-md" />
                    <div className="flex flex-col">
                        <p className="font-bold text-xl">Nama Item</p>
                        <p>Nama Service</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p>x1</p>
                        <p>Rp.Total Bayar</p>
                    </div>
                 
                  </div>
                  <hr />
                  <div className="flex items-center px-3 py-3 justify-between">
                        <p>1 item</p>
                        <div className="flex flex-col items-end">
                            <p>Total Pembayaran:</p>
                            <p className="font-bold">Rp.300000</p>
                        </div>
                    </div>
                    </div>
                    <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                      <p className="font-bold">Nama Penjahit</p>
                      <p className="">No. Invoice</p>
                    </div>
                    <p className="bg-[#f1c232] py-1 px-2 rounded-md">Status Bayar</p>
                  </div>
                  <hr />
                  <div className="flex justify-around py-3">
                    <img src="https://source.unsplash.com/100x100" alt="" className="rounded-md" />
                    <div className="flex flex-col">
                        <p className="font-bold text-xl">Nama Item</p>
                        <p>Nama Service</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p>x1</p>
                        <p>Rp.Total Bayar</p>
                    </div>
                 
                  </div>
                  <hr />
                  <div className="flex items-center px-3 py-3 justify-between">
                        <p>1 item</p>
                        <div className="flex flex-col items-end">
                            <p>Total Pembayaran:</p>
                            <p className="font-bold">Rp.300000</p>
                        </div>
                    </div>
                    </div>
                    </>
                )}
                {isSelected === 1 && (
                  <p>Ini nunjukin pembayaran terkonfirmasi</p>
                )}
                {isSelected === 2 && <p>Ini nunjukin menunggu pickup</p>}
                {isSelected === 3 && (
                  <p>Ini nunjukin pesanan dalam pengiriman</p>
                )}
                {isSelected === 4 && <p>Ini nunjukin proses jahit</p>}
                {isSelected === 5 && <p>Ini nunjukin dalam pengantaran</p>}
                {isSelected === 6 && <p>Ini nunjukin tambahan biaya</p>}
                {isSelected === 7 && <p>Ini nunjukin pesanan selesai</p>}
                {isSelected === 8 && <p>Ini nunjukin pesanan diterima</p>}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
