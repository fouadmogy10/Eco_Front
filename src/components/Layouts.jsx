import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer/Footer";
function Layouts() {
  return (
    <>
      <Header />
          <Outlet />
      <Footer />
    </>
  );
}

export default Layouts;
