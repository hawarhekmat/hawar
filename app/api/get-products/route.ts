import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Product from "@/models/product";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const products = await Product.find();
        return NextResponse.json({ products }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

