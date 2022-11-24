import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home, { ConvectionHome, TaylorHome } from "./Home/Home";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Pesanan, { PesananTaylor } from "./Pesanan/Pesanan";
import BottomNav from "../../components/App-BotNav/BottomNav";
import Profil, { EditPassword, EditProfil } from "./Profil/Profil";
import "react-toastify/dist/ReactToastify.css";
import { DetailTaylor } from "../../components/App-PenjahitListSection/PenjahitItem";
import axios from "axios";
import { TambahAlamat, UserAddress } from "../../components/App-UserLocation/UserLocation";
import AppCart from "../../components/App-Cart/AppCart";
import OrderService from "../../components/App-OrderService/OrderService";
import Checkout from "./Checkout/Checkout";

function Root() {
  const data = JSON.parse(sessionStorage.getItem("data"));
  const role = data.role;
  const token = sessionStorage.getItem("token");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "https://apijahitkeeun.tepat.co.id/api/sectionitem",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      setStatus(error.response.data.message);
    }
  };

  useEffect(() => {
    checkAuth();
    if (status === "Unauthenticated.") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("data");
      sessionStorage.removeItem("inNavbarApp");
      navigate("../../login", {
        state: {
          warning: "Sesi login anda habis, silahkan login kembali!",
        },
      });
    }
  }, []);
  return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#b0b0b0">
      <BottomNav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/cart" element={<AppCart />} />
        <Route path="/home/checkout" element={<Checkout />} />
        <Route path="/home/address/:id" element={<UserAddress />} />
        <Route path="/home/address/add/:id" element={<TambahAlamat />} />
        <Route path="/home/detail/:id" element={<DetailTaylor />} />
        <Route path="/home/detail/order/:id" element={<OrderService />} />
        <Route path="/taylor/home" element={<TaylorHome />} />
        <Route path="/taylor/pesanan" element={<PesananTaylor />} />
        <Route path="/taylor/profil" element={<Profil />} />
        <Route path="/convection/home" element={<ConvectionHome />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profil/edit" element={<EditProfil />} />
        <Route path="/profil/editpw" element={<EditPassword />} />
        <Route
          path="/"
          element={
            role === "taylor" ? (
              <Navigate to="/taylor/home" />
            ) : role === "client" ? (
              <Navigate to="/taylor/home" />
            ) : role === "convection" ? (
              <Navigate to="/convection/home" />
            ) : (
              <Navigate to="/appAdmin" />
            )
          }
        />
      </Routes>
    </SkeletonTheme>
  );
}

export default Root;
