import { MongoClient } from "mongodb";
import Link from "next/link";
import Card from "../components/Card";

export default async function Medi() {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();

    const db = client.db("products");
    const collection = db.collection("medi");

    const medis = await collection.find({ type: "medi" }).toArray();

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
                {medis.map((item) => {
                    const displayName =
                    item.isPrescription === "yes"
                        ? `${item.name} 💊`
                        : item.name;

                    return (
                    <Link key={item._id.toString()} href={`/medi/${item._id.toString()}`}>
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