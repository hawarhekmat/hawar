"use client";

import React, { useEffect, useState } from "react";
import Input from "./Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const NewDriver = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [companies, setCompanies] = useState<any[]>();
  const [selectedCompany, setSelectedCompany] = useState("select");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handleCarNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || city === "" || carNumber === "") {
      toast({
        title: "Alert",
        description: "All fields are required.",
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
        description: "Please select a company.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    try {
      const res = await fetch("/api/create-driver", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          carNumber,
          city,
          company: selectedCompany,
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
      setName("");
      setCity("");
      setCarNumber("");
      router.refresh();
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
    <div dir="rtl" className="p-5 rounded bg-slate-100 shadow my-8">
      <h1 className="text-2xl font-semibold my-3">Add a new driver</h1>
      {loading ? (
        <h1>Loading companies</h1>
      ) : companies?.length! > 0 ? (
        <select
          className="p-2 block w-full rounded my-3"
          value={selectedCompany}
          onChange={handleSelectChange}
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
      ) : (
        <h1>
          There are no companies, please{" "}
          <Link className=" text-sky-55" href="/company">
            create
          </Link>{" "}
          one.
        </h1>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          onChange={handleName}
          placeholder="Name"
          type="text"
          value={name}
        />
        <Input
          onChange={handleCity}
          placeholder="City"
          type="text"
          value={city}
        />
        <Input
          onChange={handleCarNumber}
          placeholder="Car number"
          type="text"
          value={carNumber}
        />
        <button className="p-2 bg-emerald-500 hover:bg-emerald-700 text-white rounded border-none outline-none max-w-fit ">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewDriver;
