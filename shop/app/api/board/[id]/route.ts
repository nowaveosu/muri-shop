import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
const clientPromise: Promise<MongoClient> = client.connect();

export async function GET(
    request: NextRequest,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    }
) {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("products");
    const collection = db.collection("board");

    const boardId = new ObjectId(id);
    const board = await collection.findOne(
        { _id: boardId },
        {
            projection: {
                _id: 1,
                author: 1,
                title: 1,
                category: 1,
                content: 1,
                createdAt: 1,
            },
        }
    );

    if (!board) {
        return NextResponse.json(
            { message: "해당 게시글이 존재하지 않습니다." },
            { status: 404 }
        );
    }

    return NextResponse.json(board);
}