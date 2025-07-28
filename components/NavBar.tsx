import React from "react";
import { FaGithub } from "react-icons/fa";

const NavBar = () => {
  return (
    <div
      className="w-full h-[60px] flex flex-row justify-items-end gap-[50px] items-center 
     bg-green-600 fixed top-0 z-50 border-b-[1px] border-b-black"
    >
      <div className="flex flex-row gap-[12px]">
        <div className="text-[26px]  text-white ml-[30px]">RV Interpreter</div>
        <a
          className="mt-[8px]"
          href="https://github.com/rohanvan123/rv-interpreter.git"
          target="_blank"
        >
          <FaGithub color="white" size={25} />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
