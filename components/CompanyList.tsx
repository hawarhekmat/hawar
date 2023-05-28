"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
const CompanyList = ({ items }: { items: string }) => {
  const toast = useToast();
  const router = useRouter();
  const data = JSON.parse(items);

  const handleUpdate = async (id: string) => {
    const name = prompt("Enter a new name: ");
    const logo = prompt("Enter a new banner path: ");

    if (name === null || logo === null) {
      toast({
        title: "Alert",
        description: "Please provide company name and banner path.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    try {
      const res = await fetch("/api/update-company", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          logo,
        }),
      });

      if (!res.ok) {
        toast({
          title: "Alert",
          description:
            "There was an error while updating company details, please try again later.",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
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

  const handleDelete = async (id: string) => {
    const an = confirm(
      "Are you sure to delete company? all drivers will be deleted as well."
    );
    if (!an) return;
    try {
      const res = await fetch("/api/delete-company", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!res.ok) {
        toast({
          title: "Alert",
          description:
            "There was an error while deleting company, please try again later.",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
      router.refresh();
    } catch (error) {
      toast({
        title: "error",
        description: `${error}`,
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  return (
    <ul className="flex flex-col gap-3">
      {data &&
        data.map((company: any) => (
          <li key={company._id} className="bg-slate-50 rounded p-5">
            <h1 className="font-semibold text-2xl mb-2">{company.name}</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => {
                  handleDelete(company._id);
                }}
                type="button"
                className="bg-red-400 border-none outline-none hover:bg-red-700 rounded text-white p-2"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  handleUpdate(company._id);
                }}
                type="button"
                className="bg-emerald-400 border-none outline-none hover:bg-emerald-700 rounded text-white p-2"
              >
                Update name
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CompanyList;
