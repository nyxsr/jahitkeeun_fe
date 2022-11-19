import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {MdSort} from 'react-icons/md'
import PenjahitItem from './PenjahitItem'
import loading from '../../assets/tumblr_mo4hyqKMah1r1tulfo1_500.gif'
import Skeleton from 'react-loading-skeleton'

function PenjahitList() {
  const [penjahit, setPenjahit] = useState([])
  const isLoading = useRef(true);

  const token = sessionStorage.getItem('token')
  const getPenjahit = async() =>{
    try {
      const response = await axios.get('https://apijahitkeeun.tepat.co.id/api/taylor',{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json'
        }
      })
      setPenjahit(response.data.data)
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
  },[])

  console.log(penjahit)
  return (
    <>
    <div className="flex px-10 mt-5 justify-between">
        <p className='font-semibold text-2xl'>Penjahit Kami</p>
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
          <PenjahitItem key={idx} nama={v.taylorName}/>
        )
      })}
    </div>
    </>
  )
}

export default PenjahitList