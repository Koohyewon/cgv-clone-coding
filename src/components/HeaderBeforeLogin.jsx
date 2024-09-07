import React from "react";
import { Link } from "react-router-dom";

import { SlLock } from "react-icons/sl";
import { IoPersonAddOutline } from "react-icons/io5";

export default function HeaderBeforeLogin() {
  return (
    <>
      <div className="w-[65%] min-w-[980px] mx-auto flex justify-between items-center py-5">
        <Link to="/">
          <div className="flex items-center text-2xl font-bold">
            <img
              src="https://img.cgv.co.kr/R2014/images/common/logo/logoRed.png"
              className="max-h-16"
            />
          </div>
        </Link>

        <div className="flex text-sm font-semibold">
          <Link to="/login">
            <div className="flex flex-col items-center mx-3 p-2">
              <SlLock size={28} className="mb-2" />
              <span>로그인</span>
            </div>
          </Link>

          <Link to="/signup">
            <div className="flex flex-col items-center ml-3 p-2">
              <IoPersonAddOutline size={28} className="mb-2" />
              <span>회원가입</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
