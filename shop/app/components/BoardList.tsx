"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoardList } from "../redux/features/boardSlice";
import type { RootState, AppDispatch } from "../redux/store";
import Link from "next/link";

export default function BoardList() {
    const dispatch = useDispatch<AppDispatch>();
    const { list, status, errorMessage } = useSelector(
        (state: RootState) => state.board
    );

    useEffect(() => {
        dispatch(fetchBoardList());
    }, [dispatch]);

    if (status === "loading") return <div className="ml-4">로딩 중...</div>;
    if (status === "error") return <div className="ml-4">에러: {errorMessage}</div>;

    return (
        <div className="p-4">
        <h2 className="flex justify-center text-2xl font-bold mb-4">게시판</h2>
        <div className="text-right">
            <Link
                href="/board/new"
                className="inline-block bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                새 글 작성
            </Link>
        </div>

        <ul className="mt-4 space-y-2">
            {list.map((item) => (
                <Link
                href={`/board/${item._id}`}
                key={item._id}>
                    <li
                        key={item._id}
                        
                        className="border p-2 mb-1 rounded flex justify-between items-center cursor-pointer hover:bg-gray-100"
                    >
                        <div>
                        <span className="text-sm text-gray-500 mr-2">[{item.category}]</span>
                        <span>{item.title}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                        작성자: {item.author ?? "익명"}
                        </div>
                    </li>
                </Link>

            ))}
        </ul>
        </div>
    );
}