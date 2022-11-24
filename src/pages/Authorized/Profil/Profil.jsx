import React, { useEffect, useState } from "react";
import BackgroundProfil from "../../../assets/profile-bg.webp";
import { FiEdit, FiLogOut } from "react-icons/fi";
import { VscVersions } from "react-icons/vsc";
import { MdPhotoCamera } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GrFormNext, GrUpgrade } from "react-icons/gr";
import { FaTrash, FaUser } from "react-icons/fa";
import { BsPhone, BsKey } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { toast, Slide, ToastContainer } from "react-toastify";
import { StyledContainer } from "./style";
import { useNavigate } from "react-router-dom";
import confirmImage from "../../../assets/undraw_update_re_swkp.webp";
import defaultPhoto from "../../../assets/default-photo.webp";
import { shortText } from "limit-text-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLED } from "../../../slice/toggleSlice";

function Profil() {
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("data"));
  const { toggle } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const logoutClicked = () => {
    toast("Anda sedang diarahkan keluar...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    try {
      sessionStorage.removeItem("inNavbarApp");
      sessionStorage.removeItem("data");
      sessionStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "../../login";
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll relative h-screen">
        {toggle && <ConfirmUpgrade />}
        <StyledContainer className="fixed top-0" transition={Slide} />
        <img
          src={BackgroundProfil}
          className="w-full rounded-b-[4rem] -top-32 left-0 right-0 absolute"
          alt=""
        />
        <div className="bg-zinc-50 px-10 py-10 w-fit mx-auto relative text-center z-10 shadow-xl rounded-3xl mt-24">
          {data.role === "taylor" && (
            <img
              src={data.taylor.photo ? data.image : defaultPhoto}
              className="rounded-full absolute w-1/3 -top-[5.8rem] left-1/3"
              alt=""
            />
          )}
          {data.role === "client" && (
            <img
              src={data.client.photo ? data.image : defaultPhoto}
              className="rounded-full absolute w-1/3 -top-[5.8rem] left-1/3"
              alt=""
            />
          )}

          <p className="text-4xl font-bold pt-12">{data.nama}</p>
          <div className="flex justify-center w-fit px-5 mx-auto items-center gap-2 mt-3 rounded-xl font-semibold py-2 bg-[#F1C232]">
            <span>
              <FiEdit />
            </span>
            <button onClick={() => navigate("../profil/edit")}>
              Edit Profil
            </button>
          </div>
          {data.role === "client" && (
            <div className="flex items-center font-bold justify-center gap-2 px-3 py-3 border-[#F1C232] border-2 mt-3 rounded-md">
              <GrUpgrade className="text-xl" />
              <button onClick={() => dispatch(TOGGLED(true))}>
                Upgade Akun Saya
              </button>
            </div>
          )}
        </div>
        <div className="px-7 pt-5 flex flex-col gap-4">
          <p className="text-2xl font-bold">Pengaturan</p>
          <div className="flex items-center gap-3 text-xl font-semibold cursor-pointer">
            <BsPhone />
            <p className="flex-1">Telpon</p>
            {data.role === "client" && (
              <p>
                {data.client.phone ? data.client.phone : "Belum Ditambahkan"}
              </p>
            )}
            {data.role === "taylor" && (
              <p>
                {data.taylor.phone ? data.taylor.phone : "Belum Ditambahkan"}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 text-xl font-semibold">
            <FiMail />
            <p className="flex-1">Email</p>
            <p className="text-lg text-zinc-500">
              {data.email
                ? shortText(data.email, 15, "...")
                : "Belum Ditambahkan"}
            </p>
          </div>
          <div
            className="flex items-center gap-3 text-xl font-semibold cursor-pointer"
            onClick={() => navigate("../profil/editpw")}
          >
            <BsKey />
            <p className="flex-1">Ganti Password</p>
            <p>
              <GrFormNext />
            </p>
          </div>
        </div>
        <div className="px-7 pt-5 flex flex-col gap-4">
          <p className="text-2xl font-bold">Tentang Aplikasi</p>
          <div className="flex items-center gap-3 text-xl font-semibold">
            <VscVersions />
            <p className="flex-1">Versi Aplikasi</p>
            <p>1.0.0</p>
          </div>
          <div className="flex items-center gap-3 text-xl font-semibold">
            <AiOutlineInfoCircle />
            <p className="flex-1">Tentang Kami</p>
            <p>
              <GrFormNext />
            </p>
          </div>
        </div>
        <hr className="w-80 mx-auto mt-5" />
        <div className="px-7 pb-5 pt-5 flex flex-col gap-4 text-rose-700">
          <p className="text-2xl font-bold text-black">Akun</p>
          <div className="flex items-center gap-3 text-xl font-semibold">
            <FaTrash />
            <p className="flex-1">Hapus Akun</p>
            <p>
              <GrFormNext />
            </p>
          </div>
          <div
            className="flex items-center gap-3 text-xl font-semibold cursor-pointer"
            onClick={logoutClicked}
          >
            <FiLogOut />
            <p className="flex-1">Logout</p>
            <p>
              <GrFormNext />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;

function ConfirmUpgrade() {
  const dispatch = useDispatch();
  return (
    <div>
      <div
        className="bg-black/60 absolute h-[200%] w-full z-50"
        onClick={() => dispatch(TOGGLED(false))}
      ></div>
      <div className="bg-zinc-50 absolute px-5 py-5 top-1/4 z-[60] flex flex-col justify-center items-center">
        <p className="text-3xl mb-3">Perhatian!</p>
        <img src={confirmImage} alt="" className="w-1/2" />
        <p className="text-center mt-3">
          Akun anda akan diupgrade menjadi <b>Jahitkeeun Penjahit</b>, apakah
          anda yakin ?
        </p>
        <div className="flex justify-evenly w-full mt-5">
          <button
            className="border rounded-md border-[#f1c232] px-4 py-2"
            onClick={() => dispatch(TOGGLED(false))}
          >
            Lain Kali
          </button>
          <button
            className="bg-[#f1c232] px-4 py-2 rounded-md"
            onClick={() => alert("uhuy")}
          >
            Ya, Gaskan!
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditProfil() {
  const data = JSON.parse(sessionStorage.getItem("data"));
  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("name").value = data.nama;
    document.getElementById("email").value = data.email;
    document.getElementById("telepon").value = data.client.phone;
  }, []);
  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll relative h-screen">
        <div className="flex items-center mt-5 ml-5 gap-4">
          <button
            className="bg-[#402E32] text-zinc-50 rounded-md py-3 px-3"
            onClick={() => navigate("../profil")}
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <p className="text-xl font-semibold">Edit Profil</p>
        </div>
        <img
          src={data.client.photo ? data.client.photo : defaultPhoto}
          className="rounded-full object-cover w-32 mx-auto mt-5"
          alt=""
        />
        <div className="flex gap-3 justify-center items-center border border-[#402E32] bg-[#F1C232] w-fit mx-auto mt-3 px-3 py-2 rounded-lg">
          <span>
            <MdPhotoCamera className="text-2xl" />
          </span>
          <button>Edit Foto</button>
        </div>
        <form className="flex flex-col mt-8 gap-4">
          <div className="flex py-3 text-xl justify-center items-center bg-white rounded-md w-fit mx-auto px-3 gap-5 focus-within:border-[#F1C232] focus-within:border-2">
            <span>
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="bg-transparent focus:outline-none"
              id="name"
            />
          </div>
          <div className="flex py-3 text-xl justify-center items-center bg-white rounded-md w-fit mx-auto px-3 gap-5 focus-within:border-[#F1C232] focus-within:border-2">
            <span>
              <FiMail />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent focus:outline-none"
              id="email"
            />
          </div>
          <div className="flex py-3 text-xl justify-center items-center bg-white rounded-md w-fit mx-auto px-3 gap-5 focus-within:border-[#F1C232] focus-within:border-2">
            <span>
              <BsPhone />
            </span>
            <input
              type="text"
              placeholder="No. Telepon"
              className="bg-transparent focus:outline-none"
              id="telepon"
            />
          </div>
          <button
            type="submit"
            className="bg-[#F1C232] w-80 mx-auto py-4 rounded-md font-semibold"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export function EditPassword() {
  const data = JSON.parse(sessionStorage.getItem("data"));
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [datapw, setDatapw] = useState({
    password: "",
    confirm: "",
  });

  const changePw = async () => {
    if (datapw.password !== datapw.confirm) {
      toast.error("Password dan Konfirmasi tidak sama!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const loading = toast.loading("Sedang mengganti...");
    try {
      const response = await axios.post(
        `http://api.jahitkeeun.my.id/api/user/update/password/${data.client.user_id}`,
        datapw,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.update(loading, {
        render: "Password berhasil diganti!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("../profil");
      }, 3000);
    } catch (error) {
      toast.update(loading, {
        render: error.response.data.data.password[0],
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll relative h-screen">
        <ToastContainer />
        <div className="flex items-center mt-5 ml-5 gap-4">
          <button
            className="bg-[#402E32] text-zinc-50 rounded-md py-3 px-3"
            onClick={() => navigate("../profil")}
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <p className="text-xl font-semibold">Edit Password</p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col mt-8 gap-4"
        >
          <div className="flex py-3 text-xl justify-center items-center bg-white rounded-md w-fit mx-auto px-3 gap-5 focus-within:border-[#F1C232] focus-within:border-2">
            <span>
              <BsKey />
            </span>
            <input
              type="password"
              placeholder="New Password"
              className="bg-transparent focus:outline-none"
              onChange={(e) =>
                setDatapw((datapw) => ({ ...datapw, password: e.target.value }))
              }
            />
          </div>
          <div className="flex py-3 text-xl justify-center items-center bg-white rounded-md w-fit mx-auto px-3 gap-5 focus-within:border-[#F1C232] focus-within:border-2">
            <span>
              <BsKey />
            </span>
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent focus:outline-none"
              onChange={(e) =>
                setDatapw((datapw) => ({ ...datapw, confirm: e.target.value }))
              }
            />
          </div>
          <button
            type="submit"
            onClick={changePw}
            className="bg-[#F1C232] w-80 mx-auto py-4 rounded-md font-semibold"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
