import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/database";
import ProductsList from "@/models/list";

export async function POST(request: NextRequest) {
    try {
        const { date, company } = await request.json()
        const newDate = new Date(date);
        const year = newDate.getFullYear().toString();
        const dayOfWeek = `${newDate.getDay() + 1}`;
        const month = `${newDate.getMonth() + 1}`;
        const dayOfMonth = newDate.getDate().toString();
        await connectToDatabase();
        const products = await ProductsList.find({ year, month, dayOfMonth, company }).sort({ createdAt: -1 })
        return NextResponse.json({ products }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

