import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/driver";

export const revalidate = 0;

export async function POST(request: NextRequest) {
    try {
        const { name, city, carNumber, company } = await request.json();
        await connectToDatabase();
        const driver = await User.create({
            name, city, carNumber, company,
        })
        return NextResponse.json({ driver }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

