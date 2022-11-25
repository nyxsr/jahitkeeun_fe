import axios from 'axios';
import { shortText } from 'limit-text-js';
import React, { useEffect, useRef, useState } from 'react'
import {MdSort} from 'react-icons/md'

function MakloonList() {
    const [data,setData] = useState();
    const token = sessionStorage.getItem('token')
    let seed;
    const [isLoading, setLoading] = useState(true)


    const getMakloon = async() =>{
        try {
            const response = await axios.get('http://api.jahitkeeun.my.id/api/datamaster/maklun',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setData(response.data.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

  

    useEffect(()=>{
        let ignore = false;
        if (!ignore) {
            getMakloon()
        }
        return ()=>{
            ignore = true
        }
    },[])
  return (
    <>
    <div className="flex px-10 my-5 items-center justify-between">
        <p className='font-semibold text-3xl'>List Makloon</p>
        <p className='flex'>Sort By <MdSort/></p>
    </div>
    <div className="mt-3 px-3 flex flex-col gap-5 pb-3">
   {isLoading && <p>Lagi loading....</p>}
   {(isLoading === false && !data) && <p>Tidak ada makloonan</p>}
   {(isLoading === false && data) && (
    <>
    {data.map((v,i)=>{
        const makluname = v.maklun_maker_name
        const maklunprice = v.maklun_price
        const maklundue = v.maklun_due_time 
        const deadline = maklundue.split("-").reverse().join("-");
        const price = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(parseInt(maklunprice));
        
        seed = makluname.replace(/\s/g, '');
        return(
    <div className='flex shadow-md py-2 px-2 bg-zinc-50 rounded-md cursor-pointer'>
        <img src={'https://avatars.dicebear.com/api/avataaars/'+seed+'.svg'} className='w-20' alt="" />
        <div className="flex flex-col">
            <p className='font-bold'>{v.maklun_title}</p>
            <p className=''>Pembuat :{shortText(v.maklun_maker_name,20,'...')}</p>
            <p className=''>Estimasi Gaji : <strong>{price}</strong></p>
            <p className=''>Deadline : <span>{deadline}</span></p>
        </div>
    </div>
        )
    })}
   </>
   )}
    </div>
    </>
  )
}

export default MakloonList
