"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface LikeDislikeProps {
  routePrefix: string;
  productId: string;
  likes: number;
  dislikes: number;
  likedBy: string[];
  dislikedBy: string[];
}

export default function LikeDislikeSection({
  routePrefix, 
  productId,
  likes,
  dislikes,
  likedBy,
  dislikedBy,
}: LikeDislikeProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);

  const userId = user?.id;
  const userAlreadyLiked = userId ? likedBy.includes(userId) : false;
  const userAlreadyDisliked = userId ? dislikedBy.includes(userId) : false;

  const handleLike = async () => {
    if (!userId) {
      alert("로그인 후 사용가능한 기능입니다");
      return;
    }
    if (userAlreadyLiked || userAlreadyDisliked) {
      alert("이미 투표했습니다");
      return;
    }

    const res = await fetch(`/api/${routePrefix}/${productId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      setLocalLikes((prev) => prev + 1);
    } else {
      alert("좋아요 처리 실패");
    }
  };

  const handleDislike = async () => {
    if (!userId) {
      alert("로그인 후 사용가능한 기능입니다");
      return;
    }
    if (userAlreadyLiked || userAlreadyDisliked) {
      alert("이미 투표했습니다");
      return;
    }

    const res = await fetch(`/api/${routePrefix}/${productId}/dislike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      setLocalDislikes((prev) => prev + 1);
    } else {
      alert("싫어요 처리 실패");
    }
  };

  return (
    <div className="mt-4 flex gap-4">
      <button
        onClick={handleLike}
        disabled={userAlreadyLiked || userAlreadyDisliked}
        className="w-20 h-20 border border-yellow-500 rounded flex flex-col items-center justify-center 
                    disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        <span className="text-xl text-yellow-500">
          👍 {localLikes}
        </span>
        <span className="text-sm mt-1">좋아요</span>
      </button>


      <button
        onClick={handleDislike}
        disabled={userAlreadyLiked || userAlreadyDisliked}
        className="w-20 h-20 border border-blue-500 rounded flex flex-col items-center justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        <span className="text-xl text-blue-500">
          😨 {localDislikes}
        </span>
        <span className="text-sm mt-1">싫어요</span>
      </button>
    </div>
  );
}