import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Company from "@/models/company";
import User from "@/models/driver";

export const revalidate = 0;

export async function POST(request: NextRequest) {
    try {
        const { name, logo, id } = await request.json();
        await connectToDatabase();
        const com = await Company.findByIdAndUpdate(id, {
            name,
            logo
        })
        await User.find({ company: com.name }).updateMany({ company: name })
        return NextResponse.json({ msg: 'Company name updated.' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

