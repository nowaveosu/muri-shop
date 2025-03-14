"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/features/authSlice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="mb-8 shadow-lg">
      <div className="flex items-center justify-between p-4">
        <div className="hidden md:block">
          <Link href="/lotion"><Image src="/logo.png" width={220}  height={30}alt="logo" /></Link>
        </div>

        <div className="block md:hidden">
          <Link href="/lotion"><Image src="/logo.png"  width={180} height={38} alt="logo" /></Link>
        </div>

        <nav className="hidden md:flex space-x-6 text-lg">
          <Link href="/lotion">보습제</Link>
          <Link href="/pill">영양제</Link>
          <Link href="/medi">처방약</Link>
          <Link href="/board">게시판</Link>
          {user ? (
            <button onClick={handleLogout} className="text-blue-500">
              로그아웃
            </button>
          ) : (
            <Link href="/auth/login" className="text-blue-500">
              로그인
            </Link>
          )}
        </nav>


        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl"
        >

          ☰
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col items-center space-y-4 pb-4 md:hidden text-lg">
          <Link href="/lotion" onClick={() => setIsMenuOpen(false)}>
            보습제
          </Link>
          <Link href="/pill" onClick={() => setIsMenuOpen(false)}>
            영양제
          </Link>
          <Link href="/medi" onClick={() => setIsMenuOpen(false)}>
            처방약
          </Link>
          <Link href="/board" onClick={() => setIsMenuOpen(false)}>
            게시판
          </Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-blue-500"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-blue-500"
            >
              로그인
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}