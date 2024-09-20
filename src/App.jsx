import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import HeaderBeforeLogin from "./components/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/HeaderAfterLogin";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MovieDetail from "./pages/MovieDetail";
import Ticket from "./pages/Ticket";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/movie-detail", element: <MovieDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/ticket", element: <Ticket /> },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //토큰 확인 전, 후 헤더 구분
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); //이중 부정 연산자
  }, []);

  return (
    /* 최소 크기를 100vh로 설정 후, flex-grow 사용해서 contents 부분이 Footer를 제외한 나머지 부분을 차지하게 해서 항상 Footer가 가장 아래에 bottom-0 처럼 위치하도록 함 */
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <div className="flex-grow">
          {isLoggedIn ? (
            <>
              <HeaderAfterLogin />
              <Nav />
            </>
          ) : (
            <>
              <HeaderBeforeLogin />
              <Nav />
            </>
          )}
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
