import React from "react";
import "./UserProfile.css";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  return (
    <div className="flex mt-[30px] h-[750px] w-[1350px] rounded-lg border border-primary overflow-hidden">
      <div className="w-1/4 bg-gray-600 h-full flex flex-col items-center ">
        <NavLink className="w-full h-[40px]">My Profile</NavLink>
        <NavLink className="w-full h-[40px]">My Memories</NavLink>
      </div>
      <div></div>
    </div>
  );
};

export default UserProfile;
