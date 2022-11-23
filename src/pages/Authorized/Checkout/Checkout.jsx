import axios from "axios";
import { shortText } from "limit-text-js";
import React, { useEffect, useRef, useState } from "react";
import { FaLocationArrow, FaTruck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadingCheckout from "../../../assets/loading-checkout.gif";
import { AnimatePresence, motion } from "framer-motion";
import DoneCheckout from "../../../assets/done.gif";
import FailCheckout from "../../../assets/fail-icegif-10.gif";

function Checkout() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("data"));
  const [alamat, setAlamat] = useState(null);
  const [items, setItems] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [imgshipping, setimgShipping] = useState(null);
  const [idshipping, setIdShipping] = useState(null);
  const [status, setStatus] = useState("");
  let grandTotal = useRef(0);
  const [post, setPost] = useState({
    user_id: data.client.user_id,
    amount: 0,
    address: null,
    deliveries_id: 1,
    payment_method_id: 1,
    shipping_method_id: idshipping,
  });
  let datashipping;

  // Return the total price of checkout items
  function sumPrice() {
    grandTotal.current = items
      ?.map((v) => v.price * v.quantity)
      .reduce((total, current) => parseInt(total) + parseInt(current));
  }

  console.log(post);

  const getAlamat = async () => {
    try {
      const response = await axios.get(
        `http://apijahitkeeun.tepat.co.id/api/sectionitemalamat/${data.client.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlamat(response.data.data[0].alamat);
      setPost((post) => ({ ...post, address: response.data.data[0].alamat }));
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      const response = await axios.get(
        `http://apijahitkeeun.tepat.co.id/api/sectionitem/userId/${data.client.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOptionsShipping = async () => {
    try {
      const response = await axios.get(
        "http://apijahitkeeun.tepat.co.id/api/shippingmethod",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShipping(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    setStatus("pending");
    try {
      const response = await axios.post(
        `http://apijahitkeeun.tepat.co.id/api/sectionitem/checkout`,
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus("resolve");
      setTimeout(() => {
        navigate('/app/home')
      }, 2000);
    } catch (error) {
      setStatus("failed");
    }
  };

  const imageShipping = (element) =>
    element.shipping_method_name === imgshipping;
  const indexImage = shipping?.findIndex(imageShipping);

  datashipping = shipping?.map((v, i) => {
    const item = {};
    item.label = v.shipping_method_name;
    item.value = v.shpping_method_id;

    return item;
  });

  useEffect(() => {
    sumPrice();
    setPost((post) => ({ ...post, amount: grandTotal.current }));
  }, [items]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getAlamat();
      getItems();
      getOptionsShipping();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <AnimatePresence>
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto py-10 pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
        {status === "pending" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/75 z-50 absolute top-0 flex flex-col justify-center items-center w-full h-full"
          >
            <img src={LoadingCheckout} className="w-20" alt="" />
            <p>Pembayaran sedang Diproses...</p>
          </motion.div>
        )}
        {status === "resolve" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/75 z-50 absolute top-0 flex flex-col justify-center items-center w-full h-full"
          >
            <img src={DoneCheckout} className="w-20" alt="" />
            <p>Pembayaran Berhasil Dilakukan</p>
          </motion.div>
        )}
        {status === "failed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 z-50 absolute top-0 flex flex-col justify-center items-center w-full h-full"
          >
            <img src={FailCheckout} className="px-5" alt="" />
            <p className="">Pembayaran Gagal</p>
          </motion.div>
        )}

        <div className="flex items-center mt-5 ml-5 gap-4">
          <button
            className="bg-[#402E32] text-zinc-50 rounded-md py-3 px-3"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <p className="text-xl font-semibold">Checkout</p>
        </div>
        <div className="flex mx-5 px-3 items-center gap-3 bg-white py-3 mt-3 rounded-md shadow-md">
          <FaLocationArrow className="text-3xl text-[#402E32]" />
          <div className="flex flex-col">
            <p>Dikirim ke :</p>
            <p className="text-xl">
              {alamat ? shortText(alamat, 25, "...") : "Tidak ada data"}
            </p>
          </div>
        </div>
        <div className="flex flex-col mx-5 px-3 gap-3 bg-white py-3 mt-3 rounded-md shadow-md">
          {items === null && (
            <p className="text-center">Sedang memuat pesanan anda...</p>
          )}
          {items && (
            <>
              {items?.map((v, i) => {
                return (
                  <>
                    <div key={i} className="flex gap-2 items-center">
                      <img
                        src={
                          "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                          v.photoRef
                        }
                        className="rounded-md w-20 h-20"
                        alt=""
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-xl">
                          {v.item} by {v.namataylor}
                        </p>
                        <p>{v.serviceName}</p>
                        <p>
                          {v.quantity} x Rp.{parseInt(v.price)}
                        </p>
                        <p className="text-right">
                          Catatan : <q>{v.description}</q>
                        </p>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </>
          )}
        </div>
        <div className="flex flex-col mx-5 px-3 gap-3 bg-white py-3 mt-3 rounded-md shadow-md">
          <p>Pilih Metode Pengiriman</p>
          <FaTruck className="text-5xl text-center mx-auto" />
          {datashipping === null && (
            <Select placeholder="Jasa Kirim..." isLoading isDisabled />
          )}
          {datashipping && (
            <Select
              placeholder="Jasa Kirim..."
              required
              options={datashipping}
              onChange={(event) => {
                setimgShipping(event.label);
                setPost((post) => ({
                  ...post,
                  shipping_method_id: event.value,
                }));
              }}
            />
          )}
        </div>
        <div className="flex flex-col mx-5 px-3 gap-3 bg-white py-3 mt-3 rounded-md shadow-md">
          <p className="font-bold">Ringkasan Belanja</p>
          <div className="flex justify-between">
            <p>Total Harga</p>
            {items?.map((v, i) => {
              return (
                <NumericFormat
                  key={i}
                  value={grandTotal.current}
                  prefix={"Rp."}
                  thousandSeparator={","}
                  displayType="text"
                />
              );
            })}
          </div>
          <hr />
          <div className="flex font-bold justify-between">
            <p className="text-2xl">Total Bayar</p>
            <NumericFormat
              value={grandTotal.current}
              prefix={"Rp."}
              thousandSeparator={","}
              displayType="text"
              className="text-2xl"
            />
          </div>
          <button className="bg-[#F1C232] py-3 rounded-md" onClick={checkout}>
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
    </AnimatePresence>
  );
}

export default Checkout;
