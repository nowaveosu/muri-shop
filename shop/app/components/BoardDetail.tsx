"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoardDetail, clearDetail } from "../redux/features/boardSlice";
import type { RootState, AppDispatch } from "../redux/store";
import CommentSection from "./CommentSection";

export default function BoardDetail() {
    const params = useParams();
    const boardId = params.id as string; 
    const dispatch = useDispatch<AppDispatch>();
    const { detail, status, errorMessage } = useSelector(
        (state: RootState) => state.board
    );

    useEffect(() => {
        dispatch(fetchBoardDetail(boardId));

        return () => {
        dispatch(clearDetail()); 
        };
    }, [dispatch, boardId]);

    if (status === "loading") return <div>로딩 중...</div>;
    if (status === "error") return <div>에러: {errorMessage}</div>;
    if (!detail) return <div>게시글이 존재하지 않거나 로딩 중입니다.</div>;

    return (
        <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
            [{detail.category}] {detail.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
            작성일: {new Date(detail.createdAt).toLocaleString()}
        </p>
        <div className="border p-4 mb-6">{detail.content}</div>


        <CommentSection productId={boardId} />
        </div>
    );
}