import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("강남");
  const [selectedDate, setSelectedDate] = useState("");
  const [movies, setMovies] = useState([]);
  const [dateRange, setDateRange] = useState([]);

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
      } catch (error) {
        console.error("API를 불러오지 못했습니다.", error);
      }
    };

    fetchMovies();
    initializeDates();
  }, []);

  const initializeDates = () => {
    const today = new Date();
    const twoWeeksLater = new Date(today.getTime() + 13 * 24 * 60 * 60 * 1000);
    const dates = [];

    for (
      let d = new Date(today);
      d <= twoWeeksLater;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d));
    }

    setDateRange(dates);
    setSelectedDate(formatDate(today));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

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

  const getWeekday = (date) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
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
              <div className="font-bold text-3xl">
                {dateRange.length > 0 ? dateRange[0].getMonth() + 1 : ""}
              </div>
              <div>
                {dateRange.length > 0 ? dateRange[0].getFullYear() : ""}
              </div>
              <div className="flex flex-col items-center mt-4">
                {dateRange.map((date, index) => {
                  const weekday = getWeekday(date);
                  const weekdayColor = getWeekdayColor(weekday);
                  const formattedDate = formatDate(date);
                  return (
                    <button
                      key={index}
                      className={`w-full flex justify-between items-center px-4 py-2 m-1 rounded ${
                        selectedDate === formattedDate
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => setSelectedDate(formattedDate)}>
                      <span>{date.getDate()}</span>
                      <span
                        className={
                          selectedDate === formattedDate
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
