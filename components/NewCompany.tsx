"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const NewCompany = () => {
  const toast = useToast();
  const [company, setCompany] = useState("");
  const router = useRouter();
  const handleCompany = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value);
  };

  const createCompany = async () => {
    if (company === "") {
      toast({
        title: "Alert",
        description: "Company name is required.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    try {
      const res = await fetch("/api/create-company", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: company,
          logo: `${company}.jpeg`,
        }),
      });

      const data = await res.json();

      if (data.msg === "exists.") {
        toast({
          title: "Alert",
          description: "Company name already exists.",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }

      if (!res.ok) {
        toast({
          title: "Alert",
          description:
            "There was an error while creating company, please try again.",
          status: "warning",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
      setCompany("");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <div dir="rtl" className="bg-slate-100 mt-10 shadow rounded p-4 ">
      <h1 className="font-semibold decoration-solid underline mb-5 text-xl">
        Add companies
      </h1>
      <div>
        <input
          className="border-none outline-none mb-5 p-3 block w-full rounded"
          type="text"
          placeholder="Company name"
          value={company}
          onChange={handleCompany}
        />
        <button
          onClick={createCompany}
          className="py-3 px-8 rounded border-none outline-none bg-emerald-500 text-white hover:bg-emerald-700"
          type="button"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NewCompany;
