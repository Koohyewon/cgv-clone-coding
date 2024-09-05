import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeaderBeforeLogin from "./components/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/HeaderAfterLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 토큰 확인 로직
    const token = localStorage.getItem("token"); // 또는 다른 방식으로 토큰을 저장/확인
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <div className="flex-grow">
          {isLoggedIn ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
