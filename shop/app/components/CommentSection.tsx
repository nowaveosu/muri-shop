"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment } from "../redux/features/commentsSlice";
import type { RootState, AppDispatch } from "../redux/store";

interface Comment {
    _id: string;
    author: string;
    content: string;
    createdAt: string;
}

interface CommentSectionProps {
    productId: string;
    initialComments: Comment[];
}

export default function CommentSection({ productId, initialComments }: CommentSectionProps) {
    const [content, setContent] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootState) => state.comments.items[productId] || initialComments);
    const status = useSelector((state: RootState) => state.comments.status);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        // 초기 데이터가 없으면 Redux에서 가져옴
        if (initialComments.length === 0) {
            dispatch(fetchComments(productId));
        }
    }, [dispatch, productId, initialComments]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        const finalAuthor = user ? user.email.split("@")[0] : "익명";

        await dispatch(
            addComment({
                productId,
                author: finalAuthor,
                content,
            })
        );

        setContent("");
        dispatch(fetchComments(productId));
    };

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">댓글</h2>

            {status === "loading" ? (
                <p>댓글 로딩중...</p>
            ) : comments.length === 0 ? (
                <p>아직 댓글이 없습니다.</p>
            ) : (
                <ul className="space-y-2">
                    {comments.map((comment) => (
                        <li key={comment._id} className="border-b pb-2">
                            <div className="font-medium">{comment.author}</div>
                            <div className="whitespace-pre-line">{comment.content}</div>
                            <div className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col w-full max-w-sm">
                <textarea
                    placeholder="댓글을 입력해주세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border rounded-md p-2 mb-2"
                    rows={3}
                />

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "작성 중..." : "댓글 작성"}
                </button>
            </form>
        </div>
    );
}