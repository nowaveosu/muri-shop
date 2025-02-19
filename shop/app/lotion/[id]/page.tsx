import { MongoClient, ObjectId } from "mongodb"
import Image from "next/image"

export default async function LotionDetailPage({params,}: {params: {id:string}}){
    const client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();

    const db = client.db("products");
    const collection = db.collection("lotion");

    const product = await collection.findOne({ _id: new ObjectId(params.id)});

    await client.close();

    if(!product){
        return <div>존재하지 않는 상품입니다.</div>
    }

    return  (
        <div>
            <h3>{product.name}</h3>
            <div>
                <Image 
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    style={{objectFit:"cover"}}
                />
                <div>별점:{product.star}</div>
            </div>
        </div>
    )
}