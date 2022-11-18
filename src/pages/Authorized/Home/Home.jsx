import React from "react";
import BottomNav from "../../../components/App-BotNav/BottomNav";
import CarouselSection from "../../../components/App-CarouselSection/CarouselSection";
import { CategorySection } from "../../../components/App-CategorySection/CategorySection";
import PenjahitList from "../../../components/App-PenjahitListSection/PenjahitList";
import SearchAndCart from "../../../components/App-SearchAndCart/SearchAndCart";

function Home() {
  return (
    <>
      <div className="h-screen bg-slate-200">
        <div className="w-screen md:w-[30.375rem] mx-auto py-10 pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
          <BottomNav/>
          <SearchAndCart />
          <CarouselSection />
          <CategorySection/>
          <PenjahitList/>
        </div>
      </div>
    </>
  );
}

export default Home;
