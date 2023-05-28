"use client";

import { getDayOfWeek } from "@/utils/date";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useState } from "react";

type DeleteRecordProps = {
  rData: Record<string, any>;
};

const DeleteRecord = ({ rData }: DeleteRecordProps) => {
  const name = `${rData.company} ${rData.month} ${rData.dayOfMonth} ${rData.year}`;
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    const html = e.currentTarget.parentElement?.parentElement?.innerHTML;
    const toPrint = html?.substring(0, html?.indexOf('<div class="my-'));

    const contentToPrint = e.currentTarget.parentElement?.parentElement;
    const printWindow = window.open("", "_blank");
    printWindow?.document.open();
    printWindow?.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print</title>
          <style>
            @media print {
              body * {
                visibility: hidden;
              }
              #content-to-print, #content-to-print * {
                visibility: visible;
              }
              #content-to-print {
                position: absolute;
                left: 0;
                top: 0;
              }
            }
          </style>
        </head>
        <body>
          <div id="content-to-print">
            ${toPrint}
          </div>
          <script>
            // Wait for the content to be loaded before printing
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const res = await fetch("/api/delete-list", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: rData._id }),
      });
      if (!res.ok) {
        setLoadingDelete(false);
        toast({
          title: "Alert",
          description: "There was an error while deleting the record.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }

      setLoadingDelete(false);
      router.refresh();
    } catch (error) {
      setLoadingDelete(false);
      toast({
        title: "Alert",
        description: `${error}`,
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleExportPDF = async (
    g: string,
    company: string,
    product: string,
    year: string,
    month: string,
    dayOfMonth: string,
    dayOfWeek: string,
    drivers: string,
    h: string,
    m: string,
    s: string
  ) => {
    setLoadingPDF(true);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            body {
              font-family: 'Open Sans', sans-serif;
              line-height: 1.5;
            }
            
            .container {
              display: flex;
              flex-direction: column;
              padding: 2rem;
              height: 100vh;
              background-color: #ffffff;
            }

            h1 {
                font-weight: 500;
            }
            
            p {
                margin: 0.5rem 0;
            }
            
          </style>
        </head>
        <body>
          <div class="container">
            <h1>GENERATED REPORT</h1>
            <h1>List created for: ${company} company.</h1>
            <p>Product: ${product}.</p>
            <p>Drivers: ${drivers}.</p>
            <p>Date: ${month}/${dayOfMonth}/${year} on ${getDayOfWeek(
      dayOfWeek
    )}.</p>
            <p>Time: ${h}:${m}:${s}.</p>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: htmlContent, fileName: g }),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${g}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setLoadingPDF(false);
    } catch (error) {
      setLoadingPDF(false);
      toast({
        title: "Alert",
        description: `${error}`,
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="my-2 flex flex-col md:flex-row gap-2 md:gap-5">
      <button
        className="p-2 hover:bg-red-700 rounded bg-red-400 text-white border-none outline-none"
        onClick={loadingDelete ? undefined : handleDelete}
        type="button"
      >
        {loadingDelete ? "Deleting record" : "Delete record"}
      </button>
      <button
        onClick={
          loadingPDF
            ? undefined
            : () => {
                handleExportPDF(
                  name,
                  rData.company,
                  rData.products,
                  rData.year,
                  rData.month,
                  rData.dayOfMonth,
                  rData.dayOfWeek,
                  rData.drivers,
                  rData.h,
                  rData.m,
                  rData.s
                );
              }
        }
        className="p-2 bg-sky-300 hover:bg-sky-500 rounded text-white border-none outline-none"
        type="button"
      >
        {loadingPDF ? "Exporting to PDF" : "Export to PDF"}
      </button>
      <button
        className="p-2 hover:bg-slate-600 rounded bg-slate-400 text-white border-none outline-none"
        type="button"
        onClick={handlePrint}
      >
        Print
      </button>
    </div>
  );
};

export default DeleteRecord;
