import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assests/LOGO.png";
import "./Navbar.css";
import { logOutUser } from "../../store/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { user } = useSelector((state) => state.storeUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <div className="flex justify-between border border-primary rounded-md mt-[20px] p-[10px] h-[90px] items-center w-[90%]">
      <img src={logo} alt="logo" />
      {localStorage.hasOwnProperty("sa_user") ? (
        <div className="hidden md:items-center md:justify-between md:w-[60%] md:flex">
          <div className="flex gap-3 ">
            <NavLink
              to="/"
              className="bg-primary text-white px-6 py-2 rounded-lg"
            >
              Home
            </NavLink>
            <NavLink
              to="/posts"
              className="bg-primary text-white px-[14px] py-[7px] rounded-lg"
            >
              Posts
            </NavLink>
            <NavLink
              to="/ads"
              className="bg-primary text-white px-[14px] py-[7px] rounded-lg"
            >
              Ads
            </NavLink>
          </div>
          <div className="flex gap-2 w">
            <img
              src={user.image}
              alt="profile-img"
              className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer"
            />
            <button
              type="button"
              className="bg-primary text-white px-[14px] py-[7px] rounded-lg"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <NavLink
            to="/register"
            className="bg-primary text-white px-[14px] py-[7px] rounded-lg"
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className="bg-primary text-white px-[14px] py-[7px] rounded-lg  "
          >
            Login
          </NavLink>
        </div>
      )}
      <GiHamburgerMenu className="text-2xl block md:hidden " />
    </div>
  );
};

export default Navbar;
