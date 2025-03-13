import { MongoClient } from "mongodb";
import Link from "next/link";
import Card from "../components/Card";

export default async function Pill() {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();

    const db = client.db("products");
    const collection = db.collection("pill");

    const pills = await collection.find({ type: "pill" }).toArray();

    await client.close();

    return (
        <div className="mx-auto w-full
        sm:w-[640px]
        md:w-[768px]
        lg:w-[1024px]
        ">
            <div className="
            grid 
            grid-cols-1       
            sm:grid-cols-2    
            md:grid-cols-3    
            lg:grid-cols-4
            gap-8 
            justify-items-center
            ">
                {pills.map((item) => {
                    const displayName =
                    item.isPrescription === "yes"
                        ? `${item.name} 💊`
                        : item.name;

                    return (
                    <Link key={item._id.toString()} href={`/pill/${item._id.toString()}`}>
                        <Card
                        productImg={item.image}
                        productName={displayName}
                        type={item.type}
                        likes={item.likes}
                        dislikes={item.dislikes}
                        />
                    </Link>
                    );
                })}
            </div>
        </div>
    );
}