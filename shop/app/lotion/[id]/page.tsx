import { MongoClient, ObjectId } from "mongodb";
import LotionDetailClient from "./LotionDetailClient";

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
    <LotionDetailClient
      id={id}
      product={{
        name: product.name,
        image: product.image,
        type: product.type,
        isPrescription: product.isPrescription,
        likes: product.likes ?? 0,
        dislikes: product.dislikes ?? 0,
        likedBy: product.likedBy ?? [],
        dislikedBy: product.dislikedBy ?? [],
      }}
    />
  );
}