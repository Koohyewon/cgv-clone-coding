import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieBooking = () => {
  const [selectedMovie, setSelectedMovie] =
    useState("임영웅 | 아임 히어로 더 파이널");
  const [selectedTheater, setSelectedTheater] = useState("강남");
  const [selectedDate, setSelectedDate] = useState("2024.8.24");
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
        setMovies(response.data.results);
        if (response.data.results.length > 0) {
          setSelectedMovie(response.data.results[0].title);
        }
        console.log(response.data.results);
      } catch (error) {
        console.error("API를 불러오지 못했습니다.", error);
      }
    };

    fetchMovies();
  }, []);

  const theaters = [
    "서울",
    "강남",
    "강변",
    "건대입구",
    "구로",
    "대학로",
    "동대문",
    "등촌",
    "명동",
    "명동역 씨네라이브러리",
    "목동",
    "미아",
    "방학",
    "봉천",
  ];

  const times = [
    { time: "10:30", seats: "80석" },
    { time: "12:50", seats: "79석" },
    { time: "15:10", seats: "75석" },
    { time: "17:30", seats: "109석" },
    { time: "19:50", seats: "82석" },
    { time: "22:10", seats: "124석" },
  ];

  const getWeekday = (year, month, day) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(year, month - 1, day);
    return weekdays[date.getDay()];
  };

  const getWeekdayColor = (weekday) => {
    if (weekday === "토") return "text-blue-500";
    if (weekday === "일") return "text-red-500";
    return "text-gray-700";
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex border-b">
          <div className="w-1/4 p-4 border-r">
            <h2 className="font-bold mb-2">영화</h2>
            <ul>
              {movies.map((movie, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-1 ${
                    selectedMovie === movie.title ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setSelectedMovie(movie.title)}>
                  {movie.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/4 p-4 border-r">
            <h2 className="font-bold mb-2">극장</h2>
            <ul>
              {theaters.map((theater, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-1 ${
                    selectedTheater === theater ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setSelectedTheater(theater)}>
                  {theater}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/4 p-4 border-r">
            <h2 className="font-bold mb-2">날짜</h2>
            <div className="text-center">
              <div className="font-bold text-3xl">8</div>
              <div>2024</div>
              <div className="flex flex-col items-center mt-4">
                {[24, 25, 26, 27, 28, 29, 30, 31].map((day) => {
                  const weekday = getWeekday(2024, 8, day);
                  const weekdayColor = getWeekdayColor(weekday);
                  return (
                    <button
                      key={day}
                      className={`w-full flex justify-between items-center px-4 py-2 m-1 rounded ${
                        selectedDate === `2024.8.${day}`
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => setSelectedDate(`2024.8.${day}`)}>
                      <span>{day}</span>
                      <span
                        className={
                          selectedDate === `2024.8.${day}`
                            ? "text-white"
                            : weekdayColor
                        }>
                        {weekday}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-1/4 p-4">
            <h2 className="font-bold mb-2">시간</h2>
            <div className="grid grid-cols-2 gap-2">
              {times.map(({ time, seats }, index) => (
                <button key={index} className="bg-gray-100 p-2 text-sm rounded">
                  <div className="font-bold">{time}</div>
                  <div className="text-gray-600">{seats}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold">{selectedMovie}</h3>
            <p>
              {selectedTheater} | {selectedDate}
            </p>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded">
            좌석선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
