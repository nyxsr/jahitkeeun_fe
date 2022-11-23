import React, { useEffect, useRef, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

export const CategorySection = () => {
  const token = sessionStorage.getItem('token')
  const [item,setItem] = useState([]);
  const isLoading = useRef(true);

  const getCategory = async() =>{
    try {
      const response = await axios.get('https://api.jahitkeeun.my.id/api/sectionitem',{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json'
        }
      })
      setItem(response.data.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.current = false
    }
  }

  useEffect(()=>{
    let ignore = false
    if (!ignore) {
      getCategory()
    }
    return () =>{
      ignore=true
    }
  },[])

  console.log(item)
  return (
    <div className="mt-3 px-10">
      <p className="text-3xl font-semibold pb-3">Kategori Item</p>
      <OwlCarousel className="owl-theme" dots={false} items={3} margin={15}>
        {isLoading.current && <p>Loading...</p>}
        {item.map((v,i)=>{
          return(
        <div className="item bg-[#402E32] rounded-md" key={i}>
          <img src={'https://api.jahitkeeun.my.id/photo-item/'+v.itemPhoto} className='rounded-md py-2 px-2' alt="" />
          <p className="text-xl text-center text-white">{v.itemName}</p>
        </div>
          )
        })}
        
      </OwlCarousel>
    </div>
  );
};
