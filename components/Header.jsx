"use client";
import { useUserTask } from "@/context/UserTaskContext";
import React from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const { user, openMenu, setOpenMenu } = useUserTask();

  return (
    <>
      <div className="w-full z-40 bg-slate-900 sticky top-0 h-[60px] border-b border-b-gray-700 px-5 flex items-center justify-between md:px-28">
        <div className="flex items-center justify-between">
          <span
            className="cursor-pointer md:hidden transform rotate-180"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu
              ? user?.name && <IoMdClose size={23} />
              : user?.name && <RiMenu3Fill size={24} />}
          </span>
          <span className="font-semibold -ml-24 hidden md:inline-block">
            Task Manager
          </span>
        </div>
        {user?.name && (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 font-bold text-xl">
            {user?.name[0]}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
