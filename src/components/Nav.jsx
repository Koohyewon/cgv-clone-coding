import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", text: "영화", exact: true },
  { to: "/signup", text: "극장" },
  { to: "/ticket", text: "예매" },
  { to: "/store", text: "스토어" },
  { to: "/event", text: "이벤트" },
  { to: "/adventage", text: "혜택" },
];

export default function Nav() {
  return (
    <div className="pretendard min-w-[996px] h-[50px] border-t-2 border-t-[#E9E9E9] border-b-2 border-b-red-500">
      <div className="w-[996px] mx-auto h-full flex items-center">
        <ul className="flex text-base font-bold">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `${index === 0 ? "pl-0 mr-4" : "mx-3"} p-4 ${
                  isActive ? "text-[#FB4357]" : "text-black"
                }`
              }>
              {item.text}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}
