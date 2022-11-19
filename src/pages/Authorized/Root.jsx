import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home, { ConvectionHome, TaylorHome } from "./Home/Home";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Pesanan from "./Pesanan/Pesanan";
import BottomNav from "../../components/App-BotNav/BottomNav";
import Profil, { EditProfil } from "./Profil/Profil";
import 'react-toastify/dist/ReactToastify.css';


function Root() {
  const data = JSON.parse(sessionStorage.getItem('data'))
  const role = data.role
  return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#b0b0b0">
      <BottomNav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/taylor/home" element={<TaylorHome />} />
        <Route path="/convection/home" element={<ConvectionHome />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profil/edit" element={<EditProfil />} />
        <Route path="/" element={role === 'taylor' ? <Navigate to='/taylor/home'/> : role === 'client' ? <Navigate to='/taylor/home'/> : role === 'convection' ? <Navigate to='/convection/home'/> : <Navigate to='/appAdmin'/> } />
      </Routes>
    </SkeletonTheme>
  );
}

export default Root;
