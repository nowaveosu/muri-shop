"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface CommentSectionProps {
    productId: string; 
    }

    export default function CommentSection({ productId }: CommentSectionProps) {
    const [comments, setComments] = useState<any[]>([]);
    const [content, setContent] = useState("");


    const user = useSelector((state: RootState) => state.auth.user);


    const fetchComments = async () => {
        const res = await fetch(`/api/comments/${productId}`);
        const data = await res.json();
        setComments(data);
    };


    useEffect(() => {
        fetchComments();
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
        }


        const finalAuthor = user
        ? user.email.split("@")[0]
        : "익명";


        await fetch(`/api/comments/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            author: finalAuthor,
            content,
        }),
        });


        setContent("");
        fetchComments();
    };

    return (
        <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>

        {comments.length === 0 ? (
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
            >
            댓글 작성
            </button>
        </form>
        </div>
    );
}