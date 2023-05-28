"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const NewCompany = () => {
  const toast = useToast();
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const router = useRouter();
  const handleCompany = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value);
  };
  const handleLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.value);
  };

  const createCompany = async () => {
    if (company === "" || logo === "") {
      toast({
        title: "Alert",
        description: "Company name and banner path is required.",
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
          logo,
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
      setLogo("");
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
    <div className="bg-slate-100 mt-10 shadow rounded p-4 ">
      <h1 className="font-semibold mb-5 text-xl">Company details</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          className="border-none outline-none p-3 rounded"
          type="text"
          placeholder="Company name"
          value={company}
          onChange={handleCompany}
        />
        <input
          className="border-none outline-none p-3 rounded "
          type="text"
          placeholder="Banner path"
          value={logo}
          onChange={handleLogo}
        />
        <button
          onClick={createCompany}
          className="border-none outline-none p-3 rounded bg-white hover:bg-gray-200"
          type="button"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NewCompany;
