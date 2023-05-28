import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/driver";

export async function POST(request: NextRequest) {
    try {
        const { name, id } = await request.json();
        await connectToDatabase();
        const com = await User.findByIdAndUpdate(id, {
            name,
        })
        return NextResponse.json({ msg: 'Driver name updated.' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

