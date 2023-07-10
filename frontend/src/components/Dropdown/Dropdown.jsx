import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dropdown = ({ dropdownOpen }) => {
  const [outsideClick, setOutsideClick] = useState(false);
  const { user } = useSelector((state) => state.storeUser);

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
      } w-[100px] flex flex-col gap-2 absolute z-20 top-12 right-6 md:right-[85px] items-center bg-gray-500 text-white rounded-md p-3`}
    >
      <Link to={`/userProfile/${user._id}`} className="">
        My profile
      </Link>
      <Link to={`/userPosts/${user._id}`} className="">
        My posts
      </Link>
      <div className="absolute top-[-5px] right-[20px]  bg-gray-500 w-5 h-5  rotate-45 "></div>
    </div>
  );
};

export default Dropdown;
