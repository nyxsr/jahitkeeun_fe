import axios from "axios";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { toast, ToastContainer } from "react-toastify";
import DefaultPreview from '../../../assets/default_preview.webp'
import { useDispatch, useSelector } from "react-redux";
import { TOGGLED } from "../../../slice/toggleSlice";
import LoadingButton from '../../../assets/loading-button.gif'
import { Navigate, useNavigate } from "react-router-dom";

function Pesanan() {
  const [isSelected, setSelected] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const data = JSON.parse(sessionStorage.getItem("data"));
  const token = sessionStorage.getItem("token");
  const [list, setList] = useState();
  const [pendingList, setPendingList] = useState();
  const [status,setStatus] = useState(null);
  const [pendingLoad, setPendingLoad] = useState(true);
  let endOfScreen = false;

  const getPesanan = async () => {
    setLoading(true)
    if (isSelected === 1) {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclientorderpembayaranterkonfirmasi/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    } else if (isSelected === 2) {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclientordermenunggupickup/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    } else if (isSelected === 3) {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclientpesanandalampengiriman/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    } else if (isSelected === 4) {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclientprosesjahit/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    } else if (isSelected === 5) {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclientdalampengantaran/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    } else if (isSelected === 6) {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclienttambahanbiaya/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    } else if (isSelected === 7) {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclientpesananselesai/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    } else if (isSelected === 8) {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclientpesananditerima/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.get(
          `http://api.jahitkeeun.my.id/api/dashboardclientorder/${parseInt(
            data.client.user_id
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.data);
        setStatus(null);
      } catch (error) {
        if (error.response.status === 404) {
          setStatus('Data tidak ada')
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const getMenungguPembayaran = async () => {
    try {
      const response = await axios.get(
        `http://api.jahitkeeun.my.id/api/dashboardclientordermenunggupembayaran/${parseInt(
          data.client.user_id
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingList(response.data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPendingLoad(false);
    }
  };

  const payOrder = async(id) =>{
    const tanya = window.confirm('Apakah anda yakin akan membayar ?')
    if (!tanya){
      return;
    }
    try {
      const response = await axios.post(`http://api.jahitkeeun.my.id/api/ubahstatusorderdetailId/${id}`,{'orderstatus':'Menunggu Pickup'},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      toast.success('Pembayaran Telah Dikonfirmasi! Terima Kasih!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      getPesanan();
    } catch (error) {
      toast.error('Oops sepertinya ada masalah!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const pickuped = async(id) =>{
    const tanya = window.confirm('Apakah anda barangnya sudah dilakukan Pickup ?')
    if (!tanya){
      return;
    }
    try {
      const response = await axios.post(`http://api.jahitkeeun.my.id/api/ubahstatusorderdetailId/${id}`,{'orderstatus':'Pesanan Dalam Pengiriman'},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      toast.success('Pesanan sudah dikirim!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      getPesanan();
    } catch (error) {
      toast.error('Oops sepertinya ada masalah!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const delivered = async(id) =>{
    const tanya = window.confirm('Apakah anda barangnya sudah diterima ?')
    if (!tanya){
      return;
    }
    try {
      const response = await axios.post(`http://api.jahitkeeun.my.id/api/ubahstatusorderdetailId/${id}`,{'orderstatus':'Pesanan Diterima'},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      toast.success('Pesanan sudah diterima, terima kasih telah berbelanja!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      getPesanan();
    } catch (error) {
      toast.error('Oops sepertinya ada masalah!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getPesanan();
    }
    return () => {
      ignore = true;
    };
  }, [isSelected]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getMenungguPembayaran();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
        <ToastContainer className='fixed top-0 w-full'/>
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
                {status !== null && <p className="text-center">{status}</p>}
                {status === null && (
                  <>
                   {isSelected === 0 && (
                  <>
                    {list?.map((v, i) => {
                       if (i + 1 === list.length) {
                         endOfScreen = true
                      }
                      return (
                        <>
                        <div key={i} className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                          <div className="flex items-center justify-between py-3">
                            <div className="flex flex-col">
                              <p className="font-bold">{v.namapenjahit}</p>
                              <p className="">{v.invoice}</p>
                            </div>
                            <p className="bg-[#f1c232] text-center py-1 px-2 rounded-md">
                              {v.orderStatus}
                            </p>
                          </div>
                          <hr />
                          <div className="flex justify-around py-3">
                            <img
                              src={
                                "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                                v.photoClient1
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=DefaultPreview;
                              }}
                              alt=""
                              className="rounded-md w-14 h-14"
                            />
                            <div className="flex flex-col">
                              <p className="font-bold text-xl">{v.namaitem}</p>
                              <p>{v.jasa}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <p>x{v.quantity}</p>
                              <NumericFormat
                                value={parseInt(v.price)}
                                prefix={"Rp."}
                                thousandSeparator={","}
                                displayType="text"
                                className="text-right"
                              />
                            </div>
                          </div>
                          <hr />
                          <div className="flex items-center px-3 py-3 justify-between">
                            <p>{v.quantity} item</p>
                            <div className="flex flex-col items-end">
                              <p>Total Pembayaran:</p>
                              <NumericFormat
                                value={parseInt(v.price)}
                                prefix={"Rp."}
                                thousandSeparator={","}
                                displayType="text"
                                className="text-right font-bold"
                              />
                            </div>
                          </div>
                          <div className="flex pb-3">
                            {(v.orderStatus === 'Menunggu Pembayaran') && <button className="rounded-md w-full bg-[#f1c232] py-2 px-2" onClick={()=>payOrder(v.id)}>Bayar Sekarang</button>}
                            {(v.orderStatus === 'Pembayaran Terkonfirmasi') && <button className="rounded-md w-full bg-[#f1c232] py-2 px-2" onClick={()=>pickuped(v.id)}>Sudah di Pickup</button>}
                            {(v.orderStatus === 'Menunggu Pickup') && <button className="rounded-md w-full bg-[#f1c232] py-2 px-2" onClick={()=>pickuped(v.id)}>Sudah di Pickup</button>}
                            {v.orderStatus === 'Pesanan Selesai' && <button className="rounded-md w-full bg-[#f1c232] py-2 px-2">Selesaikan Pesanan</button>}
                            {v.orderStatus === 'Selesai Pengerjaan (Konfirmasi Penerima)' && <button className="rounded-md w-full bg-[#f1c232] py-2 px-2" onClick={()=>delivered(v.id)}>Selesaikan Pesanan</button>}
                          </div>
                        </div>
                        {endOfScreen && <button className="px-6 text-center w-full bg-[#f1c232] py-5 my-5">Load More</button>}
                        </>
                      );
                    })}
                  </>
                )}
                {isSelected === 1 && (
                  <>
                    <p className="mx-3 mt-5 font-bold text-xl">
                      Menunggu Pembayaran
                    </p>
                    {pendingList?.map((v, i) => {
                      return (
                        <div key={1} className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                          <div className="flex items-center justify-between py-3">
                            <div className="flex flex-col">
                              <p className="font-bold">{v.namapenjahit}</p>
                              <p className="">{v.invoice}</p>
                            </div>
                            <p className="bg-[#f1c232] py-1 px-2 rounded-md">
                              {v.orderStatus}
                            </p>
                          </div>
                          <hr />
                          <div className="flex justify-around py-3">
                            <img
                              src={
                                "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                                v.photoClient1
                              }
                              alt=""
                              className="rounded-md w-14 h-14"
                            />
                            <div className="flex flex-col">
                              <p className="font-bold text-xl">{v.namaitem}</p>
                              <p>{v.jasa}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <p>x{v.quantity}</p>
                              <NumericFormat
                                value={parseInt(v.price)}
                                prefix={"Rp."}
                                thousandSeparator={","}
                                displayType="text"
                                className="text-right"
                              />
                            </div>
                          </div>
                          <hr />
                          <div className="flex items-center px-3 py-3 justify-between">
                            <p>{v.quantity} item</p>
                            <div className="flex flex-col items-end">
                              <p>Total Pembayaran:</p>
                              <NumericFormat
                                value={parseInt(v.price)}
                                prefix={"Rp."}
                                thousandSeparator={","}
                                displayType="text"
                                className="text-right font-bold"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <hr />
                    <p className="mx-3 mt-5 font-bold text-xl">
                      Pembayaran Terkonfirmasi
                    </p>
                    {list?.map((v, i) => {
                      return (
                        <div key={i} className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                          <div className="flex items-center justify-between py-3">
                            <div className="flex flex-col">
                              <p className="font-bold">{v.namapenjahit}</p>
                              <p className="">{v.invoice}</p>
                            </div>
                            <p className="bg-[#f1c232] text-center py-1 px-2 rounded-md">
                              {v.orderStatus}
                            </p>
                          </div>
                          <hr />
                          <div className="flex justify-around py-3">
                            <img
                              src={
                                "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                                v.photoClient1
                              }
                              alt=""
                              className="rounded-md w-14 h-14"
                            />
                            <div className="flex flex-col">
                              <p className="font-bold text-xl">{v.namaitem}</p>
                              <p>{v.jasa}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <p>x{v.quantity}</p>
                              <NumericFormat
                                value={parseInt(v.price)}
                                prefix={"Rp."}
                                thousandSeparator={","}
                                displayType="text"
                                className="text-right"
                              />
                            </div>
                          </div>
                          <hr />
                          <div className="flex items-center px-3 py-3 justify-between">
                            <p>{v.quantity} item</p>
                            <div className="flex flex-col items-end">
                              <p>Total Pembayaran:</p>
                              <NumericFormat
                                value={parseInt(v.price)}
                                prefix={"Rp."}
                                thousandSeparator={","}
                                displayType="text"
                                className="text-right font-bold"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                {isSelected === 2 && (
                   <>
                   {list?.map((v, i) => {
                     return (
                       <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                         <div className="flex items-center justify-between py-3">
                           <div className="flex flex-col">
                             <p className="font-bold">{v.namapenjahit}</p>
                             <p className="">{v.invoice}</p>
                           </div>
                           <p className="bg-[#f1c232] py-1 px-2 rounded-md">
                             {v.orderStatus}
                           </p>
                         </div>
                         <hr />
                         <div className="flex justify-around py-3">
                           <img
                             src={
                               "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                               v.photoClient1
                             }
                             alt=""
                             className="rounded-md w-14 h-14"
                           />
                           <div className="flex flex-col">
                             <p className="font-bold text-xl">{v.namaitem}</p>
                             <p>{v.jasa}</p>
                           </div>
                           <div className="flex flex-col items-end">
                             <p>x{v.quantity}</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right"
                             />
                           </div>
                         </div>
                         <hr />
                         <div className="flex items-center px-3 py-3 justify-between">
                           <p>{v.quantity} item</p>
                           <div className="flex flex-col items-end">
                             <p>Total Pembayaran:</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right font-bold"
                             />
                           </div>
                         </div>
                       </div>
                     );
                   })}
                 </>
                )}
                {isSelected === 3 && (
                  <>
                  {list?.map((v, i) => {
                    return (
                      <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                        <div className="flex items-center justify-between py-3">
                          <div className="flex flex-col">
                            <p className="font-bold">{v.namapenjahit}</p>
                            <p className="">{v.invoice}</p>
                          </div>
                          <p className="bg-[#f1c232] py-1 px-2 rounded-md">
                            {v.orderStatus}
                          </p>
                        </div>
                        <hr />
                        <div className="flex justify-around py-3">
                          <img
                            src={
                              "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                              v.photoClient1
                            }
                            alt=""
                            className="rounded-md w-14 h-14"
                          />
                          <div className="flex flex-col">
                            <p className="font-bold text-xl">{v.namaitem}</p>
                            <p>{v.jasa}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p>x{v.quantity}</p>
                            <NumericFormat
                              value={parseInt(v.price)}
                              prefix={"Rp."}
                              thousandSeparator={","}
                              displayType="text"
                              className="text-right"
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="flex items-center px-3 py-3 justify-between">
                          <p>{v.quantity} item</p>
                          <div className="flex flex-col items-end">
                            <p>Total Pembayaran:</p>
                            <NumericFormat
                              value={parseInt(v.price)}
                              prefix={"Rp."}
                              thousandSeparator={","}
                              displayType="text"
                              className="text-right font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
                )}
                {isSelected === 4 && (
                   <>
                   {list?.map((v, i) => {
                     return (
                       <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                         <div className="flex items-center justify-between py-3">
                           <div className="flex flex-col">
                             <p className="font-bold">{v.namapenjahit}</p>
                             <p className="">{v.invoice}</p>
                           </div>
                           <p className="bg-[#f1c232] py-1 px-2 rounded-md">
                             {v.orderStatus}
                           </p>
                         </div>
                         <hr />
                         <div className="flex justify-around py-3">
                           <img
                             src={
                               "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                               v.photoClient1
                             }
                             alt=""
                             className="rounded-md w-14 h-14"
                           />
                           <div className="flex flex-col">
                             <p className="font-bold text-xl">{v.namaitem}</p>
                             <p>{v.jasa}</p>
                           </div>
                           <div className="flex flex-col items-end">
                             <p>x{v.quantity}</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right"
                             />
                           </div>
                         </div>
                         <hr />
                         <div className="flex items-center px-3 py-3 justify-between">
                           <p>{v.quantity} item</p>
                           <div className="flex flex-col items-end">
                             <p>Total Pembayaran:</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right font-bold"
                             />
                           </div>
                         </div>
                       </div>
                     );
                   })}
                  </>
                )}
                {isSelected === 5 && (
                   <>
                   {list?.map((v, i) => {
                     return (
                       <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                         <div className="flex items-center justify-between py-3">
                           <div className="flex flex-col">
                             <p className="font-bold">{v.namapenjahit}</p>
                             <p className="">{v.invoice}</p>
                           </div>
                           <p className="bg-[#f1c232] py-1 px-2 rounded-md">
                             {v.orderStatus}
                           </p>
                         </div>
                         <hr />
                         <div className="flex justify-around py-3">
                           <img
                             src={
                               "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                               v.photoClient1
                             }
                             alt=""
                             className="rounded-md w-14 h-14"
                           />
                           <div className="flex flex-col">
                             <p className="font-bold text-xl">{v.namaitem}</p>
                             <p>{v.jasa}</p>
                           </div>
                           <div className="flex flex-col items-end">
                             <p>x{v.quantity}</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right"
                             />
                           </div>
                         </div>
                         <hr />
                         <div className="flex items-center px-3 py-3 justify-between">
                           <p>{v.quantity} item</p>
                           <div className="flex flex-col items-end">
                             <p>Total Pembayaran:</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right font-bold"
                             />
                           </div>
                         </div>
                       </div>
                     );
                   })}
                 </>
                )}
                {isSelected === 6 && (
                   <>
                   {list?.map((v, i) => {
                     return (
                       <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                         <div className="flex items-center justify-between py-3">
                           <div className="flex flex-col">
                             <p className="font-bold">{v.namapenjahit}</p>
                             <p className="">{v.invoice}</p>
                           </div>
                           <p className="bg-[#f1c232] py-1 px-2 rounded-md">
                             {v.orderStatus}
                           </p>
                         </div>
                         <hr />
                         <div className="flex justify-around py-3">
                           <img
                             src={
                               "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                               v.photoClient1
                             }
                             alt=""
                             className="rounded-md w-14 h-14"
                           />
                           <div className="flex flex-col">
                             <p className="font-bold text-xl">{v.namaitem}</p>
                             <p>{v.jasa}</p>
                           </div>
                           <div className="flex flex-col items-end">
                             <p>x{v.quantity}</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right"
                             />
                           </div>
                         </div>
                         <hr />
                         <div className="flex items-center px-3 py-3 justify-between">
                           <p>{v.quantity} item</p>
                           <div className="flex flex-col items-end">
                             <p>Total Pembayaran:</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right font-bold"
                             />
                           </div>
                         </div>
                       </div>
                     );
                   })}
                 </>
                )}
                {isSelected === 7 && (
                   <>
                   {list?.map((v, i) => {
                     return (
                       <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                         <div className="flex items-center justify-between py-3">
                           <div className="flex flex-col">
                             <p className="font-bold">{v.namapenjahit}</p>
                             <p className="">{v.invoice}</p>
                           </div>
                           <p className="bg-[#f1c232] py-1 px-2 rounded-md">
                             {v.orderStatus}
                           </p>
                         </div>
                         <hr />
                         <div className="flex justify-around py-3">
                           <img
                             src={
                               "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                               v.photoClient1
                             }
                             alt=""
                             className="rounded-md w-14 h-14"
                           />
                           <div className="flex flex-col">
                             <p className="font-bold text-xl">{v.namaitem}</p>
                             <p>{v.jasa}</p>
                           </div>
                           <div className="flex flex-col items-end">
                             <p>x{v.quantity}</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right"
                             />
                           </div>
                         </div>
                         <hr />
                         <div className="flex items-center px-3 py-3 justify-between">
                           <p>{v.quantity} item</p>
                           <div className="flex flex-col items-end">
                             <p>Total Pembayaran:</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right font-bold"
                             />
                           </div>
                         </div>
                         <div className="flex pb-3">
                            {v.orderStatus === 'Menunggu Pembayaran' && <button className="rounded-md w-full bg-[#f1c232] py-2 px-2">Bayar Sekarang</button>}
                            {v.orderStatus === 'Pesanan Selesai' && <button className="rounded-md w-full bg-[#f1c232] py-2 px-2">Selesaikan Pesanan</button>}
                          </div>
                       </div>
                     );
                   })}
                 </>
                )}
                {isSelected === 8 && (
                   <>
                   {list?.map((v, i) => {
                     return (
                       <div className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                         <div className="flex items-center justify-between py-3">
                           <div className="flex flex-col">
                             <p className="font-bold">{v.namapenjahit}</p>
                             <p className="">{v.invoice}</p>
                           </div>
                           <p className="bg-[#f1c232] py-1 px-2 rounded-md">
                             {v.orderStatus}
                           </p>
                         </div>
                         <hr />
                         <div className="flex justify-around py-3">
                           <img
                             src={
                               "http://apijahitkeeun.tepat.co.id/photo-cart/" +
                               v.photoClient1
                             }
                             alt=""
                             className="rounded-md w-14 h-14"
                           />
                           <div className="flex flex-col">
                             <p className="font-bold text-xl">{v.namaitem}</p>
                             <p>{v.jasa}</p>
                           </div>
                           <div className="flex flex-col items-end">
                             <p>x{v.quantity}</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right"
                             />
                           </div>
                         </div>
                         <hr />
                         <div className="flex items-center px-3 py-3 justify-between">
                           <p>{v.quantity} item</p>
                           <div className="flex flex-col items-end">
                             <p>Total Pembayaran:</p>
                             <NumericFormat
                               value={parseInt(v.price)}
                               prefix={"Rp."}
                               thousandSeparator={","}
                               displayType="text"
                               className="text-right font-bold"
                             />
                           </div>
                         </div>
                       </div>
                     );
                   })}
                 </>
                )}
                  </>
                )}
               
              </>
            )}
          </AnimatePresence>
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
  const {toggle} = useSelector(state => state.toggle)
  const dispatch = useDispatch()

  const [list, setList] = useState();

  const getPesanan = async () => {
    try {
      const response = await axios.get(
        `http://api.jahitkeeun.my.id/api/dashboardtaylororder/${parseInt(
          data.taylor.id
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setList(response.data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pesanan = list?.filter(function(el){
    return el.orderStatus !== 'Menunggu Pembayaran'
  })

  const updateProsesJahit = async(id) =>{
    const loading = toast.loading('Sedang merubah proses...')
    try {
     const response = await axios.post(`http://api.jahitkeeun.my.id/api/ubahprosespengerjaanorderdetailId/${id}`,null,{
      headers:{
        Authorization:`Bearer ${token}`
      }
     })
      toast.update(loading,{render:'Status telah diupdate!', type:'success', autoClose:'3000', isLoading:false})
      getPesanan()
    } catch (error) {
      toast.update(loading,{render:'Oops sepertinya ada masalah!', type:'danger', autoClose:'3000', isLoading:false})
    }
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getPesanan();
    }
    return () => {
      ignore = true;
    };
  }, []);

  console.log(pesanan);

  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
        <ToastContainer/>
        {toggle && <FormBukti getPesanan={getPesanan}/>}
        <div>
          <AnimatePresence>
            {isLoading && <p className="text-center">Memuat pesanan...</p>}
            {isLoading === false && (
              <>
                {isSelected === 0 && (
                  <>
                  {pesanan?.map((v,i)=>{
                    return(
                      <div key={i} className="bg-white shadow-md mx-5 px-3 my-3 rounded-md">
                        <div className="flex items-center justify-between py-3">
                          <div className="flex flex-col">
                            <p className="font-bold">{v.tgl_order}</p>
                            <p className="">{v.invoice}</p>
                          </div>
                          <p className="bg-[#f1c232] py-1 px-2 rounded-md text-center">
                            {v.orderStatus}
                          </p>
                        </div>
                        <hr />
                        <div className="flex justify-around py-3 gap-3">
                          <img
                            src={'http://api.jahitkeeun.my.id/photo-cart/'+v.photoClient1}
                            alt=""
                            className="rounded-md w-20 h-20 object-cover"
                          />
                          <div className="flex flex-col">
                            <p>{v.jasa}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p>x{v.quantity}</p>
                            <p>Rp.{parseInt(v.price)}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="flex items-center px-3 py-3 justify-between">
                        <p className="italic">{v.alamat}</p>
                        </div>
                        <hr/>
                        <div className="flex justify-end">
                          {v.orderStatus === 'Pesanan Dalam Pengiriman' && (
                            <button className="bg-[#79c172] text-white px-2 py-2 my-2 rounded-md font-bold" onClick={()=>updateProsesJahit(parseInt(v.id))}>Proses Jahit</button>
                          )}
                          {(v.orderStatus === 'Proses Jahit' || v.orderStatus === 'Proses Pengerjaan') && (
                            <button className="bg-[#79c172] text-white px-2 py-2 my-2 rounded-md font-bold" onClick={()=>{dispatch(TOGGLED(true)); localStorage.setItem('id',v.id)}}>Selesaikan Pesanan</button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  </>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const FormBukti = (props) =>{
  const token = sessionStorage.getItem('token')
  const data = JSON.parse(sessionStorage.getItem('data'))
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = localStorage.getItem('id')
  const [foto,setFoto] = useState({})

  const sendProve = async() =>{
    const formData = new FormData()
    formData.append('photoTaylor1',foto.photoTaylor1)
    setLoading(true)
    try {
      const response = await axios.post(`http://api.jahitkeeun.my.id/api/ubahkonfirmasipengerjaanorderdetailId/${id}`,formData,{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      })
      setLoading(false)
      localStorage.removeItem('id')
      dispatch(TOGGLED(false))
      toast.success('Pesanan sudah diselesaikan, akan dikonfirmasi oleh client!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        props.getPesanan()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return(
    <AnimatePresence>
    <div className="bg-white/80 absolute w-full h-full z-50 flex justify-center items-center">
      <motion.div className="bg-white border border-black rounded-md py-5 px-2" initial={{opacity:0}} animate={{opacity:1}}>
        <p className="text-center font-bold text-xl pb-3">Bukti Pengerjaan</p>
        <img src={foto.photoTaylor1 ? URL.createObjectURL(foto.photoTaylor1) : DefaultPreview} className='px-3 object-cover py-5 w-56 h-56 mx-auto' alt="" />
        <input type="file" className="block" onChange={(e)=>setFoto((foto)=>({...foto,photoTaylor1:e.target.files[0]}))} />
        {isLoading === false && <button onClick={sendProve} className="w-full mt-5 bg-[#F1C232] px-3 py-3 text-lg rounded-md">Kirim</button>}
        {isLoading === true && <div className="w-full mt-5 bg-[#f5cf5d] px-3 text-lg rounded-md flex justify-center"><img src={LoadingButton} className='w-20'/></div>}
      </motion.div>
    </div>
    </AnimatePresence>
  )
}
