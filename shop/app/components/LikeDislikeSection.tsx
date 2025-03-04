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
    <div className="my-4">
      <button
        className="text-xl text-yellow-600 mr-2 px-2 py-1"
        onClick={handleLike}
        disabled={userAlreadyLiked || userAlreadyDisliked}
      >
        👍 {localLikes}
      </button>
      <button
        className="text-xl text-blue-600 px-2 py-1"
        onClick={handleDislike}
        disabled={userAlreadyLiked || userAlreadyDisliked}
      >
        😨 {localDislikes}
      </button>
    </div>
  );
}