import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assests/LOGO.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="flex justify-between border border-primary rounded-md mt-[35px] p-[10px] h-[90px] items-center w-[1370px]">
      <img src={logo} alt="logo" />
      <div className="flex gap-2 items-center">
        <NavLink
          to="/register"
          className="bg-primary text-white px-[14px] py-[7px] rounded-lg"
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          className="bg-primary text-white px-[14px] py-[7px] rounded-lg "
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
