import React, { useState } from "react";

const SeatRow = ({ row, seats, selectedSeats, onSeatClick, bookedSeats }) => (
  <div className="flex items-center">
    <span className="w-4 text-xs font-bold mr-2 text-[#4A4A49]">{row}</span>
    <div className="flex space-x-[1px]">
      {seats.map((seat) => {
        const isSelected = selectedSeats.includes(`${row}${seat}`);
        const isBooked = bookedSeats.includes(`${row}${seat}`);
        return (
          <button
            key={`${row}${seat}`}
            className={`w-4 h-4 text-[10px] font-bold text-white ${
              isBooked
                ? "bg-[#BBBBBB] cursor-not-allowed"
                : isSelected
                ? "bg-[#D20000]"
                : "bg-[#9E705D] hover:bg-[#D20000]"
            }`}
            onClick={() => onSeatClick(`${row}${seat}`)}
            disabled={isBooked}>
            {seat}
          </button>
        );
      })}
    </div>
  </div>
);

const TheaterSeating = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 5;
  const bookedSeats = ["A1", "B2", "C3", "D4", "E5"]; // Example of pre-booked seats

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat)
        : [...prevSelected, seat]
    );
  };

  return (
    <>
      <div className="pretendard w-[79%] h-[26px] mb-[60px] bg-[#D8D6D1]/[.5] text-[#3B3B3A] font-bold flex items-center justify-center">
        SCREEN
      </div>

      <div className="space-y-[1px]">
        {rows.map((row) => (
          <SeatRow
            key={row}
            row={row}
            seats={Array.from({ length: seatsPerRow }, (_, i) => i + 1)}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
            bookedSeats={bookedSeats}
          />
        ))}
      </div>
    </>
  );
};

export default TheaterSeating;
