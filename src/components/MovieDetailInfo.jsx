import React from "react";
import { useLocation } from "react-router-dom";

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <div className="text-gray-600 flex items-center">
      <span className="bg-[#FB4357] w-1 h-[18px] mr-3" />
      <span>{label}</span>
    </div>
    <span className="text-gray-800">{value}</span>
  </div>
);

const MoviePoster = ({ path, title }) => (
  <img
    className="w-1/2 object-fill rounded-xl shadow-xl shadow-black/50 mr-16"
    src={`https://image.tmdb.org/t/p/w500${path}`}
    alt={title}
  />
);

const MovieTitle = ({ title, originalTitle }) => (
  <div className="border-b-[3px] border-black/[.2]">
    <div className="text-3xl">{title}</div>
    <div className="text-2xl mt-3 mb-8">{originalTitle}</div>
  </div>
);

const BookingButton = () => (
  <button className="h-14 w-full bg-[#FB4357] text-white text-xl rounded-full mt-4">
    예매하기
  </button>
);

export default function MovieDetailInfo() {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) {
    return <div>영화 정보를 찾을 수 없습니다.</div>;
  }

  const movieInfo = [
    { label: "언어", value: movie.original_language },
    { label: "등급", value: movie.adult ? "청소년 관람불가" : "전체 관람가" },
    { label: "장르", value: movie.genre_ids.join(", ") },
    { label: "개봉일", value: movie.release_date },
    { label: "평점", value: movie.vote_average.toFixed(1) },
  ];

  return (
    <div className="w-[65%] min-w-[980px] mx-auto p-20 font-bold">
      <div className="flex justify-center items-center">
        <MoviePoster path={movie.poster_path} title={movie.title} />

        <div className="w-1/2 text-center">
          <MovieTitle
            title={movie.title}
            originalTitle={movie.original_title}
          />

          <div className="space-y-3 text-lg px-14 my-8">
            {movieInfo.map((item, index) => (
              <InfoItem key={index} label={item.label} value={item.value} />
            ))}
          </div>

          <BookingButton />
        </div>
      </div>

      <div className="mt-16 px-5">
        <p className="text-xl mb-4 pb-4 border-b-2 border-black/[.3]">줄거리</p>
        <p className="text-lg text-black/[.5]">{movie.overview}</p>
      </div>
    </div>
  );
}
