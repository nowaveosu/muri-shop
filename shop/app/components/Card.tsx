import Image from "next/image";

interface CardProps {
    productImg: string;
    productName: string;
    type: string;
    likes: number;
    dislikes: number;
    commentCount: number;
}

export default function Card({
    productImg,
    productName,
    type,
    likes,
    dislikes,
    commentCount,
    }: CardProps) {
    return (
        <div className="w-64 border shadow-md rounded-md p-4 flex flex-col items-center">
        <div className="h-40 relative mb-3">
            <Image
            src={`/${type}/${productImg}`}
            alt={productName}
            width={160}
            height={140}
            className="rounded-md"
            />
        </div>

        <h2 className="text-lg mb-1">{productName}</h2>

        <div className="flex justify-between w-36 px-2">
            <div className="text-yellow-600">👍 {likes}</div>
            <div className="text-blue-600">😨 {dislikes}</div>
            <div className="text-green-700">💬 {commentCount}</div>
        </div>
        </div>
    );
}