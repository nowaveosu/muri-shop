import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function GET(
    request: NextRequest,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    }) {

    const { id } = await params;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("products");
    const collection = db.collection("board");


    const boardId = new ObjectId(id);
    const board = await collection.findOne({ _id: boardId });

    await client.close();

    if (!board) {
        return NextResponse.json(
        { message: "해당 게시글이 존재하지 않습니다." },
        { status: 404 }
        );
    }

    return NextResponse.json(board);
}