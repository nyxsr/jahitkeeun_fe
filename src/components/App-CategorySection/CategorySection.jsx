import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import blouse from "../../assets/blouse.svg";

export const CategorySection = () => {
  return (
    <div className="mt-3 px-10">
      <p className="text-3xl font-semibold pb-3">Kategori Item</p>
      <OwlCarousel className="owl-theme" dots={false} items={4} margin={15}>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
        <div className="item">
          <img src={blouse} className='rounded-md' alt="" />
        </div>
      </OwlCarousel>
    </div>
  );
};
