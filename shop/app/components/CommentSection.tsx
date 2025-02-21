"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchComments, addComment } from "../redux/features/commentsSlice";

export default function CommentSection({ productId }: { productId: string }) {
    const dispatch = useDispatch<AppDispatch>();

    const comments = useSelector(
        (state: RootState) => state.comments.items[productId] || []
    );
    const status = useSelector((state: RootState) => state.comments.status);

    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        dispatch(fetchComments(productId));
    }, [dispatch, productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        await dispatch(addComment({ productId, author, content }));
    
        dispatch(fetchComments(productId));

        setAuthor("");
        setContent("");
    };

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">댓글</h2>
            {status === "loading" && <div>Loading...</div>}
            {comments.length === 0 && status === "idle" ? (
            <p>아직 댓글이 없습니다.</p>
        ) : (
        <ul className="space-y-2">
            {comments.map((comment) => (
            <li key={comment._id} className="border-b pb-2">
                <div className="font-medium">{comment.author}</div>
                <div>{comment.content}</div>
                <div className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                </div>
            </li>
            ))}
        </ul>
        )}

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col w-full max-w-sm">
            <input
                type="text"
                placeholder="닉네임(선택)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border rounded-md p-2 mb-2"
            />
        <textarea
            placeholder="댓글 입력..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded-md p-2 mb-2"
            rows={3}
        />
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
        >
            댓글 작성
        </button>
        </form>
    </div>
    );
}