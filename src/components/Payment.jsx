import React, { useState } from "react";
import BookingHeaderButton from "./BookingHeaderButton";
import { IoIosArrowDown } from "react-icons/io";

export default function Payment() {
  const paymentOptions = [
    { text: "신용카드", value: 0 },
    { text: "휴대폰 결제", value: 1 },
    { text: "간편결제", value: 2 },
    { text: "내통장결제", value: 3 },
    { text: "토스", value: 4 },
  ];
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [selectedCard, setSelectedCard] = useState("카드를 선택하세요");

  const onChangeRadio = (e) => {
    setSelectedPayment(Number(e.target.value));
  };

  const cardOptions = [
    "카드를 선택하세요",
    "BC카드",
    "국민카드",
    "삼성카드",
    "신한카드",
    "현대카드",
    "롯데카드",
    "하나카드",
    "우리카드",
    "씨티카드",
    "NH농협카드",
    "카카오뱅크카드",
    "신세계카드",
    "전북카드",
    "광주카드",
    "수협카드",
    "제주카드",
    "산은카드",
    "MG새마을금고",
    "우체국카드",
    "KDB산업은행카드",
  ];

  return (
    <div className="w-[996px] mx-auto mt-8">
      <BookingHeaderButton />

      <div className="bg-[#F2F0E5] flex">
        <div className="w-[74%]">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`${
                  step > 1 ? "mt-7" : "mt-1"
                } px-5 bg-[#333333] h-8 flex items-center justify-between font-bold text-[#E0E0E0] text-lg`}>
                <span>
                  STEP {step}.
                  {step === 4 && (
                    <span className="text-sm"> 최종결제 수단</span>
                  )}
                </span>
                <span className="text-xs">다시하기</span>
              </div>

              {step === 4 ? (
                <div className="mt-1 border-t-[3px] border-x-[3px] border-[#DFDED6] font-bold text-sm">
                  <div className="px-4">
                    <div className="flex">
                      {paymentOptions.map((option, idx) => (
                        <label key={idx} className="block mr-4 py-3">
                          <input
                            type="radio"
                            value={option.value}
                            onChange={onChangeRadio}
                            checked={option.value === selectedPayment}
                            className="mr-2"
                          />
                          <span>{option.text}</span>
                        </label>
                      ))}
                    </div>

                    <div className="border-t-[3px] border-[#DFDED6] text-xs font-normal flex justify-between">
                      <div className="w-[69%]">
                        <div className="border-b-2 border-[#DFDED6] py-1.5 pl-9">
                          <span>카드종류</span>
                          <select
                            value={selectedCard}
                            onChange={(e) => setSelectedCard(e.target.value)}
                            className="w-40 ml-3 py-1.5 px-1 border border-[#ACABA2] bg-[#F2F0E5]">
                            {cardOptions.map((card, index) => (
                              <option key={index} value={card}>
                                {card}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <img
                          src="http://img.cgv.co.kr/Ria/RiaBanner/17029662369850.png"
                          alt="AD"
                          className="h-[200px] w-[192px] my-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#EBE9DF] w-full text-[#666666] text-xs font-normal py-5 px-7">
                    <p className="mb-1">
                      ※ 신용카드 결제 가능 최소 금액은 1,000원 이상입니다.
                    </p>

                    <span class="desc">
                      <a href="#" className="underline">
                        삼성U포인트 적립
                      </a>
                      &nbsp;&nbsp;
                      <a href="#" className="underline">
                        OK캐쉬백 적립
                      </a>
                      &nbsp;&nbsp;
                      <a href="#" className="underline">
                        신세계포인트 적립
                      </a>
                    </span>
                    <br />
                    <span class="option">
                      (삼성U포인트, OK캐쉬백, 신세계포인트는 포인트 중복 적립
                      불가)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-1 px-5 bg-[#DFDED6] h-11 flex items-center justify-between font-bold text-sm">
                  {step === 1 && "할인쿠폰"}
                  {step === 2 && "관람권/기프티콘"}
                  {step === 3 && "포인트 및 기타결제 수단"}
                  <IoIosArrowDown size={35} className="text-[#898984]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="w-[26%] text-[#333333] font-bold text-sm">
          <div className="float-right">
            <div className="bg-white p-4 drop-shadow-md">
              <div className="w-[192px] h-[76px] border-[2.5px] border-[#202020] rounded">
                <div className="h-[45%] flex justify-center items-center border-b border-[#333333]">
                  결제하실 금액
                </div>
                <div className="h-[55%] bg-[#474747] text-white flex items-center justify-end pr-2 text-xs">
                  <span className="text-xl">14,000</span>원
                </div>
              </div>

              <div className="w-[192px] h-[105px] border-[2.5px] border-[#202020] rounded my-5">
                <div className="h-[28.57%] flex justify-center items-center border-b border-[#333333] bg-[#D9E7EB]">
                  할인내역
                </div>
                <div className="h-[31.43%] flex justify-center items-center border-b border-[#333333]">
                  총 할인금액
                </div>
                <div className="h-[40%] bg-[#3C464F] text-[#89E5FF] flex items-center justify-end pr-2 text-xs">
                  <span className="text-xl">0</span>원
                </div>
              </div>

              <div className="w-[192px] h-[140px] border-[2.5px] border-[#202020] rounded">
                <div className="h-[20.71%] flex justify-center items-center border-b border-[#333333]/[.15] bg-[#F0EBD2]">
                  결제내역
                </div>
                <div className="h-[25.71%] flex justify-between items-center border-b border-[#333333] text-xs font-normal px-2">
                  <span>신용카드</span>
                  <span>14,000원</span>
                </div>
                <div className="h-[24.29%] flex justify-center items-center border-b border-[#333333]">
                  남은 결제금액
                </div>
                <div className="h-[29.29%] bg-[#443128] text-[#FFE56B] flex items-center justify-end pr-2 text-xs">
                  <span className="text-xl">14,000</span>원
                </div>
              </div>
            </div>

            <div className="mt-3 tracking-tighter">
              <div className="flex items-center font-normal text-[11px] border-b border-[#D7D6CF]">
                <img
                  src="http://img.cgv.co.kr/Ria/RiaBanner/16249345262810.png"
                  className="mr-1"
                />
                <span>10포인트부터 티켓 전액 결제가능!</span>
              </div>
              <div className="flex items-center font-normal text-[11px] border-b border-[#D7D6CF]">
                <img
                  src="http://img.cgv.co.kr/Ria/RiaBanner/16249334008850.png"
                  className="mr-1"
                />
                <span>M포인트 사용하고 즉시 할인받자</span>
              </div>
              <div className="flex items-center font-normal text-[11px] border-b border-[#D7D6CF]">
                <img
                  src="http://img.cgv.co.kr/Ria/RiaBanner/16249345262650.png"
                  className="mr-1"
                />
                <span>현금처럼 꿀머니 사용가능!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
