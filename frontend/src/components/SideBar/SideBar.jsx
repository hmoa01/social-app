import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../store/userSlice";

import { NavLink, useNavigate } from "react-router-dom";

const SideBar = ({ isHamburgerClicked }) => {
  let sideRef = useRef(null);
  const [sideBar, setSideBar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  useEffect(() => {
    setSideBar((prev) => !prev);
  }, [isHamburgerClicked]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sideRef.current && !sideRef.current.contains(event.target)) {
        setSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sideBar]);

  const handleSideBar = () => {
    setSideBar((prev) => !prev);
  };

  return (
    <div
      ref={sideRef}
      className={` ${
        !sideBar ? "hidden" : ""
      }  flex bg-gray-700 items-center flex-col gap-3 fixed z-10 left-0 h-screen w-[40%]`}
    >
      <h1>{sideBar}</h1>
      <NavLink
        to="/"
        className="bg-primary w-[60%] mt-[20px] text-white px-6 py-2 rounded-lg"
      >
        Home
      </NavLink>

      <NavLink
        to="/posts"
        className="bg-primary w-[60%] mt-[20px] text-white px-6 py-2 rounded-lg"
      >
        Posts
      </NavLink>
      <NavLink
        to="/ads"
        className="bg-primary w-[60%] mt-[20px] text-white px-6 py-2 rounded-lg"
      >
        Ads
      </NavLink>
      {localStorage.hasOwnProperty("sa_user") ? (
        <button
          type="button"
          className="bg-primary w-[60%] mt-[20px] text-white px-6 py-2 rounded-lg"
          onClick={handleLogOut}
        >
          Log out
        </button>
      ) : (
        <NavLink
          to="/login"
          className="bg-primary text-white px-[14px] py-[7px] rounded-lg  "
        >
          Login
        </NavLink>
      )}
      <button
        className="text-lg absolute top-2 right-2 "
        onClick={handleSideBar}
      >
        X
      </button>
    </div>
  );
};
export default SideBar;
