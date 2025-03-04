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
        <div>
            <h3>{product.name}</h3>
            <div>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    style={{ objectFit: "cover" }}
                />
        </div>
        
        <LikeDislikeSection
            productId={id}
            likes={product.likes ?? 0}
            dislikes={product.dislikes ?? 0}
            likedBy={product.likedBy ?? []}
            dislikedBy={product.dislikedBy ?? []}
        />

        <CommentSection productId={id} />
    </div>
    );
}