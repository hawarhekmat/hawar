import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Product from "@/models/product";

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();
        await connectToDatabase();
        const driver = await Product.create({
            name,
        })
        return NextResponse.json({ driver }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

