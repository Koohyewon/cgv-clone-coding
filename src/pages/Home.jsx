import React from "react";
import HeaderBeforeLogin from "../components/HeaderBeforeLogin";
import Nav from "../components/Nav";
import Movie from "../components/Movie";

export default function Home() {
  return (
    <>
      {/* 토큰에 따라서 로그인 전, 후 헤더 변경 - 아직은 로그인 전 헤더만*/}
      <HeaderBeforeLogin />
      <Nav />
      <Movie />
    </>
  );
}
