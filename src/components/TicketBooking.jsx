import React, { useState, useEffect } from "react";
import axios from "axios";
import TheaterSelector from "./TheaterSelector";
import BookingHeaderButton from "./BookingHeaderButton";

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TicketBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [movies, setMovies] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular",
        params: { language: "ko-kr", page: "1" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDBmMjRjOTE3NTQ5NzQ3ZDNmYzdhOTRlOTU3YTM3MyIsInNiZiI6MTcyMDY3NTI2OC44NDU0NDMsInN1YiI6IjY2OGYyZjE2NzI3ZTNiZDI3M2Y2YmIyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OV5n3pRizgsI70At8IHnwduNXCEHSp8ysSQwmJGU9uY",
        },
      };

      try {
        const response = await axios.request(options);
        setMovies(response.data.results);
        if (response.data.results.length > 0) {
          setSelectedMovie(response.data.results[0]);
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
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

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

  const renderDateButtons = () => {
    let lastRenderedMonth = null;
    let lastRenderedYear = null;

    return dateRange.map((date, index) => {
      const weekday = getWeekday(date);
      const weekdayColor = getWeekdayColor(weekday);
      const formattedDate = formatDate(date);
      const month = date.getMonth();
      const year = date.getFullYear();

      let monthYearHeader = null;
      if (month !== lastRenderedMonth || year !== lastRenderedYear) {
        monthYearHeader = (
          <div
            key={`header-${year}-${month}`}
            className="w-full text-center py-3 text-[#666666]">
            <div className="font-bold text-sm">{year}</div>
            <div className="font-bold text-3xl">{month + 1}</div>
          </div>
        );
        lastRenderedMonth = month;
        lastRenderedYear = year;
      }

      const dateButton = (
        <button
          key={index}
          className={`w-full flex justify-between items-center px-2 py-1 my-1 ${
            selectedDate === formattedDate
              ? "bg-[#333333] text-white border-2 border-black"
              : "bg-[#F2F0E5]"
          }`}
          onClick={() => setSelectedDate(formattedDate)}>
          <span
            className={
              selectedDate === formattedDate ? "text-white" : weekdayColor
            }>
            {weekday}
          </span>
          <span>{date.getDate()}</span>
        </button>
      );

      return monthYearHeader ? [monthYearHeader, dateButton] : dateButton;
    });
  };

  return (
    <>
      <div className="w-[65%] min-w-[980px] max-w-7xl mx-auto mt-8 text-sm">
        <BookingHeaderButton />

        <div className="border-2 border-[#D4D3C9]">
          <div className="bg-[#F2F0E5] overflow-hidden">
            <div className="flex border-b h-[600px]">
              <div className="w-[27.27%] border-r-2 border-[#D4D3C9] flex flex-col">
                <h2 className="w-full h-9 bg-[#333333] text-base text-white font-bold flex justify-center items-center flex-shrink-0">
                  영화
                </h2>
                <ul className="overflow-auto flex-grow p-4">
                  {movies.map((movie, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer p-1 ${
                        selectedMovie && selectedMovie.id === movie.id
                          ? "bg-[#333333] text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedMovie(movie)}>
                      {movie.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-[27.27%] border-r-2 border-[#D4D3C9] flex flex-col">
                <h2 className="w-full h-9 bg-[#333333] text-base text-white text-center font-bold flex justify-center items-center flex-shrink-0">
                  극장
                </h2>
                <TheaterSelector onSelectTheater={setSelectedTheater} />
              </div>
              {/* <div className="w-[27.27%] border-r-2 border-[#D4D3C9] flex flex-col">
                <h2 className="w-full h-9 bg-[#333333] text-white text-center font-bold flex justify-center items-center flex-shrink-0">
                  극장
                </h2>
                <ul className="overflow-auto flex-grow p-4">
                  {theaters.map((theater, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer p-1 ${
                        selectedTheater === theater
                          ? "bg-[#333333] text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedTheater(theater)}>
                      {theater}
                    </li>
                  ))}
                </ul>
              </div> */}

              <div className="w-[9.09%] border-r-2 border-[#D4D3C9] flex flex-col">
                <h2 className="w-full h-9 bg-[#333333] text-base text-white text-center font-bold flex justify-center items-center flex-shrink-0">
                  날짜
                </h2>
                <div className="text-center overflow-auto flex-grow px-2.5 py-4">
                  <div className="flex flex-col items-center">
                    {renderDateButtons()}
                  </div>
                </div>
              </div>

              <div className="w-[36.36%] flex flex-col">
                <h2 className="w-full h-9 bg-[#333333] text-base text-white text-center font-bold flex justify-center items-center flex-shrink-0">
                  시간
                </h2>

                <div className="p-4">
                  <div className="flex items-center pb-2 border-b-[3px] border-[#CFCDC3]">
                    <div className="w-4 h-4 bg-[url('http://img.cgv.co.kr/CGV_RIA/Ticket/image/reservation/icon/icon_morning_night.png')] bg-no-repeat bg-[0_0px] mr-1"></div>
                    <span className="mr-3">모닝</span>

                    <div className="w-4 h-4 bg-[url('http://img.cgv.co.kr/CGV_RIA/Ticket/image/reservation/icon/icon_morning_night.png')] bg-no-repeat bg-[0_-20px]"></div>
                    <span>심야</span>
                  </div>
                </div>
                {/* <div className="grid grid-cols-2 gap-2 p-4">
                  {times.map(({ time, seats }, index) => (
                    <button
                      key={index}
                      className="bg-gray-100 p-2 text-sm rounded"
                    >
                      <div className="font-bold">{time}</div>
                      <div className="text-gray-600">{seats}</div>
                    </button>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white p-4 ">
        <div className="w-[65%] min-w-[980px] max-w-7xl mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center">
            {selectedMovie && (
              <img
                src={`${IMG_BASE_URL}${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                className="w-24 h-36 object-cover mr-4 rounded"
              />
            )}
            <div>
              <h3 className="font-bold">
                {selectedMovie ? selectedMovie.title : ""}
              </h3>
              <p>
                {selectedTheater} | {selectedDate}
              </p>
            </div>
          </div>

          <button className="bg-red-600 text-white px-6 py-2 rounded">
            좌석선택
          </button>
        </div>
      </div>
    </>
  );
};

export default TicketBooking;
