"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "../redux/features/boardSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { useRouter } from "next/navigation";

export default function NewBoardForm() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("꿀팁"); 
    const [content, setContent] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { status, errorMessage } = useSelector((state: RootState) => state.board);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        await dispatch(createBoard({ title, category, content })).unwrap();
        alert("게시글이 등록되었습니다.");
        router.push("/board");
        } catch (error: any) {
        alert(error?.message || "게시글 등록 실패");
        }
    };

    return (
        <div className="p-4">
        <h2 className="text-xl font-bold mb-4">새 글 작성</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div>
            <label className="block font-medium">머릿말</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-md p-2"
            >
                <option value="꿀팁">꿀팁</option>
                <option value="일반">일반</option>
                <option value="후기">후기</option>
            </select>
            </div>
            <div>
            <label className="block font-medium">제목</label>
            <input
                type="text"
                className="border rounded-md p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요."
            />
            </div>
            <div>
            <label className="block font-medium">내용</label>
            <textarea
                className="border rounded-md p-2 w-full"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 작성하세요."
            />
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2"
            disabled={status === "loading"}
            >
            {status === "loading" ? "등록 중..." : "등록하기"}
            </button>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
        </div>
    );
}