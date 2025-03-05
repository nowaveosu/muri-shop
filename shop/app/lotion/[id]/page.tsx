import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import CommentSection from "@/app/components/CommentSection";
import LikeDislikeSection from "@/app/components/LikeDislikeSection";

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

  return (
    // 1) 전체 컨테이너를 가운데 정렬 + 여백
    <div className="max-w-screen-lg mx-auto p-4">
      {/* 2) md 이상에서 좌우 2컬럼, md 미만에서는 세로 레이아웃 */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center gap-6">
        {/* 왼쪽: 이미지 */}
        <div className="flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>

        {/* 오른쪽: 제품명 + 좋아요/싫어요 + 댓글 */}
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

          <LikeDislikeSection
            routePrefix="lotion"
            productId={id}
            likes={product.likes ?? 0}
            dislikes={product.dislikes ?? 0}
            likedBy={product.likedBy ?? []}
            dislikedBy={product.dislikedBy ?? []}
          />

          <CommentSection productId={id} />
        </div>
      </div>
    </div>
  );
}