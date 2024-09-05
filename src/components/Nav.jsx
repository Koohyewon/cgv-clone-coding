import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div className="border-t-2 border-t-[#E9E9E9] border-b-2 border-b-red-500">
        <div className="w-[65%] mx-auto h-16 flex items-center">
          <ul className="flex text-lg font-bold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `mr-4 p-4 pl-0 ${isActive ? "text-red-500" : "text-black"}`
              }
            >
              영화
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `mx-4 p-4 ${isActive ? "text-red-500" : "text-black"}`
              }
            >
              예매
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `mx-4 p-4 ${isActive ? "text-red-500" : "text-black"}`
              }
            >
              극장
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
}
