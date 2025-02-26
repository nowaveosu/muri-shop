"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !confirmPw) {
        alert("모든 입력창을 입력해주세요.");
        return;
        }
        if (password !== confirmPw) {
        alert("비밀번호 확인이 일치하지 않습니다.");
        return;
        }

        const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "회원가입 실패");
        return;
        }

        alert("회원가입이 완료되었습니다. 로그인하세요.");
        router.push("/auth/login");
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">회원가입</h2>
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
            <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className="border rounded p-2"
            />
            <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded mt-2"
            >
            회원가입
            </button>
        </form>
        </div>
    );
}