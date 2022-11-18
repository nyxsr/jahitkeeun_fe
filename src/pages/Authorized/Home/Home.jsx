import React from "react";
import CarouselSection from "../../../components/App-CarouselSection/CarouselSection";
import { CategorySection } from "../../../components/App-CategorySection/CategorySection";
import SearchAndCart from "../../../components/App-SearchAndCart/SearchAndCart";

function Home() {
  return (
    <>
      <div className="h-screen bg-slate-200">
        <div className="w-[30.375rem] mx-auto py-10 bg-[#FFF8EA]">
          <SearchAndCart />
          <CarouselSection />
          <CategorySection/>
        </div>
      </div>
    </>
  );
}

export default Home;
