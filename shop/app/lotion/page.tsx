import Card from "../components/Card";
import { MongoClient, ObjectId } from "mongodb";
import Link from "next/link";

export const revalidate = 60;

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
const clientPromise: Promise<MongoClient> = client.connect();

export default async function Lotion() {
    const client = await clientPromise;
    const db = client.db("products");
    const collection = db.collection("lotion");
    const commentsCollection = db.collection("comments");

    const lotions = await collection
        .find({ type: "lotion" })
        .project({
            _id: 1,
            image: 1,
            name: 1,
            type: 1,
            likes: 1,
            dislikes: 1,
        })
        .toArray();

    for (const product of lotions) {
        const productId = product._id.toString();
        const commentCount = await commentsCollection.countDocuments({
            productId: new ObjectId(productId),
        });
        product.commentCount = commentCount;
    }

    return (
        <div
            className="mx-auto w-full
                sm:w-[640px]
                md:w-[768px]
                lg:w-[1024px]"
        >
            <div
                className="
                    grid 
                    grid-cols-1       
                    sm:grid-cols-2    
                    md:grid-cols-3    
                    lg:grid-cols-4
                    gap-8 
                    justify-items-center
                "
            >
                {lotions.map((item) => {
                    return (
                        <Link key={item._id.toString()} href={`/lotion/${item._id.toString()}`}>
                            <Card
                                productImg={item.image}
                                productName={item.name}
                                type={item.type}
                                likes={item.likes ?? 0}
                                dislikes={item.dislikes ?? 0}
                                commentCount={item.commentCount ?? 0}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}