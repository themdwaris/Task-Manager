"use client";

import { useUserTask } from "@/context/UserTaskContext";
import React from "react";

const Wrapper = ({ children }) => {
  const {setOpenForm }=useUserTask()
  return <div className="w-full fixed h-[95vh] md:min-h-screen inset-0 flex items-center justify-center z-50 backdrop-blur-sm px-5" onClick={(e)=>{
    e.stopPropagation()
    setOpenForm(false)
  }}>
    {children}
  </div>
};

export default Wrapper;
