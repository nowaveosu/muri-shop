import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import CommentSection from "@/app/components/CommentSection";
import LikeDislikeSection from "@/app/components/LikeDislikeSection";

export const revalidate = 60;

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
const clientPromise: Promise<MongoClient> = client.connect();

export async function generateStaticParams() {
    const client = await clientPromise;
    const db = client.db("products");
    const collection = db.collection("lotion");

    const products = await collection.find({ type: "lotion" }).toArray();
    return products.map((product) => ({
        id: product._id.toString(),
    }));
}

export default async function LotionDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("products");
    const collection = db.collection("lotion");

    const product = await collection.findOne(
        { _id: new ObjectId(id) },
        {
            projection: {
                _id: 1,
                name: 1,
                type: 1,
                image: 1,
                likes: 1,
                dislikes: 1,
                likedBy: 1,
                dislikedBy: 1,
            },
        }
    );

    if (!product) {
        return <div>존재하지 않는 상품입니다.</div>;
    }

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