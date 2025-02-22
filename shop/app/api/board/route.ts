import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";


const uri = process.env.MONGODB_URI as string;

export async function GET() {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("products");      
    const collection = db.collection("board");

    const allBoards = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    await client.close();

    return NextResponse.json(allBoards);
    }

    export async function POST(request: NextRequest) {
    const { title, category, content } = await request.json();

    if (!title || !category || !content) {
        return NextResponse.json(
        { message: "모든 필드를 입력하세요." },
        { status: 400 }
        );
    }


    const validCategories = ["꿀팁", "일반", "후기"];
    if (!validCategories.includes(category)) {
        return NextResponse.json(
        { message: "유효하지 않은 머릿말입니다." },
        { status: 400 }
        );
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("products");
    const collection = db.collection("board");

    const newBoard = {
        title,
        category,
        content,
        createdAt: new Date(),
    };

    await collection.insertOne(newBoard);
    await client.close();

    return NextResponse.json({ message: "게시글이 등록되었습니다." }, { status: 201 });
}