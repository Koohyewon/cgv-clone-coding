import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", text: "영화", exact: true },
  { to: "/ticket", text: "예매" },
  { to: "/signup", text: "극장" },
];

export default function Nav() {
  return (
    <div className="min-w-[980px] border-t-2 border-t-[#E9E9E9] border-b-2 border-b-red-500">
      <div className="w-[65%] min-w-[980px] mx-auto h-16 flex items-center">
        <ul className="flex text-lg font-bold">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `${index === 0 ? "pl-0 mr-4" : "mx-4"} p-4 ${
                  isActive ? "text-red-500" : "text-black"
                }`
              }
            >
              {item.text}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}
