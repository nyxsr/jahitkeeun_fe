import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import axios from "axios";
import {motion} from 'framer-motion'
import { NumericFormat } from "react-number-format";
import { AnimatePresence } from "framer-motion";
import LoadingCheckout from '../../assets/loading-checkout.gif'

function AppCart() {
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("data"));
  const token = sessionStorage.getItem("token");
  const [isCheckout, setCheckout] = useState(false);
  const [status, setStatus] = useState();
  const [isLoading, setLoading] = useState(true);
  const [cart, setCart] = useState();
  let marginBottom;
  let grandTotal;
  let price;

  const getCart = async () => {
    try {
      const response = await axios.get(
        `http://api.jahitkeeun.my.id/api/sectionitem/userId/${data.client.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setStatus(error.response.status);
    }
  };

  const checkouted = () =>{
    setCheckout(true)
    setTimeout(() => {
      navigate('../home/checkout')
    }, 2000);
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getCart();
    }
    return () => {
      ignore = true;
    };
  }, []);

  console.log(status);

  return (
    <AnimatePresence>
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] relative mx-auto py-10 pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
        {isCheckout && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-white/75 z-50 absolute top-0 flex flex-col justify-center items-center w-full h-full">
          <img src={LoadingCheckout} className='w-20' alt="" />
          <p>Pembayaran sedang disiapkan...</p>
        </motion.div>
        )}
        <div className="flex items-center mt-5 ml-5 gap-4">
          <button
            className="bg-[#402E32] text-zinc-50 rounded-md py-3 px-3"
            onClick={() => navigate("../home")}
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <p className="text-xl font-semibold">Cart</p>
        </div>
        {isLoading === true && <p className="text-center">Memuat...</p>}
        {isLoading === false && (
          <>
            {status === 404 && (
              <p className="text-center mt-20">
                Anda belum menambahkan apapun ke Cart
              </p>
            )}
            {!status && (
              <>
                {cart.map((v, i, cart) => {
                  if (i + 1 === cart.length) {
                    marginBottom = "15rem";
                  }
                  price = cart.map((v) => {
                    return v.price * v.quantity;
                  });
                  grandTotal = price.reduce((total, current) => {
                    return parseInt(total) + parseInt(current);
                  });
                  let reverse = grandTotal
                      .toString()
                      .split("")
                      .reverse()
                      .join(""),
                    ribuan = reverse.match(/\d{1,3}/g);
                  ribuan = ribuan.join(".").split("").reverse().join("");
                  return (
                    <>
                      <div
                        key={i}
                        style={{
                          marginBottom: marginBottom ? marginBottom : "",
                        }}
                        className="mt-3 my-10 bg-white px-3 py-3 mx-3 rounded-md shadow-md"
                      >
                        <p>{v.namataylor}</p>
                        <hr />
                        <div className="py-5 flex justify-between">
                          <div className="flex gap-3">
                            <img
                              src={
                                "http://api.jahitkeeun.my.id/photo-item/" +
                                v.photoItem
                              }
                              alt="fotoproduk"
                              className="rounded-md w-12 h-12 py-1 px-1 bg-[#402E32]"
                            />
                            <div className="flex flex-col">
                              <p className="font-bold text-xl">{v.item}</p>
                              <p>{v.serviceName}</p>
                            </div>
                          </div>
                          <div className="flex flex-col text-right mt-3">
                            <p>x{v.quantity}</p>
                            <p className="text-xl font-bold">
                              Rp.{parseInt(v.price)}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end items-center gap-4">
                          <FaTrash className="text-xl text-red-500" />
                          <div className="flex items-center border">
                            <BsChevronLeft className="border bg-black text-white text-2xl py-1 px-1 h-full" />
                            <input
                              type="text"
                              className="w-8 text-center"
                              value={v.quantity}
                            />
                            <BsChevronRight className="border bg-black text-white text-2xl py-1 px-1 h-full" />
                          </div>
                        </div>
                        <p className="font-semibold">Deskripsi Pesanan :</p>
                        {v.description && <p>{v.description}</p>}
                        {!v.description && (
                          <p className="italic">Tidak ada deskripsi</p>
                        )}
                      </div>
                      <div className="fixed bottom-14 bg-[#F1C232] py-5 px-4 rounded-t-lg md:w-[30.375rem] w-screen">
                        <p className="text-xl">Total :</p>
                        <p className="text-3xl font-bold">Rp.{ribuan}</p>
                        <button className="text-xl text-center bg-[#402e32] text-white w-full py-3 mt-3 rounded-md" onClick={checkouted}>
                          Lanjut Bayar
                        </button>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
    </AnimatePresence>
  );
}

export default AppCart;
