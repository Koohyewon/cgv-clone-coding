import React from "react";
import { useLocation } from "react-router-dom";

export default function MovieDetailInfo() {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) {
    return <div>영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {movie.original_language}
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {movie.title}
            </h1>
            <p className="mt-2 text-gray-500">{movie.overview}</p>
            <div className="mt-4">
              <span className="text-gray-500">개봉일: </span>
              <span className="font-semibold">{movie.release_date}</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-500">평점: </span>
              <span className="font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-gray-500">인기도: </span>
              <span className="font-semibold">
                {movie.popularity.toFixed(1)}
              </span>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {movie.adult ? "청소년 관람불가" : "전체 관람가"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
