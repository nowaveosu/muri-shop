import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function GET(
    request: NextRequest,
    {params} : {params: {productId: string}}
){
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("products");
    const collection = db.collection("comments");

    const productObjectId = new ObjectId(params.productId);
    const comments = await collection
        .find({ productId: productObjectId })
        .sort({ createdAT: -1 })
        .toArray();
    
    await client.close();

    return NextResponse.json(comments);

}