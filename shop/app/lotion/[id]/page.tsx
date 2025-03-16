"use client"

import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import LikeDislikeSection from "@/app/components/LikeDislikeSection";
import dynamic from "next/dynamic";


const LazyCommentSection = dynamic(() => import("@/app/components/CommentSection"), {
  loading: () => <p className="text-gray-500 mt-4">댓글을 불러오는 중...</p>,
  ssr: false,
});

export default async function LotionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  const db = client.db("products");
  const collection = db.collection("lotion");

  const product = await collection.findOne({ _id: new ObjectId(id) });
  await client.close();

  if (!product) {
    return <div>존재하지 않는 상품입니다.</div>;
  }

  const displayName =
    product.isPrescription === "yes" ? `${product.name} 💊` : product.name;

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
            likes={product.likes ?? 0}
            dislikes={product.dislikes ?? 0}
            likedBy={product.likedBy ?? []}
            dislikedBy={product.dislikedBy ?? []}
          />

          <LazyCommentSection productId={id} />
        </div>
      </div>
    </div>
  );
}