
import Card from "../components/Card";
import { MongoClient } from "mongodb"



export default async function Lotion() {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();

  const db = client.db("products");
  const collection = db.collection("lotion");

  const lotions = await collection.find({type: "lotion"}).toArray();

  await client.close();

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {lotions.map((item) => (
        <Card
          key={item._id.toString()}           
          productImg={item.image}            
          productName={item.name}             
          rating={Number(item.star)}
        />
      ))}
    </div>
    );
  }
  