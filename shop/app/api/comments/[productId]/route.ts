import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function GET(
    request: NextRequest,
    {params} : {params: Promise<{ productId: string }> }
){
    const {productId} = await params;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("products");
    const collection = db.collection("comments");

    const productObjectId = new ObjectId(productId);
    const comments = await collection
        .find({ productId: productObjectId })
        .sort({ createdAt: -1 })
        .toArray();
    
    await client.close();

    return NextResponse.json(comments);
}

export async function POST(
    request: NextRequest,
    {params} : {params: Promise<{ productId: string }> }
){
    const {productId} = await params;
    const {author, content} = await request.json();
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("products");
    const collection = db.collection("comments");

    const productObjectId = new ObjectId(productId);

    const newComment = {
        productId: productObjectId,
        author: author || "익명",
        content,
        cratedAt: new Date(),
    };

    await collection.insertOne(newComment);
    await client.close();

    return NextResponse.json({ message: "댓글 작성완료"}, {status: 201});

}