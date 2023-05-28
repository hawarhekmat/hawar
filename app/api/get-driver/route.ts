import User from "@/models/driver";
import { connectToDatabase } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { name } = await request.json();
        await connectToDatabase()
        const drivers = await User.find({ name }).sort({ createdAt: -1 });
        return NextResponse.json({ drivers }, { status: 200, })
    } catch (error) {
        return NextResponse.json({ error }, {
            status: 400,
        })
    }
}