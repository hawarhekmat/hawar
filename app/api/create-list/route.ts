import Company from "@/models/company";
import ProductsList from "@/models/list";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { drivers, company, product } = await request.json()
        const date = new Date();
        const year = date.getFullYear().toString()
        const dayOfWeek = `${date.getDay() + 1}`
        const month = `${date.getMonth() + 1}`
        const dayOfMonth = date.getDate().toString()
        const h = date.getHours().toString()
        const m = date.getMinutes().toString()
        const s = date.getSeconds().toString()
        const comData = await Company.findOne({ name: company })
        const logo = comData.logo;
        await ProductsList.create({
            companyLogo: logo,
            company,
            h,
            m,
            s,
            products: product,
            drivers,
            year,
            month,
            dayOfMonth,
            dayOfWeek
        });
        return NextResponse.json({ msg: 'success' })
    } catch (error) {
        return NextResponse.json({ msg: 'failure' })
    }
}