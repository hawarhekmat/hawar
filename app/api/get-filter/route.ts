import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import ProductsList from "@/models/list";

export const revalidate = 0;

export async function POST(request: NextRequest) {
    try {
        const { firstDate, lastDate, company } = await request.json()
        const first = new Date(firstDate);
        const last = new Date(lastDate);


        await connectToDatabase();
        const products = await ProductsList.find({
            company,
            "createdAt": { $gte: first, $lt: last }
        }).sort({ createdAt: -1 })
        return NextResponse.json({ products }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

