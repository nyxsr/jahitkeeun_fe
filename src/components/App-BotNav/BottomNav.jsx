import React from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { FaListUl, FaUser } from "react-icons/fa";

function BottomNav() {
  return (
    <div className="fixed w-screen mx-auto md:w-[30.375rem] bottom-0 left-0 right-0 z-50">
      <div className="flex justify-evenly py-3 bg-zinc-50">
        <NavLink
        to='../../app/home'
          style={({ isActive }) => ({
            color: isActive ? "#F1C232" : "#402E32",
          })}
        >
          <div className="flex flex-col justify-center items-center">
            <HiHome />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
        to='../../app/pesanan'
        style={({ isActive }) => ({
            color: isActive ? "#F1C232" : "#402E32",
          })}
        >
          <div className="flex flex-col justify-center items-center">
            <FaListUl />
            <p>Pesanan</p>
          </div>
        </NavLink>
        <NavLink
        to='../../app/profil'
        style={({ isActive }) => ({
            color: isActive ? "#F1C232" : "#402E32",
          })}
        >
          <div className="flex flex-col justify-center items-center">
            <FaUser />
            <p>Profil</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default BottomNav;
