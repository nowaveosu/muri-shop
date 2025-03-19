
import Card from "../components/Card";
import { MongoClient, ObjectId } from "mongodb";
import Link from "next/link";

export default async function Lotion() {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();

  const db = client.db("products");
  const collection = db.collection("lotion");
  const commentsCollection = db.collection("comments");

  const lotions = await collection.find({ type: "lotion" }).toArray();

  for (const product of lotions) {
    const productId = product._id.toString();
    const commentCount = await commentsCollection.countDocuments({
      productId: new ObjectId(productId),
    });
    product.commentCount = commentCount;
  }

  await client.close();

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
          const displayName =
            item.isPrescription === "yes" ? `${item.name} 💊` : item.name;

          return (
            <Link key={item._id.toString()} href={`/lotion/${item._id.toString()}`}>
              <Card
                productImg={item.image}
                productName={displayName}
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