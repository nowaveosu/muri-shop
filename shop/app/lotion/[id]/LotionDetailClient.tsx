"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import LikeDislikeSection from "@/app/components/LikeDislikeSection";
import { useMemo } from "react";


const LazyCommentSection = dynamic(() => import("@/app/components/CommentSection"), {
    ssr: false,
    loading: () => <p className="text-gray-500 mt-4">댓글을 불러오는 중...</p>,
});

    interface Product {
    name: string;
    image: string;
    type: string;
    isPrescription?: string;
    likes: number;
    dislikes: number;
    likedBy: string[];
    dislikedBy: string[];
    }

    interface LotionDetailClientProps {
    id: string;     
    product: Product;
    }

    export default function LotionDetailClient({ id, product }: LotionDetailClientProps) {

    const displayName = useMemo(() => {
        if (product.isPrescription === "yes") {
        return `${product.name} 💊`;
        }
        return product.name;
    }, [product.isPrescription, product.name]);

    return (
        <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center gap-6">
            <div className="flex-shrink-0">
            <Image
                src={`/${product.type}/${product.image}`}
                alt={product.name}
                width={300}
                height={300}
                style={{ objectFit: "cover" }}
                className="rounded-md"
            />
            </div>

            <div className="flex flex-col md:w-1/2">
            <h1 className="text-2xl font-semibold mb-2">{displayName}</h1>

            <LikeDislikeSection
                routePrefix="lotion"
                productId={id}
                likes={product.likes}
                dislikes={product.dislikes}
                likedBy={product.likedBy}
                dislikedBy={product.dislikedBy}
            />


            <LazyCommentSection productId={id} />
            </div>
        </div>
        </div>
    );
    }