import React from "react";
import { Link } from "react-router-dom";
import { SlLock } from "react-icons/sl";
import { IoPersonAddOutline } from "react-icons/io5";

const HeaderLink = ({ to, icon: Icon, text }) => (
  <Link to={to}>
    <div className="flex flex-col items-center mx-3 p-2">
      <Icon size={28} className="mb-2" />
      <span>{text}</span>
    </div>
  </Link>
);

export default function HeaderBeforeLogin() {
  return (
    <div className="w-[65%] min-w-[980px] mx-auto flex justify-between items-center py-5">
      <Link to="/">
        <div className="flex items-center text-2xl font-bold">
          <img
            src="https://img.cgv.co.kr/R2014/images/common/logo/logoRed.png"
            alt="CGV Logo"
            className="max-h-16"
          />
        </div>
      </Link>

      <div className="flex text-sm font-semibold">
        <HeaderLink to="/login" icon={SlLock} text="로그인" />
        <HeaderLink to="/signup" icon={IoPersonAddOutline} text="회원가입" />
      </div>
    </div>
  );
}
