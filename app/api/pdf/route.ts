import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
    try {
        const { html, fileName } = await req.json();
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfBuffer = await page.pdf();
        await browser.close();
        const res = await new Response(pdfBuffer)
        res.headers.set('Content-Type', 'application/pdf')
        res.headers.set('Content-Disposition', `attachment; filename="${fileName}.pdf"`)
        return res;
    } catch (error) {
        return NextResponse.json({ msg: 'error' }, {
            status: 400,
        })
    }
}
