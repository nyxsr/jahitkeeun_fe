import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Pesanan from "./Pesanan/Pesanan";
import BottomNav from "../../components/App-BotNav/BottomNav";
import Profil from "./Profil/Profil";


function Root() {
  return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#b0b0b0">
      <BottomNav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </SkeletonTheme>
  );
}

export default Root;
