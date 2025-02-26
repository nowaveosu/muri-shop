"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
        alert("아이디와 비밀번호를 입력하세요.");
        return;
        }

        const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "로그인 실패");
        return;
        }

        alert("로그인 성공!");

        router.push("/");
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">로그인</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <input
            type="text"
            placeholder="이메일"
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
            >
            로그인
            </button>
        </form>

        <p className="mt-4">
            아직 회원이 아니신가요?{" "}
            <a href="/auth/register" className="text-blue-500 underline">
            회원가입
            </a>
        </p>
        </div>
    );
}