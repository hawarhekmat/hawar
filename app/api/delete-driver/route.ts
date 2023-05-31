import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/driver";

export const revalidate = 0;

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json();
        await connectToDatabase();

        const res = await User.findByIdAndDelete(id);
        return NextResponse.json({ msg: 'Driver deleted.' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}