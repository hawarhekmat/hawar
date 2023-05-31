"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
import { getDayOfWeek } from "@/utils/date";
import DeleteRecord from "./DeleteRecord";
import { useRouter } from "next/navigation";
import PrintAndPDFAll from "./PrintAndPDFAll";

const TicketsFilter = () => {
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
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

  const handleFirstDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstDate(e.target.value);
    console.log(firstDate);
  };
  const handleLastDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastDate(e.target.value);
    console.log(lastDate);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const getProducts = async () => {
    if (firstDate === "" || lastDate === "") {
      toast({
        title: "Alert",
        description: `Please enter first date and last date.`,
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    if (selectedCompany === "select") {
      toast({
        title: "Alert",
        description: `Please select a company`,
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

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
          firstDate,
          lastDate,
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
        cache: "no-cache",
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
  }, []);

  return (
    <div dir="rtl">
      <div className=" bg-slate-100 rounded p-3 shadow-md">
        <h1 className="my-1 mb-3 text-xl">Search for created lists.</h1>
        <div className="flex flex-col gap-3">
          <div className="w-full">
            <div>
              <h1 className="text-lg my-3">First Date</h1>
              <input
                className="border-none block w-full outline-none p-3 rounded"
                type="datetime-local"
                value={firstDate}
                onChange={handleFirstDate}
              />
            </div>
            <div>
              <h1 className="text-lg my-3">Last Date</h1>
              <input
                value={lastDate}
                onChange={handleLastDate}
                className="border-none block w-full outline-none p-3 rounded"
                type="datetime-local"
              />
            </div>
          </div>
          <div className="w-full">
            {loadingCompany ? (
              <h1>Loading companies</h1>
            ) : company?.length! > 0 ? (
              <select
                className="p-3 block rounded w-full"
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
          <div className="w-full">
            <button
              className="py-3 px-8 rounded transition-shadow duration-150 bg-white hover:shadow-md text-black/80"
              onClick={getProducts}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {loading ? (
          <h1>Loading data</h1>
        ) : filteredData.length > 0 ? (
          <div>
            <div className="my-4">
              <PrintAndPDFAll data={filteredData} />
            </div>
            <table className="border-collapse w-full border border-slate-800">
              <thead>
                <tr>
                  <th className="border py-2 px-4 bg-slate-100 text-black/70">
                    Company
                  </th>
                  <th className="border py-2 px-4 bg-slate-100 text-black/70">
                    Product
                  </th>
                  <th className="border py-2 px-4 bg-slate-100 text-black/70">
                    Date
                  </th>
                  <th className="border py-2 px-4 bg-slate-100 text-black/70">
                    Time
                  </th>
                  <th className="border py-2 px-4 bg-slate-100 text-black/70">
                    Driver Name
                  </th>
                  <th className="border py-2 px-4 bg-slate-100 text-black/70">
                    Driver Queue
                  </th>
                  <th className="border py-2 px-4 bg-slate-100 text-black/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((list: any) => (
                  <tr key={list._id}>
                    <td className="border border-slate-300 px-4 py-2">
                      {list.company}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      {list.products}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">{`${list.month}/${list.dayOfMonth}/${list.year}`}</td>
                    <td className="border border-slate-300 px-4 py-2">
                      {list.time}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      {list.drivers.join(", ")}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      {list.driverID}
                    </td>
                    <td className="border border-slate-300 px-4 text-right py-2">
                      <DeleteRecord rData={list} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1>No data found based on filters.</h1>
        )}
      </div>
    </div>
  );
};

export default TicketsFilter;
