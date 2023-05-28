import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Company from "@/models/company";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const company = await Company.find();
        return NextResponse.json({ company }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

