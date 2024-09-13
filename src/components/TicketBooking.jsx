import React from "react";
import { useLocation } from "react-router-dom";

const MovieTitle = ({ title, originalTitle }) => (
  <div className="border-b-[3px] border-black/[.2]">
    <div className="text-3xl">{title}</div>
    <div className="text-2xl mt-3 mb-8">{originalTitle}</div>
  </div>
);

export default function TicketBooking() {
  const location = useLocation();
  const movie = location.state?.movie;

  return (
    <div>
      {movie ? (
        <MovieTitle title={movie.title} originalTitle={movie.original_title} />
      ) : (
        <div>영화정보를 찾을 수 없음</div>
      )}
    </div>
  );
}
