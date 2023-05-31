import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Company from "@/models/company";
import User from "@/models/driver";

export const revalidate = 0;

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json();
        await connectToDatabase();

        const res = await Company.findByIdAndDelete(id);
        await User.deleteMany({ company: res.name })
        return NextResponse.json({ msg: 'success' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}