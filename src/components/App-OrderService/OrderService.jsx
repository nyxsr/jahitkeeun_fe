import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DefaultPreview from "../../assets/default_preview.png";
import {AnimatePresence, motion} from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { toast, ToastContainer } from "react-toastify";

function OrderService(props) {
  const { id } = useParams();
  const data = JSON.parse(sessionStorage.getItem("data"));
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate()
  const namaPenjahit = useRef({
    name:null
  })
  var date = new Date().toISOString().split("T")[0];
  const [itemOptions, setItem] = useState();
  let grand;
  
  const [selected, setSelected] = useState({
    user_id: data.client.user_id,
    service_id: null,
    item: null,
    photoClient1: null,
    desc: null,
    quantity: 1,
    pickup: date,
  });
  const [serviceOptions, setService] = useState();
  let dataitem;
  let dataservice;
  const [isLoad, setLoading] = useState(true);
  const [isLoading, setLoad] = useState(true);

  const getDetailPenjahit = async() =>{
    try {
        const response = await axios.get(`http://api.jahitkeeun.my.id/api/taylor/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        namaPenjahit.current.name = response.data.meta.message.data[0].taylor_name
    } catch (error) {
        console.log(error)
    }
  }

  const getItem = async () => {
    try {
      const response = await axios.get(
        `http://api.jahitkeeun.my.id/api/sectionitem/taylorId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItem(response.data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getService = async () => {
    try {
      const response = await axios.get(
        `http://api.jahitkeeun.my.id/api/sectionitem/taylorId/${id}/itemId/${selected.item}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setService(response.data.data.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = async() =>{
    const formData = new FormData();
    formData.append('user_id',selected.user_id)
    formData.append('service_id',selected.service_id)
    formData.append('photoClient1',selected.photoClient1)
    formData.append('desc',selected.desc)
    formData.append('quantity',selected.quantity)
    formData.append('pickup',selected.pickup)
    const loading = toast.loading('Sedang memasukkan ke keranjang...')
    try {
      const response = await axios.post('http://api.jahitkeeun.my.id/api/sectionitem',formData,{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      })
      toast.update(loading,{render:'Sudah ditambahkan ke Keranjang!', type:'success',isLoading:false,autoClose:3000})
      setTimeout(() => {
        navigate(-1)
      }, 3000);
    } catch (error) {
      console.log(error)
      toast.update(loading,{render:'Ada masalah ketika memasukkan ke keranjang!', type:'error',isLoading:false,autoClose:3000})
    }
  }

  dataitem = itemOptions?.map((v, i) => {
    const item = {};
    item.label = v.itemName;
    item.value = v.itemId;

    return item;
  });

  dataservice = serviceOptions?.map((v, i) => {
    const item = {};
    item.label = v.serviceName;
    item.value = v.serviceId;

    return item;
  });

  

  let grandTotal = serviceOptions?.filter(function (value) {
    return value.serviceId === selected.service_id;
  });
  if (grandTotal !== undefined) {
      grand = parseInt(grandTotal[0]?.servicePrice) * selected.quantity;
  }

  const setImage = (e) => {
    document.getElementById("preview").src = URL.createObjectURL(
      e.target.files[0]
    );
    setSelected((selected) => ({
      ...selected,
      photoClient1: e.target.files[0],
    }));
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getDetailPenjahit()
      getItem();
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (selected.quantity < 1) {
      alert("Qty tidak boleh kurang dari 1");
      setSelected((selected) => ({ ...selected, quantity: 1 }));
    }
  }, [selected.quantity]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (selected.item) {
        getService();
      }
    }
    return () => {
      ignore = true;
    };
  }, [selected.item]);

  console.log(selected);
  console.log(dataitem);
  return (
    <AnimatePresence>
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto py-10 pb-56 bg-[#FFF8EA] overflow-y-scroll h-screen">
        <ToastContainer className='fixed top-0 w-screen md:w-[30.375rem] mx-auto'/>
        <div className="flex items-center mt-5 ml-5 gap-4">
          <button
            className="bg-[#402E32] text-zinc-50 rounded-md py-3 px-3"
            onClick={() => navigate(`../home/detail/${id}`)}
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <p className="text-xl font-semibold">Pesan Jasa</p>
        </div>
        <div className="px-5 mt-3 mb-28">
          <p>Memesan Dari</p>
          {!namaPenjahit.current.name  ? <p className="text-xl font-bold">Memuat Nama Penjahit...</p> : <p className="text-xl font-bold">{namaPenjahit.current.name}</p>}
         
          <div className="mt-5">
            <p>Item</p>
            {isLoad && <Select isDisabled isLoading />}
            {isLoad === false && (
              <Select
                options={dataitem}
                onChange={(e) =>
                  setSelected((selected) => ({ ...selected, item: e.value }))
                }
              />
            )}
          </div>
          {selected.item && (
            <div className="mt-5">
              <p>Service</p>
              {isLoading && <Select isDisabled isLoading />}
              {isLoading === false && (
                <Select
                  options={dataservice}
                  onChange={(e) =>
                    setSelected((selected) => ({
                      ...selected,
                      service_id: e.value,
                    }))
                  }
                />
              )}
            </div>
          )}
          {selected.item && selected.service_id && (
            <>
              <div className="mt-5">
                <p>Deskripsi</p>
                <textarea
                  name=""
                  id=""
                  className="w-full px-3 py-3 border rounded-md"
                  rows="5"
                  placeholder="Deskripsikan orderan anda..."
                  onChange={(e) =>
                    setSelected((selected) => ({
                      ...selected,
                      desc: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="mt-5">
                <p>Gambar Rancangan atau Referensi</p>
                <img
                  src={DefaultPreview}
                  alt=""
                  id="preview"
                  width={300}
                  height={300}
                  className="mx-auto my-3 max-h-[10rem] max-w-[10rem] object-cover"
                />
                <input type="file" name="" onChange={setImage} />
              </div>
              <div className="mt-5">
                <p>Pilih Tanggal Pickup</p>
                <input
                  className="bg-white border my-1 py-3 px-3 rounded-md w-full"
                  type="date"
                  name=""
                  id="date"
                  onChange={(e) =>
                    setSelected((selected) => ({
                      ...selected,
                      pickup: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-5">
                <p>Quantity</p>
                <div className="flex w-full items-center justify-around py-5 text-xl ">
                  <FaChevronLeft
                    onClick={() =>
                      setSelected((selected) => ({
                        ...selected,
                        quantity: selected.quantity--,
                      }))
                    }
                  />
                  <p>{selected.quantity}</p>
                  <FaChevronRight
                    onClick={() =>
                      setSelected((selected) => ({
                        ...selected,
                        quantity: selected.quantity++,
                      }))
                    }
                  />
                </div>
              </div>
              <motion.div initial={{bottom:0}} animate={{bottom:'3.5rem'}} className="fixed bottom-14 bg-[#F1C232] -mx-5 py-5 px-4 rounded-t-lg md:w-[30.375rem] w-screen">
                <p className="text-xl">Total :</p>
                <NumericFormat prefix={'Rp.'} displayType='text' className="bg-transparent text-2xl font-bold" value={grand}  thousandSeparator={','} />
                <motion.button whileTap={{scale:1.1}} onClick={addCart} transition={{duration:.5,type:'spring', bounce:.3}} className="text-xl text-center bg-[#402e32] text-white w-full py-3 mt-3 rounded-md">
                  Tambahkan ke Keranjang
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
    </AnimatePresence>
  );
}

export default OrderService;
