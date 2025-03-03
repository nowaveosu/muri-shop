"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/features/authSlice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className=" mb-8 pb-2 shadow-lg">
      <div className="flex justify-center items-center mt-12">
        <Image src="/logo.png" width={300} height={64} alt="logo" />
      </div>

      <nav className="mt-9 mb-6 flex justify-center space-x-40 text-lg">
        <Link href="/lotion">보습제</Link>
        <Link href="/tonic">영양제</Link>
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
    </header>
  );
}