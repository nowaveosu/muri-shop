import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ message: "아이디, 비밀번호를 입력하세요." }, { status: 400 });
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("usersDB");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user || user.password !== password) {
        await client.close();
        return NextResponse.json({ message: "아이디 혹은 비밀번호가 일치하지 않습니다." }, { status: 401 });
    }

    await client.close();
    return NextResponse.json({       
        id: user._id.toString(),
        email: user.email, }, { status: 200 });
}