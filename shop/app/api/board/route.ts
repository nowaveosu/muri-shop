import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
const clientPromise: Promise<MongoClient> = client.connect();

export async function GET(request: NextRequest) {
    const client = await clientPromise;
    const db = client.db("products");
    const collection = db.collection("board");

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const totalBoards = await collection.countDocuments();
    const boards = await collection
        .find({})
        .project({
            _id: 1,
            author: 1,
            title: 1,
            category: 1,
            createdAt: 1,
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

    return NextResponse.json({
        boards,
        totalBoards,
        currentPage: page,
        totalPages: Math.ceil(totalBoards / limit),
    });
}

export async function POST(request: NextRequest) {
    const { author, title, category, content } = await request.json();

    if (!title || !category || !content) {
        return NextResponse.json(
            { message: "모든 필드를 입력해야 합니다." },
            { status: 400 }
        );
    }

    const validCategories = ["꿀팁", "일반", "후기", "건의"];
    if (!validCategories.includes(category)) {
        return NextResponse.json(
            { message: "유효하지 않은 머릿말입니다." },
            { status: 400 }
        );
    }

    const client = await clientPromise;
    const db = client.db("products");
    const collection = db.collection("board");

    const newBoard = {
        author,
        title,
        category,
        content,
        createdAt: new Date(),
    };

    await collection.insertOne(newBoard);

    return NextResponse.json({ message: "게시글이 등록되었습니다." }, { status: 201 });
}