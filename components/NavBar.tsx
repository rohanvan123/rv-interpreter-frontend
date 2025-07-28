import React from "react";

const NavBar = () => {
  return (
    <div
      className="w-full h-[70px] flex flex-row justify-items-end gap-[50px] items-center 
     bg-green-600 fixed top-0 z-50 border-b-[1px] border-b-black"
    >
      <div className="text-[30px]  text-white ml-[50px]">RV Interpreter</div>
    </div>
  );
};

export default NavBar;
