"use client";

import React, { useEffect, useState } from "react";
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
  const [list, setList] = useState<{
    driverNames: string[];
    product: string;
    company: string;
  }>({
    driverNames: [],
    product: "",
    company: "",
  });
  const router = useRouter();
  const toast = useToast();

  const handleCompanyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCompany(e.target.value);
    addCompanyToList(e.target.value);
    getDrivers(e.target.value);
  };

  const addNameToList = (name: string) => {
    if (selectedCompany === "select" || selectedProducts === "select") {
      toast({
        title: "Alert",
        description: "Please select product and company.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    const res = list.driverNames.findLast((d) => d === name);
    if (res != undefined) return;
    const updatedObj = { ...list, driverNames: [...list.driverNames, name] };
    setList(updatedObj);
  };

  const addCompanyToList = (company: string) => {
    const updatedObj = { ...list, company };
    setList(updatedObj);
  };

  const removeNameFromList = (name: string) => {
    const updatedObj = {
      ...list,
      driverNames: list.driverNames.filter((n) => n !== name),
    };
    setList(updatedObj);
  };

  const addProductToList = (product: string) => {
    const updatedObj = { ...list, product };
    setList(updatedObj);
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
    addProductToList(e.target.value);
  };

  const handleCreate = async () => {
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

    if (list.driverNames.length < 0) {
      toast({
        title: "Alert",
        description: "Please select at least one driver.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    try {
      const res = await fetch("/api/create-list", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: list.company,
          drivers: list.driverNames,
          product: list.product,
        }),
      });

      if (!res.ok) {
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
      router.replace("/");
    } catch (error) {
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
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 rounded shadow bg-slate-100 my-6">
      <div>
        <h1 className="text-2xl font-semibold my-3">Create a new list.</h1>
        {loading ? (
          <h1>Loading companies</h1>
        ) : companies?.length! > 0 ? (
          <div>
            <h1>Company</h1>
            <select
              className="p-2 rounded w-full block my-3 lg:max-w-fit "
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
            <h1>Product</h1>
            <select
              className="p-2 rounded my-3 w-full block lg:max-w-fit "
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
          {drivers?.length! > 0 && <h1>Select drivers</h1>}
          {drivers?.length! > 0 && (
            <ul className="grid gap-5 grid-cols-1 md:grid-cols-2">
              {drivers?.map((d: any) => (
                <li
                  className={`my-1 ${
                    list.driverNames.includes(d.name)
                      ? "bg-green-100"
                      : "bg-slate-200"
                  } rounded shadow-sm p-2`}
                  key={d._id}
                >
                  <h1 className="text-lg font-semibold">{d.name}</h1>
                  <ul className="flex flex-row my-2 gap-3">
                    <li>
                      <button
                        onClick={() => {
                          addNameToList(d.name);
                        }}
                        type="button"
                      >
                        Add
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          removeNameFromList(d.name);
                        }}
                        type="button"
                      >
                        Remove
                      </button>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {list.company != "" && (
        <div className="order-first md:order-last">
          <h1 className="text-2xl font-semibold my-3">List info</h1>
          <h1>Company: {list?.company}</h1>
          <p>Product: {list?.product}</p>
          <small>Drivers: {list?.driverNames.join(", ")}</small>
          {list.driverNames.length > 0 ? (
            <button
              onClick={handleCreate}
              type="button"
              className="block my-2 rounded p-1 bg-slate-200"
            >
              Create
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default NewList;
