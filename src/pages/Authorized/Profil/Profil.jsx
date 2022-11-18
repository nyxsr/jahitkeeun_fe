import React from "react";
import BackgroundProfil from '../../../assets/profile-bg.svg'
import {FiEdit,FiLogOut} from 'react-icons/fi'
import {VscVersions} from 'react-icons/vsc'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import {GrFormNext} from 'react-icons/gr'
import {FaTrash} from 'react-icons/fa'


function Profil() {
  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll relative h-screen">
        <img src={BackgroundProfil} className='w-full rounded-b-[4rem] -top-32 left-0 right-0 absolute' alt="" />
        <div className="bg-zinc-50 px-10 py-10 w-fit mx-auto relative text-center z-10 shadow-xl rounded-3xl mt-24">
            <img src="https://source.unsplash.com/150x150?person" className="rounded-full absolute -top-16 left-16" alt="" />
            <p className="text-4xl font-bold pt-12">Nama User</p>
            <div className="flex justify-center w-fit px-5 mx-auto items-center gap-2 mt-3 rounded-xl font-semibold py-2 bg-[#F1C232]">
            <span><FiEdit/></span><button>Edit Profil</button>
            </div>
        </div>
         <div className="px-7 pt-5 flex flex-col gap-4">
            <p className="text-2xl font-bold">Tentang Aplikasi</p>
            <div className="flex items-center gap-3 text-xl font-semibold">
            <VscVersions/>
            <p className="flex-1">Versi Aplikasi</p>
            <p>1.0.0</p>
            </div>
            <div className="flex items-center gap-3 text-xl font-semibold">
            <AiOutlineInfoCircle/>
            <p className="flex-1">Tentang Kami</p>
            <p><GrFormNext/></p>
            </div>
        </div> 
        <hr className="w-80 mx-auto mt-5" />
        <div className="px-7 pb-5 pt-5 flex flex-col gap-4 text-rose-700">
            <p className="text-2xl font-bold text-black">Akun</p>
            <div className="flex items-center gap-3 text-xl font-semibold">
            <FaTrash/>
            <p className="flex-1">Hapus Akun</p>
            <p><GrFormNext/></p>
            </div>
            <div className="flex items-center gap-3 text-xl font-semibold">
            <FiLogOut/>
            <p className="flex-1">Logout</p>
            <p><GrFormNext/></p>
            </div>
        </div>     
      </div>
    </div>
  );
}

export default Profil;
