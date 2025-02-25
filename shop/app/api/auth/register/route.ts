import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ message: "필수 입력창을 입력하세요." }, { status: 400 });
    }


    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("usersDB");  
    const usersCollection = db.collection("users");


    const existing = await usersCollection.findOne({ email });
    if (existing) {
        await client.close();
        return NextResponse.json({ message: "이미 존재하는 아이디입니다." }, { status: 400 });
    }


    const newUser = {
        email,
        password, 
        createdAt: new Date(),
    };
    await usersCollection.insertOne(newUser);

    await client.close();

    return NextResponse.json({ message: "회원가입 성공" }, { status: 201 });
}