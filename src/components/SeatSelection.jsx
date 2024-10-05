import React, { useState } from "react";
import BookingHeaderButton from "./BookingHeaderButton";
import { IoMdRefresh } from "react-icons/io";

export default function SeatSelection() {
  const [counts, setCounts] = useState({
    adult: 0,
    youth: 0,
    senior: 0,
    child: 0,
  });

  const handleCountChange = (type, count) => {
    setCounts((prev) => ({ ...prev, [type]: count }));
  };

  const renderCountSelector = (type, title, max = 8) => {
    return (
      <div className="group flex items-center mb-2" id={`nop_group_${type}`}>
        <span className="title w-14 text-xs text-[#666666]">{title}</span>
        <ul className="flex flex-wrap gap-1 mt-1">
          {[...Array(max + 1)].map((_, i) => (
            <li
              key={i}
              data-count={i}
              className={`cursor-pointer ${
                counts[type] === i
                  ? "bg-[#333333] text-white"
                  : "bg-[#F2F0E5] border border-[#a0a0a0]"
              } w-[22px] h-[22px] flex items-center justify-center text-sm font-bold`}
              onClick={() => handleCountChange(type, i)}>
              {i}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="w-[996px] mx-auto mt-8">
        <BookingHeaderButton />

        <div className="border-2 border-[#D4D3C9]">
          <div className="bg-[#F2F0E5] overflow-hidden">
            <div className="flex border-b h-[600px]">
              <div className="w-full border-[#D4D3C9] flex flex-col">
                <div className="w-full h-9 bg-[#333333] text-base text-white font-bold flex justify-center items-center flex-shrink-0 relative">
                  <span>인원 / 좌석</span>
                  <span className="absolute right-4 flex items-center text-sm font-normal cursor-pointer">
                    다시하기
                    <IoMdRefresh size={24} />
                  </span>
                </div>
                <div className="border-b-2 border-[#D4D3C9] flex">
                  <div className="w-[46%] border-r border-[#D4D3C9] mt-3 px-4 text-xs">
                    <p className="text-[#FF0000] text-right">
                      * 최대 8명 선택 가능
                    </p>

                    {renderCountSelector("adult", "일반")}
                    {renderCountSelector("youth", "청소년")}
                    {renderCountSelector("senior", "경로")}

                    <div className="flex items-center justify-between mb-1.5">
                      {renderCountSelector("child", "우대")}
                      <button className="text-xs py-[1px] px-1.5 rounded text-white bg-[#926F60] border border-[#745447]">
                        관람 할인 안내
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 px-5">
                    <div>
                      <span>CGV /영화관/</span>
                      <div className="mx-2 h-4 w-px bg-gray-300"></div>
                      <span>CGV /영화관/</span>
                      <div className="mx-2 h-4 w-px bg-gray-300"></div>
                      <span>CGV /영화관/</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
