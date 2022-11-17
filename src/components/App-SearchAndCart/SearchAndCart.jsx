import React from 'react'
import { BiSearch } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
const SearchAndCart = () => {
  return (
    <div className="h-screen bg-slate-200">
      <div className="w-[30.375rem] mx-auto py-10 bg-[#FFF8EA]">
        <div className="flex justify-around items-center px-8">
          <div className="flex items-center bg-white w-fit px-3 rounded-md focus-within:border focus-within:border-[#F1C232] focus-within:transition-all">
            <input
              type="text"
              className="bg-white w-80 py-2 px-2 focus:outline-none"
              placeholder="Cari penjahit, item atau jasa"
              />
            <span className="bg-white hover:cursor-pointer" onClick={()=>alert('Hehe')}>
              <BiSearch className="text-xl" />
            </span>
          </div>
          <div className="relative">
        <BsFillCartFill className="text-3xl " />
        <span className="rounded-full px-2 py-2 bg-[#F1C232] absolute top-0 right-0 text-sm"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchAndCart