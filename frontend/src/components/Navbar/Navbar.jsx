import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assests/LOGO.png";
import "./Navbar.css";
import { logOutUser } from "../../store/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.storeUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <div className="flex justify-between border border-primary rounded-md mt-[35px] p-[10px] h-[90px] items-center w-[1370px]">
      <img src={logo} alt="logo" />
      {localStorage.hasOwnProperty("sa_user") ? (
        <div className="flex items-center justify-between w-[60%]">
          <div className="flex gap-3 te">
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
          <div className="flex gap-2">
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
            className="bg-primary text-white px-[14px] py-[7px] rounded-lg "
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
