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
  printText = "Print All",
  generateText = "Export All To PDF",
}) => {
  const date = new Date();
  const fileName = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} at ${convertTo12HourFormat(
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  )}`;

  const printAll = (arr: any[]) => {
    const newWindow = window.open("", "_blank");
    const d = arr.map((item: any) => {
      return generatePageContent(item);
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

  const generatePageContent = (list: any) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print</title>
          <style>
            @media print {

              @page {
                size: A5;
                margin: 0;
              }

              body * {
                visibility: hidden;
              }
              #content-to-print {
                min-height: 100vh;
              }

              #content-to-print img {
                width: 100%;
                height: 200px;
                display: block;
              }

              #content-to-print p{
                margin: 35px 5px;
                font-size: 2rem;
              }

              #content-to-print, #content-to-print * {
                visibility: visible;
              }
              

              #content-to-print .end-text {
                text-align: left;
              }

              .text-center {
                text-align: center;
                color: red;
              }
            }
          </style>
        </head>
        <body>
          <div id="content-to-print" dir="rtl">
            <img src='/${list.companyLogo}' />
            <h1 class='text-center'>Queue(${list.driverID})</h1>
            <p>Company name: ${list.company}</p>
            <p>Driver name: ${list.drivers.join(", ")}</p>
            <p>Car number: ${list.carNumber}</p>
            <p>Product: ${list.products}</p>
            <p>Date: ${list.month}/${list.dayOfMonth}/${list.year}</p>
            <p>Time: ${list.time}</p>
            <div class='end-text'>
              <p>Marker</p>
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
