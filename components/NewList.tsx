"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const NewList = () => {
  const [companies, setCompanies] = useState<any[]>();
  const [products, setProducts] = useState<any[]>();
  const [drivers, setDrivers] = useState<any[]>();
  const [selectedCompany, setSelectedCompany] = useState("select");
  const [selectedProducts, setSelectedProducts] = useState("select");
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [creating, setCreating] = useState(false);
  const [driverID, setID] = useState<{ id: string }>({ id: "" });
  const [filter, setFilter] = useState("");
  const router = useRouter();
  const toast = useToast();

  const inputRef = useRef<HTMLInputElement>();

  const handleDriverID = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setID((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleCompanyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCompany(e.target.value);
    getDrivers(e.target.value);
  };

  const getDrivers = async (company: string) => {
    try {
      const res = await fetch("/api/get-drivers", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company }),
      });

      if (!res.ok) {
        toast({
          title: "Alert",
          description: "There was an error while getting drivers.",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
      const data = await res.json();
      setDrivers(data.drivers);
    } catch (error) {
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

  const handleChangeProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProducts(e.target.value);
  };

  const handleCreate = async (
    driverName: string,
    number: string,
    id: string
  ) => {
    if (driverID[id] === "" || driverID[id] === undefined) {
      toast({
        title: "Alert",
        description: "Please add driver ID.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (selectedCompany === "select" || selectedProducts === "select") {
      toast({
        title: "Alert",
        description: "Please select company and product.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/create-list", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: selectedCompany,
          drivers: driverName,
          product: selectedProducts,
          driverID: driverID[id],
          carNumber: number,
        }),
      });

      if (!res.ok) {
        setCreating(false);
        toast({
          title: "Alert",
          description: "There was an error while creating driver.",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
      setCreating(false);
      toast({
        title: "Success",
        description: "List created.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      setCreating(false);
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

  useEffect(() => {
    setLoading(true);
    setLoadingProducts(true);
    const getCompanies = async () => {
      try {
        const res = await fetch("/api/get-company");

        if (!res.ok) {
          setLoading(false);
          toast({
            title: "Alert",
            description: "There was an error while getting companies data.",
            status: "info",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          return;
        }
        const data = await res.json();
        setCompanies(data.company);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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

    const getProducts = async () => {
      try {
        const res = await fetch("/api/get-products");

        if (!res.ok) {
          setLoadingProducts(false);
          toast({
            title: "Alert",
            description: "There was an error while getting products data.",
            status: "info",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          return;
        }
        const data = await res.json();
        setProducts(data.products);
        setLoadingProducts(false);
      } catch (error) {
        setLoadingProducts(false);
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
    <div dir="rtl" className="my-5">
      <div>
        <h1 className="text-2xl font-semibold my-3">Create a new list.</h1>
        {loading ? (
          <h1>Loading companies</h1>
        ) : companies?.length! > 0 ? (
          <div>
            <select
              className="p-2 bg-slate-200 rounded w-full block my-3"
              value={selectedCompany}
              onChange={handleCompanyChange}
            >
              <option value="select">Select a company</option>
              {companies?.length! > 0 &&
                companies?.map((com) => {
                  return (
                    <option key={com._id} value={com.name}>
                      {com.name}
                    </option>
                  );
                })}
            </select>
          </div>
        ) : (
          <h1>
            There are no companies, please{" "}
            <Link className="text-sky-500" href="/company">
              create
            </Link>{" "}
            one.
          </h1>
        )}

        {loadingProducts ? (
          <h1>Loading products</h1>
        ) : products?.length! > 0 ? (
          <div>
            <select
              className="p-2 bg-slate-200 rounded my-3 w-full block"
              value={selectedProducts}
              onChange={handleChangeProduct}
            >
              <option value="select">Select a products</option>
              {products?.length! > 0 &&
                products?.map((com) => {
                  return (
                    <option key={com._id} value={com.name}>
                      {com.name}
                    </option>
                  );
                })}
            </select>
          </div>
        ) : (
          <h1>
            There are no products, please{" "}
            <Link className="text-sky-500" href="/product">
              create
            </Link>{" "}
            one.
          </h1>
        )}
        <div>
          {drivers?.length! === 0 && (
            <h1>
              There are no drives for selected company, please{" "}
              <Link className="text-sky-500" href="/driver">
                create
              </Link>{" "}
              one.
            </h1>
          )}
          {drivers?.length! > 0 && (
            <input
              className="w-full bg-slate-200 border-none outline-none p-2 rounded"
              type="text"
              value={filter}
              onChange={handleFilter}
              placeholder="Search for driver"
            />
          )}
        </div>
      </div>
      {drivers?.length! > 0 && (
        <div className="mt-5">
          <table className="border-collapse w-full border border-slate-800">
            <thead>
              <tr>
                <th className="border py-2 px-4 bg-slate-100 text-black/70">
                  Driver Name
                </th>
                <th className="border py-2 px-4 bg-slate-100 text-black/70">
                  Driver City
                </th>
                <th className="border py-2 px-4 bg-slate-100 text-black/70">
                  Driver Car Number
                </th>
                <th className="border py-2 px-4 bg-slate-100 text-black/70">
                  Driver Company
                </th>
                <th className="border py-2 px-4 bg-slate-100 text-black/70">
                  Driver Queue
                </th>
                <th className="border py-2 px-4 bg-slate-100 text-black/70">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {drivers
                ?.filter((d: any) => d.carNumber.includes(filter))
                .map((dr: any, index: number) => (
                  <tr key={dr._id}>
                    <td className="border border-slate-300 px-4 py-2">
                      {dr.name}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      {dr.city}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      {dr.carNumber}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      {dr.company}
                    </td>
                    <td className="border text-center border-slate-300 px-4 py-2">
                      <input
                        key={dr._id}
                        value={driverID[dr._id] || ""}
                        onChange={(e) => handleDriverID(e, dr._id)}
                        className="p-2 w-14 bg-slate-100 outline-none border-none rounded"
                        type="text"
                        placeholder="ID"
                      />
                    </td>
                    <td className="border text-center border-slate-300 px-4 py-2">
                      <button
                        onClick={
                          creating
                            ? undefined
                            : () => handleCreate(dr.name, dr.carNumber, dr._id)
                        }
                        className="border-none outline-none p-2 rounded bg-emerald-400 text-white hover:bg-emerald-700"
                      >
                        Create
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewList;
