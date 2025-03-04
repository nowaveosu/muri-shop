
import Card from "../components/Card";
import { MongoClient } from "mongodb"
import Link from "next/link";


export default async function Lotion() {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();

  const db = client.db("products");
  const collection = db.collection("lotion");

  const lotions = await collection.find({type: "lotion"}).toArray();

  await client.close();

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center ">
      {lotions.map((item) => (
        <Link
          key = {item._id.toString()}
          href = {`/lotion/${item._id.toString()}`}
        >
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
