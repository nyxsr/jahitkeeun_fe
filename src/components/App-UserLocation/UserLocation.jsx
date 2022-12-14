import axios from "axios";
import shorText from "limit-text-js/dist/shorText";
import React, { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion'
import { MdLocationOn } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { GoPlus } from 'react-icons/go'

function UserLocation() {
  const iduser = JSON.parse(sessionStorage.getItem("data"));
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [alamat, setAlamat] = useState();
  const [isLoading, setLoading] = useState(true);
  const getAlamat = async () => {
    try {
      const response = await axios.get(
        `https://api.jahitkeeun.my.id/api/sectionitemalamat/${iduser.client.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlamat(response.data.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getAlamat();
    }
    return () => {
      ignore = true;
    };
  }, [alamat]);
  return (
    <div
      className="flex justify-center gap-5 my-5 cursor-pointer"
      onClick={() => navigate(`address/${iduser.client.user_id}`)}
    >
      <MdLocationOn className="text-6xl text-[#7C7778]" />
      <div className="flex flex-col">
        <p className="text-xl font-semibold pr-10">
          Dikirim ke / Dijemput di :
        </p>
        {isLoading && <p>Memuat...</p>}
        {/* {!alamat && isLoading.current === false ? <p>Belum ada alamat</p> : null} */}
        {isLoading === false && (
          <p className="">
            {alamat === undefined
              ? "Belum ada data"
              : shorText(alamat?.alamat, 25, "...")}
          </p>
        )}
        <p></p>
      </div>
    </div>
  );
}

export default UserLocation;

export function UserAddress() {
  const data = JSON.parse(sessionStorage.getItem("data"));
  const [alamat, setAlamat] = useState();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const getListAlamat = async () => {
    try {
      const response = await axios.get(
        `https://api.jahitkeeun.my.id/api/sectionitemalamat/${data.client.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlamat(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListAlamat();
  }, []);

  console.log(alamat)

  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll relative h-screen">
        <div className="flex items-center mt-5 ml-5 gap-4">
          <button
            className="bg-[#402E32] text-zinc-50 rounded-md py-3 px-3"
            onClick={() => navigate("../home")}
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <p className="text-xl font-semibold">Ubah Alamat</p>
        </div>
        {isLoading && <p className="text-center">Memuat...</p>}
        {isLoading === false && (
          <>
          {alamat.length < 1 && <p className="text-center pt-28">Anda belum menambahkan alamat</p>}
            {alamat?.map((v, i) => {
              return (
                <div key={i} className="flex flex-col">
                  <div
                    className="flex items-center gap-3 px-10 mt-5 mx-5 border-2 border-black rounded-md py-3 font-semibold"
                    style={{
                      backgroundColor:
                        i === 0 ? "#402e32" : "transparent",
                      color: i === 0 ? "white" : "#402e32",
                    }}
                  >
                    <span className="flex-initial">
                      <MdLocationOn className="text-3xl" />
                    </span>
                    <p className="flex-1 border-r pr-3">{v.alamat}</p>
                    <AiFillEdit className="text-2xl text-center" />
                  </div>
                </div>
              );
            })}
          </>
        )}
        <motion.button onClick={()=>navigate(`../home/address/add/${data.client.user_id}`)} whileTap={{scale:1.1}} className="fixed bottom-20 right-10 bg-[#F1C232] text-2xl px-3 py-3 rounded-full"><GoPlus/></motion.button>
      </div>
    </div>
  );
}

export function TambahAlamat() {
  const {id} = useParams()
  const navigate = useNavigate();
  return(
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll relative h-screen">
      <div className="flex items-center mt-5 ml-5 gap-4">
          <button
            className="bg-[#402E32] text-zinc-50 rounded-md py-3 px-3"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <p className="text-xl font-semibold">Tambah Alamat</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col mx-10">
            <label htmlFor="">Alamat</label>
            <textarea name="" id="" cols="30" rows="3" className="rounded-md border px-2 py-2" placeholder=""></textarea>
          </div>
          <div className="flex flex-col mx-10 mt-4">
            <label htmlFor="">Kode Pos</label>
            <input type="number" className="rounded-md px-2 py-2 border"/>
          </div>
          <div className="flex flex-col mx-10 mt-4">
            <label htmlFor="">Kode Pos</label>
            <input type="number" className="rounded-md px-2 py-2 border"/>
          </div>
        </div>
      </div>
      </div>
  )
}
