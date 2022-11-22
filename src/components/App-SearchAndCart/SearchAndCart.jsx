import React from 'react'
import { BiSearch } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoTasklist } from 'react-icons/go'
import { ADD_PARAMS } from '../../slice/searchSlice';
const SearchAndCart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const data = JSON.parse(sessionStorage.getItem('data'))

  return (
   
        <div className="flex justify-evenly md:justify-around items-center px-5 gap-1">
          {props.role === 'taylor' && (
             <div className="flex items-center w-fit px-3 rounded-md gap-2 focus-within:border focus-within:border-[#F1C232] focus-within:transition-all">
            <img src={'https://apijahitkeeun.tepat.co.id/photo-user/avatar.png'} className='w-14' alt="" />
            <p className='text-2xl font-bold'>Hi, {data.nama}</p>
           </div>
          )}
          {props.role !== 'taylor' && (
            <div className="flex items-center bg-white w-fit px-3 rounded-md focus-within:border focus-within:border-[#F1C232] focus-within:transition-all">
            <input
              type="text"
              className="bg-white w-full md:w-80 py-2 px-2 border-none focus:outline-none focus:border-none focus:border-transparent"
              placeholder="Cari penjahit, item atau jasa"
              onChange={(e)=>dispatch(ADD_PARAMS(e.target.value))}
              />
            <span className="bg-white hover:cursor-pointer" onClick={()=>alert('Hehe')}>
              <BiSearch className="text-xl" />
            </span>
          </div>
          )}
          {props.role !== 'taylor' ? 
          <div className="relative" onClick={()=>navigate('cart')}>
        <BsFillCartFill className="text-3xl " />
        <span className="rounded-full px-2 py-2 bg-[#F1C232] absolute top-0 right-0 text-sm"></span>
          </div> :
          <div className="relative">
          <GoTasklist className="text-3xl" />
            </div>
          }
        </div>
  )
}

export default SearchAndCart
