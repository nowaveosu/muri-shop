"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoardList } from "../redux/features/boardSlice";
import type { RootState, AppDispatch } from "../redux/store";
import Link from "next/link";

export default function BoardList() {
    const dispatch = useDispatch<AppDispatch>();
    const { list, status, errorMessage, totalPages, currentPage } = useSelector(
        (state: RootState) => state.board
    );
    const [page, setPage] = useState(currentPage || 1);

    useEffect(() => {
        dispatch(fetchBoardList({ page, limit: 5 }));
    }, [dispatch, page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

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
                    <Link href={`/board/${item._id}`} key={item._id}>
                        <li
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

            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`px-1 py-1 rounded ${
                            p === page ? "bg-gray-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        {p}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
}