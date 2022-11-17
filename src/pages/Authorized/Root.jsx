import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";

function Root() {
  return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
  );
}

export default Root;
