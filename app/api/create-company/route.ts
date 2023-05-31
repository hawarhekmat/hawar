import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Company from "@/models/company";

export const revalidate = 0;

export async function POST(request: NextRequest) {
    try {
        const { name, logo } = await request.json();
        await connectToDatabase();
        const res = await Company.find({ name })

        if (res.length !== 0) {
            return NextResponse.json({ msg: 'exists.' }, { status: 400 })
        }
        await Company.create({
            name,
            logo
        })
        return NextResponse.json({ mag: 'success.' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

