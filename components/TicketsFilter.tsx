"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
import { getDayOfWeek } from "@/utils/date";
import DeleteRecord from "./DeleteRecord";
import { useRouter } from "next/navigation";

const TicketsFilter = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [company, setCompany] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("select");
  const toast = useToast();

  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({
          company: selectedCompany,
          date: selectedDate,
        }),
      });

      if (!res.ok) {
        setLoading(false);
        toast({
          title: "Alert",
          description: `There was an error while getting data, please try again.`,
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
      const data = await res.json();
      setFilteredData(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Alert",
        description: `${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleDelete = async (id: string) => {
    setLoadingDelete(true);
    try {
      const res = await fetch("/api/delete-list", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
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
      const data = await res.json();
      const f = filteredData.filter((item) => item._id !== data.r._id);
      setFilteredData(f);
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
            <p>Time: ${h}:${m}:${s}</p>
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

  useEffect(() => {
    const getCompanies = async () => {
      setLoadingCompany(true);
      try {
        const res = await fetch("/api/get-company");
        if (!res.ok) {
          setLoadingCompany(false);
          toast({
            title: "Alert",
            description: `There was an error while getting companies.`,
            status: "info",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          return;
        }
        const data = await res.json();

        const companyList = data.company.map((d: any) => d.name);
        const uniq = new Set<string>(companyList);
        const uniqueCompany = Array.from(uniq);
        setCompany(uniqueCompany);
        setLoadingCompany(false);
      } catch (error) {
        setLoadingCompany(false);
        toast({
          title: "Alert",
          description: `${error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    };
    getCompanies();
    getProducts();
  }, []);

  return (
    <div>
      <div className=" bg-slate-100 rounded p-3 shadow-md">
        <h1 className="my-1 mb-3 text-xl">Search for created lists.</h1>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="w-full md:w-max self-center">
            <input
              className="w-full border-none outline-none p-3 rounded"
              type="date"
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
          <div className="w-full md:w-max self-center">
            {loadingCompany ? (
              <h1>Loading companies</h1>
            ) : company?.length! > 0 ? (
              <select
                className="p-3 rounded w-full"
                value={selectedCompany}
                onChange={handleSelectChange}
              >
                <option value="select">Select a company</option>
                {company?.length! > 0 &&
                  company?.map((com: any) => {
                    return (
                      <option key={com} value={com}>
                        {com}
                      </option>
                    );
                  })}
              </select>
            ) : (
              <Link
                className="my-3 max-w-fit block text-blue-400"
                href="/company"
              >
                There are no companies, please create one.
              </Link>
            )}
          </div>
          <div className="w-full md:w-max self-center">
            <button
              className="p-2 w-full rounded transition-shadow duration-150 bg-white hover:shadow-md text-black/80"
              onClick={getProducts}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="p-3 bg-slate-100 mt-5">
        {loading ? (
          <h1>Loading data.</h1>
        ) : filteredData.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredData.map((item: any) => (
              <li className="rounded p-3 bg-white shadow-md" key={item._id}>
                <h1 className="text-xl">Company: {item.company}</h1>
                <p className="text-md my-2">Product: {item.products}</p>
                <p className="text-md">Drivers: {item.drivers.join(", ")}</p>
                <p className="text-md my-2">
                  Time: {`${item.h}:${item.m}:${item.s}`}
                </p>
                <p className="text-md">
                  Date: {item.month}/{item.dayOfMonth}/{item.year} on{" "}
                  {getDayOfWeek(item.dayOfWeek)}
                </p>

                <div className="my-2 flex flex-col md:flex-row gap-2 md:gap-5">
                  <button
                    className="p-2 hover:bg-red-700 rounded bg-red-400 text-white border-none outline-none"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    {loadingDelete ? "Deleting record" : "Delete record"}
                  </button>
                  <button
                    onClick={
                      loadingPDF
                        ? undefined
                        : () => {
                            handleExportPDF(
                              `${item.company} ${item.month} ${item.dayOfMonth} ${item.year}`,
                              item.company,
                              item.products,
                              item.year,
                              item.month,
                              item.dayOfMonth,
                              item.dayOfWeek,
                              item.drivers,
                              item.h,
                              item.m,
                              item.s
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
              </li>
            ))}
          </ul>
        ) : (
          <h1>There are no listed based on selected filters.</h1>
        )}
      </div>
    </div>
  );
};

export default TicketsFilter;
