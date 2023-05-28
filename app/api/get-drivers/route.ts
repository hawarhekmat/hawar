import User from "@/models/driver";
import { connectToDatabase } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { company } = await request.json();
        await connectToDatabase()
        const drivers = await User.find({ company }).sort({ createdAt: -1 });
        return NextResponse.json({ drivers }, { status: 200, })
    } catch (error) {
        return NextResponse.json({ error }, {
            status: 400,
        })
    }
}