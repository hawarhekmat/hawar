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
    <div dir="rtl" className="w-full my-5">
      <table className="border-collapse w-full border border-slate-800">
        <thead>
          <tr>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Name
            </th>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((company: any) => (
              <tr key={company._id}>
                <td className="border border-slate-300 px-4 py-2">
                  {company.name}
                </td>
                <td className="border border-slate-300 px-4 text-left py-2">
                  <button
                    onClick={() => {
                      handleUpdate(company._id);
                    }}
                    type="button"
                    className="bg-emerald-400 border-none outline-none hover:bg-emerald-700 rounded text-white p-2"
                  >
                    Update name
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
