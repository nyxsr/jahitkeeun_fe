import React from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { FaListUl, FaUser } from "react-icons/fa";

function BottomNav() {
  const role = JSON.parse(sessionStorage.getItem('data'))
  return (
    <div className="fixed w-screen mx-auto md:w-[30.375rem] bottom-0 left-0 right-0 z-50">
      <div className="flex justify-evenly py-3 bg-zinc-50">
        <NavLink
        to={role.role === 'client' ? '../../app/home' : role.role === 'taylor' ? '../../app/taylor/home' : '../../app/convection/home'}
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
        to={role.role === 'client' ? '../../app/pesanan' : role.role === 'taylor' ? '../../app/taylor/pesanan' : '../../app/convection/pesanan'}
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
        to={role.role === 'client' ? '../../app/profil' : role.role === 'taylor' ? '../../app/taylor/profil' : '../../app/convection/profil'}
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
