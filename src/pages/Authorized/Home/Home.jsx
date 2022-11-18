import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CarouselSection from "../../../components/App-CarouselSection/CarouselSection";
import { CategorySection } from "../../../components/App-CategorySection/CategorySection";
import PenjahitList from "../../../components/App-PenjahitListSection/PenjahitList";
import SearchAndCart from "../../../components/App-SearchAndCart/SearchAndCart";
import { ADD_IMAGES } from "../../../slice/imageSlideSlice";
import Skeleton from "react-loading-skeleton";

function Home() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  async function fetchImages() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          "https://source.unsplash.com/random/250x150",
          "https://source.unsplash.com/random/250x151",
          "https://source.unsplash.com/random/250x152",
          "https://source.unsplash.com/random/250x153",
          "https://source.unsplash.com/random/250x154",
        ]);
      }, 2500);
    });
  }

  useEffect(() => {
    fetchImages().then((data) => {
      console.log(data);
      setLoading(false);
      dispatch(ADD_IMAGES(data));
    });
  }, []);

  return (
    <>
      <div className="h-screen bg-slate-200">
        <div className="w-screen md:w-[30.375rem] mx-auto py-10 pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
          {isLoading && (
            <div className="px-3">
              <Skeleton height="3rem" />
              <div className="mt-3">
                <Skeleton height="10rem" />
              </div>
              <div className="mt-3">
                <Skeleton height="3rem" />
              </div>
              <div className="flex justify-center mt-3 gap-3">
                <Skeleton height="6rem" width='6rem' />
                <Skeleton height="6rem" width='6rem' />
                <Skeleton height="6rem" width='6rem' />
                <Skeleton height="6rem" width='6rem' />
              </div>
              <div className="mt-3">
                <Skeleton />
              </div>
              <div className="mt-3">
                <div className="flex justify-center items-center flex-col gap-4">
                <Skeleton width='26rem' height='8rem'/>
                <Skeleton width='26rem' height='8rem'/>
                <Skeleton width='26rem' height='8rem'/>
                <Skeleton width='26rem' height='8rem'/>
                </div>
              </div>
            </div>
          )}
          {!isLoading && (
            <>
              <SearchAndCart />
              <CarouselSection />
              <CategorySection />
              <PenjahitList />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
