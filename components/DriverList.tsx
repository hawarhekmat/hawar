"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

type DriverProps = {
  items: string;
};

const DriverList = ({ items }: DriverProps) => {
  const data = JSON.parse(items);
  const toast = useToast();

  const [company, setCompany] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [filter, setFilter] = useState("");
  const router = useRouter();
  const filteredData = data.filter((item: any) =>
    item.company.includes(filter)
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
    setFilter(e.target.value);
  };

  const handleUpdateName = async (id: string) => {
    const name = prompt("Please enter a name: ");
    if (name === null) {
      toast({
        title: "Alert",
        description: "Please provide name.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    try {
      const res = await fetch("/api/update-driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({ id, name }),
      });

      if (!res.ok) {
        toast({
          title: "Alert",
          description: "There was an error while updating driver information.",
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
    const con = confirm("Are you sure to delete driver?");
    if (!con) return;
    try {
      const res = await fetch("/api/delete-driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        toast({
          title: "Alert",
          description:
            "There was an error while deleting driver, please try again.",
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
        title: "Alert",
        description: `${error}`,
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const getCompanies = async () => {
    try {
      const res = await fetch("/api/get-company");

      if (!res.ok) {
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
      setCompany(data.company);
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
    getCompanies();
  }, []);

  return (
    <div>
      <select
        className="p-2 rounded my-3"
        value={selectedCompany}
        onChange={handleSelectChange}
      >
        <option value="">Filter by company</option>
        {company?.length! > 0 &&
          company?.map((com) => {
            return (
              <option key={com._id} value={com.name}>
                {com.name}
              </option>
            );
          })}
      </select>
      <ul className="flex flex-col gap-3 relative  max-h-80 overflow-y-auto">
        {data.length > 0 &&
          filteredData.map((d: any) => (
            <li key={d._id} className="bg-slate-50 shadow-sm p-5">
              <h1>
                Name: <span className="text-base">{d.name}</span>
              </h1>

              <h1 className="my-1">
                City: <span>{d.city}</span>
              </h1>

              <h1 className="mb-1">
                Car number: <span>{d.carNumber}</span>
              </h1>
              <h1>
                Works for <span>{d.company}</span> company
              </h1>
              <ul className="flex flex-col md:flex-row gap-3 mt-2">
                <li>
                  <button
                    onClick={() => {
                      handleUpdateName(d._id);
                    }}
                    className="p-2 border-none outline-none rounded text-white hover:bg-emerald-700 bg-emerald-500"
                  >
                    Update name
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleDelete(d._id);
                    }}
                    className="p-2 border-none outline-none text-white hover:bg-red-800 rounded bg-red-400"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DriverList;
