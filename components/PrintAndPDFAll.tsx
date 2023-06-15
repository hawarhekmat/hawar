"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF";
import React from "react";
import { convertTo12HourFormat } from "@/utils/date";

interface PrintAndPDFAllProps {
  data: any[];
  printText?: string;
  generateText?: string;
}

const PrintAndPDFAll: React.FC<PrintAndPDFAllProps> = ({
  data,
  printText = "چاپکردنی گشتی",
  generateText = "ALL to PDF",
}) => {
  const date = new Date();
  const fileName = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} at ${convertTo12HourFormat(
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  )}`;

  const printAll = (arr: any[]) => {
    const newWindow = window.open("", "_blank");
    const d = arr.map((item: any, index) => {
      return generatePageContent(item, index);
    });
    d.forEach((item: any) => {
      newWindow?.document.write(item);
    });
    newWindow?.document.close();
    newWindow?.addEventListener("load", () => {
      newWindow?.print();
    });
    newWindow?.addEventListener("afterprint", () => {
      newWindow?.close();
    });
  };

  const generatePageContent = (list: any, index:number) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print</title>
          <style>
          @font-face {
            font-family: 'K24 Kurdish Light Font';
            src: url('K24KurdishLight-Light.ttf');
          }

          * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'K24 Kurdish Light Font';
        }
        
        body {
          height: 100vh;
           
        }

        .content-to-print-${index} {
          min-height: 100vh;
          padding-top: 2rem;
          display: flex;
          align-items: start;
          justify-content: space-around;
          gap: 1.5rem;
          flex-direction: column;
        }

        .banner {
          display: flex;
          align-items: center;
          justify-content: center;
          color: red;
          width: 100%;
          font-size: 1.5rem;
        }

        .text-center {
          width: 100%;
          text-align: center;
          color: red;
        }

        p {
          font-size: 1.8rem;
        }

        .end-text {
          width: 100%;
          text-align: left;
        }
          
          </style>
        </head>
        <body>
          <div class="content-to-print-${index}" dir="rtl">
          <div class='banner'>
          <h1 class='text-company'>${list.company}</h1>
          </div>
            <h1 class='text-center'>نۆرە(${list.driverID})</h1>
            <p>ناوی کۆمپانیا: ${list.company}</p>
            <p>ناوی سایەق: ${list.drivers.join(", ")}</p>
            <p>ژمارەی تابلۆ: ${list.carNumber}</p>
            <p>بەرهەم: ${list.products}</p>
            <p>بەروار: ${list.month}/${list.dayOfMonth}/${list.year}</p>
            <p>کات: ${list.time}</p>
            <div class='end-text'>
              <p>چاودێری گۆڕەپان</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;
  };

  return (
    <div>
      <ul className="flex gap-3">
        <li>
          <button
            onClick={() => printAll(data!)}
            className="p-2 rounded outline-none border-none text-white bg-slate-600 hover:bg-slate-800"
            type="button"
          >
            {printText}
          </button>
        </li>
        <li className="center-pdf">
          <PDFDownloadLink
            document={<PDF data={data} />}
            fileName={`${fileName}.pdf`}
            className="pdf-button"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : `${generateText}`
            }
          </PDFDownloadLink>
        </li>
      </ul>
    </div>
  );
};

export default PrintAndPDFAll;
