import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
    ) {
    const { id } = await params;
    const { userId } = await request.json();
    if (!userId) {
        return NextResponse.json(
        { message: "로그인 후 사용가능한 기능입니다" },
        { status: 400 }
        );
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("products");
    const collection = db.collection("pill");

    const productId = new ObjectId(id);
    const product = await collection.findOne({ _id: productId });
    if (!product) {
        return NextResponse.json({ message: "존재하지 않는 상품입니다" }, { status: 404 });
    }

    if (product.likedBy?.includes(userId) || product.dislikedBy?.includes(userId)) {
        await client.close();
        return NextResponse.json(
        { message: "이미 투표했습니다" },
        { status: 400 }
        );
    }

    await collection.updateOne(
        { _id: productId },
        {
        $inc: { likes: 1 },
        $push: { likedBy: userId },
        }
    );

    await client.close();
    return NextResponse.json({ message: "좋아요를 눌렀습니다!" });
}