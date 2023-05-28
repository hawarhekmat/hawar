import ProductsList from "@/models/list";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json()
        const r = await ProductsList.findByIdAndDelete(id)
        return NextResponse.json({ msg: 'record deleted.', r })
    } catch (error) {
        return NextResponse.json({ error })
    }
}