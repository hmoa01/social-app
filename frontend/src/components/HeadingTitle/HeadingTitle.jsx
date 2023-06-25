import React from "react";

const HeadingTitle = ({ title }) => {
  return (
    <div className="w-[652px] h-[60px] mt-[30px] text-primary font-bold border border-primary flex justify-center items-center rounded-lg ">
      <p>{title}</p>
    </div>
  );
};

export default HeadingTitle;
