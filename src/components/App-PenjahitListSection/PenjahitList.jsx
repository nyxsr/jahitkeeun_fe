import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {MdSort} from 'react-icons/md'
import PenjahitItem from './PenjahitItem'
import loading from '../../assets/tumblr_mo4hyqKMah1r1tulfo1_500.gif'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import Select from 'react-select'

function PenjahitList(props) {
  const [penjahit, setPenjahit] = useState([])
  const {paramsSearch} = useSelector(state => state.searchParam)
  const token = sessionStorage.getItem('token')
  const isLoading = useRef(true);
  const [isClearable, setIsClearable] = useState(true)
  const [filter,SetFilter] = useState()
  const searchData = {
    keyword:paramsSearch
  }
  const [showFilter, setShowFilter] = useState(false) 

  const filterOptions = [
    {value:'rating', label:'Rating'},
    {value:'price', label:'Harga'}
  ]
  
  
  const search = axios.post('http://api.jahitkeeun.my.id/api/search', searchData ,{
    headers:{
      'Authorization': `Bearer ${token}`,
      'Accept':'application/json'
    }
  })

  const list = axios.get('https://api.jahitkeeun.my.id/api/taylor',{
    headers:{
      'Authorization': `Bearer ${token}`,
      'Accept':'application/json'
    }
  })

  const filterRating = axios.get(`https://api.jahitkeeun.my.id/api/taylor/rating/1`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

  const filterPrice = axios.get(`https://api.jahitkeeun.my.id/api/taylor/price/1`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

  

  const baseUrl = paramsSearch ? search : filter === 'rating' ? filterRating : filter === 'price' ? filterPrice : list  

  const getPenjahit = async() =>{
    try {
      const response = await baseUrl
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
        <p className='flex cursor-pointer' onClick={()=>showFilter === false ? setShowFilter(true) : setShowFilter(false)}>Sort By <MdSort/></p>
    </div>
    {showFilter !== false && <Select options={filterOptions} onChange={(e)=>SetFilter(e.value)} isClearable={isClearable} className='w-44 mr-10 mb-8 ml-auto'/>}
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