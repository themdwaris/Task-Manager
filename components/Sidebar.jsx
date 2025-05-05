"use client";
import { useUserTask } from "@/context/UserTaskContext";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = () => {
  const { openMenu,setOpenMenu, router, setUser, user } = useUserTask();
  const pathname = usePathname();

  const logout = async () => {
    try {
      const res = await axios.post("/api/logout");
      if (res?.data?.success) {
        toast.success(res.data.message);
        router.push("/login");
        setUser({});
      }
    } catch (error) {
      console.log("Failed to logout::", error);
    }
  };
  return (
    <>
      {user?.name ? (
        <div
          className={`md:min-w-64 h-[calc(100vh)] md:border-r border-r-gray-700 md:sticky top-0 fixed left-0 z-30 bg-slate-900 transition-all transform duration-200 ${
            openMenu ? "min-w-64" : "w-0 overflow-hidden"
          }`}
        >
          <div className="w-full flex items-center">
            <h1 className="w-full flex items-center justify-between p-4 font-semibold border-b md:border-none border-b-gray-700 text-base">
              <span className="md:hidden">Task Manager</span>
            </h1>
          </div>

          <div className="pt-4 h-[calc(100vh-100px)] w-full flex flex-col justify-between px-3">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className={`p-3 rounded-lg transition transform active:scale-90 hover:bg-green-800 ${
                  pathname === "/" ? "bg-green-800" : "bg-white/10"
                }`}
                onClick={()=>setOpenMenu(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/createdTask"
                className={`p-3 rounded-lg transition transform active:scale-90 hover:bg-green-800 ${
                  pathname === "/createdTask" ? "bg-green-800" : "bg-white/10"
                }`}
                onClick={()=>setOpenMenu(false)}
              >
                Created Task
              </Link>
              <Link
                href="/assignedTask"
                className={`p-3 rounded-lg transition transform active:scale-90 hover:bg-green-800 ${
                  pathname === "/assignedTask" ? "bg-green-800" : "bg-white/10"
                }`}
                onClick={()=>setOpenMenu(false)}
              >
                Assigned Task
              </Link>
              <Link
                href="/dueTask"
                className={`p-3 rounded-lg transition transform active:scale-90 hover:bg-green-800 ${
                  pathname === "/dueTask" ? "bg-green-800" : "bg-white/10"
                }`}
                onClick={()=>setOpenMenu(false)}
              >
                Due Task
              </Link>
            </div>
            <button
              className="px-3 py-2 rounded-lg bg-red-800 flex items-center justify-center gap-2.5 cursor-pointer transition transform active:scale-90"
              onClick={logout}
            >
              <span>
                <HiOutlineLogout size={20} />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
