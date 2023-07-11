import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./DropDown.css";

const Dropdown = ({ dropdownOpen }) => {
  const [outsideClick, setOutsideClick] = useState(false);
  const { user } = useSelector((state) => state.storeUser);
  const [profile, setprofile] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setOutsideClick((prev) => !prev);
  }, [dropdownOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOutsideClick(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [outsideClick]);

  return (
    <div
      ref={dropdownRef}
      className={`${
        !outsideClick ? "hidden" : ""
      } w-[150px] flex flex-col  absolute  top-12 right-6 z-10 md:right-[80px] items-center bg-gray-400 text-white rounded-md `}
    >
      <NavLink
        onClick={() => setprofile(true)}
        to={`/userProfile/${user._id}`}
        className="bg-gray-400 w-full p-2 rounded-md"
      >
        My profile
      </NavLink>
      <NavLink
        to={`/userPosts/${user._id}`}
        onClick={() => setprofile(false)}
        className="bg-gray-400 w-full p-2 rounded-md"
      >
        My posts
      </NavLink>
      <div
        className={`absolute top-[-5px] right-[20px] z-50 ${
          profile ? "bg-primary" : "bg-gray-400"
        } w-5 h-5  rotate-45 `}>
      </div>
    </div>
  );
};

export default Dropdown;
