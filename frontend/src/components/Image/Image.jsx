import React from "react";

const Image = ({ alt, image }) => {
  return (
    <div className="mt-[30px] w-[672px] h-[707px]">
      <img alt={alt} src={image}></img>
    </div>
  );
};

export default Image;
