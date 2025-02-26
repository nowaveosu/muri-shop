"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/app/redux/features/authSlice";
import type { AppDispatch, RootState } from "@/app/redux/store";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { status, errorMessage, user } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        await dispatch(loginThunk({ email, password })).unwrap();
        alert("로그인 성공");
        router.push("/");
        } catch (err: any) {
        alert(err.message || "로그인 실패");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">로그인</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <input
            type="text"
            placeholder="아이디(이메일)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2"
            />
            <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2"
            />
            <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded mt-2"
            disabled={status === "loading"}
            >
            {status === "loading" ? "로그인 중..." : "로그인"}
            </button>
        </form>

        {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
        )}

        <p className="mt-4">
            아직 회원이 아니신가요?{" "}
            <a href="/auth/register" className="text-blue-500 underline">
            회원가입
            </a>
        </p>
        </div>
    );
}