import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {MdSort} from 'react-icons/md'
import PenjahitItem from './PenjahitItem'
import loading from '../../assets/tumblr_mo4hyqKMah1r1tulfo1_500.gif'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'

function PenjahitList(props) {
  const [penjahit, setPenjahit] = useState([])
  const {paramsSearch} = useSelector(state => state.searchParam)
  const isLoading = useRef(true);
  const searchData = {
    keyword:paramsSearch
  }
  
  console.log(searchData);

  const baseUrl = paramsSearch ? `http://apijahitkeeun.tepat.co.id/api/search` : `https://apijahitkeeun.tepat.co.id/api/taylor`

  const token = sessionStorage.getItem('token')
  const getPenjahit = async() =>{
    try {
      const response = await axios.post(baseUrl, searchData,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json'
        }
      })
      setPenjahit(paramsSearch ? response.data.data.data : response.data.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.current = false
    }
  }

  useEffect(()=>{
    let ignore = false
    if(!ignore){
      getPenjahit()
    }
    return ()=>{
      ignore=true
    }
  },[paramsSearch])
  console.log(penjahit)
  return (
    <>
    <div className="flex px-10 my-5 items-center justify-between">
        <p className='font-semibold text-3xl'>Penjahit Kami</p>
        <p className='flex'>Sort By <MdSort/></p>
    </div>
    <div className="mt-3 flex flex-col gap-5 pb-3">
      {isLoading.current && 
      <div className='flex flex-col gap-3 mt-2 justify-center items-center'>
        <img src={loading} className='w-1/3'/>
        <p>Sedang merajut data...</p>
      </div>
      }
      {penjahit.map((v,idx)=>{
        return(
          <PenjahitItem key={idx} id={v?.taylorId} servisid={v?.serviceId}  nama={v?.taylorName} distrik={v?.districtName} foto={v?.taylorPhoto} rating={v?.taylorRating} namaservis={v?.serviceName} price={v?.price} />
        )
      })}
    </div>
    </>
  )
}

export default PenjahitList