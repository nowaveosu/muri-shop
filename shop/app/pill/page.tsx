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
        <div className="flex flex-wrap gap-4 p-4 justify-center">
        {pills.map((item) => (
            <Link key={item._id.toString()} href={`/pill/${item._id.toString()}`}>
                <Card       
                    productImg={item.image}            
                    productName={item.name}             
                    likes={item.likes}
                    dislikes={item.dislikes}
                />     
            </Link>
        ))}
        </div>
    );
}