import Company from "@/models/company";
import ProductsList from "@/models/list";
import { convertTo12HourFormat } from "@/utils/date";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function POST(request: NextRequest) {
    try {
        const { drivers, company, product, driverID, carNumber } = await request.json()
        const date = new Date();
        const year = date.getFullYear().toString()
        const dayOfWeek = `${date.getDay() + 1}`
        const month = `${date.getMonth() + 1}`
        const dayOfMonth = date.getDate().toString()
        const h = date.getHours().toString()
        const m = date.getMinutes().toString()
        const s = date.getSeconds().toString()
        const time = convertTo12HourFormat(`${h}:${m}:${s}`)
        const comData = await Company.findOne({ name: company })
        const logo = comData.logo;
        await ProductsList.create({
            companyLogo: logo,
            driverID,
            company,
            h,
            m,
            s,
            time,
            products: product,
            carNumber,
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