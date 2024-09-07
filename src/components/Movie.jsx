import React, { useEffect, useState } from "react";
import axios from "axios";

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Movie() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular",
        params: { language: "ko-kr", page: "1" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDBmMjRjOTE3NTQ5NzQ3ZDNmYzdhOTRlOTU3YTM3MyIsIm5iZiI6MTcyMDY3NTI2OC44NDU0NDMsInN1YiI6IjY2OGYyZjE2NzI3ZTNiZDI3M2Y2YmIyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OV5n3pRizgsI70At8IHnwduNXCEHSp8ysSQwmJGU9uY",
        },
      };

      try {
        const response = await axios.request(options);
        const sortedMovies = response.data.results.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        setMovies(sortedMovies);
        //setMovies(response.data.results);
        console.log(sortedMovies);
      } catch (error) {
        console.error("API를 불러오지 못했습니다.", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="w-[65%] min-w-[980px] mx-auto pt-10 pb-20">
        <div className="border-b-[3px] border-b-black pb-6 text-4xl font-bold">
          무비차트
        </div>

        <div className="mt-10 grid grid-cols-4 gap-x-4 gap-y-16">
          {movies.map((movie, index) => (
            <React.Fragment key={movie.id}>
              {index === 3 && (
                <div className="w-4/5 h-full mx-auto flex items-center justify-center text-2xl font-bold">
                  <img
                    src="https://adimg.cgv.co.kr/images/202302/house/CGV_BUGS_160x300.png"
                    alt="Ad"
                    className="w-full"
                  />
                </div>
              )}

              {index !== 3 && (
                <div className="w-4/5 mx-auto">
                  <div
                    className={`h-9 mb-1 rounded-t-lg text-white text-xl font-bold flex items-center justify-center ${
                      index < 3 ? "bg-[#FB4357]" : "bg-black"
                    }`}>
                    No.{index < 3 ? index + 1 : index + 2}
                  </div>

                  <img
                    src={`${IMG_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full max-h-[330px] rounded-b-lg"
                  />

                  <div className="px-1.5 pt-2 pb-4">
                    <div className="font-bold h-5 overflow-hidden">
                      {movie.title}
                    </div>

                    <div className="flex items-center mt-2 font-bold text-sm">
                      <div>개봉일 {movie.release_date}</div>
                      <div className="mx-2 h-4 w-px bg-gray-300"></div>
                      <div className="flex items-center">
                        평점 {movie.vote_average.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  <button className="w-24 h-7 mr-1.5 rounded-md float-right bg-red-500 text-white text-sm font-bold">
                    예매하기
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
