"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const ProductsList = ({ items }: { items: string }) => {
  const router = useRouter();
  const data = JSON.parse(items);
  const toast = useToast();

  const handleDelete = async (id: string) => {
    const an = confirm("Are you sure to delete product?");
    if (!an) return;
    try {
      const res = await fetch("/api/delete-product", {
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
            "There was an error while deleting the product, please try again.",
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
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data &&
        data.map((company: any) => (
          <li key={company._id} className="bg-slate-50 rounded p-5">
            <h1 className="font-semibold text-2xl mb-2">{company.name}</h1>
            <div className="flex lg:flex-row flex-col gap-5">
              <button
                onClick={() => {
                  handleDelete(company._id);
                }}
                type="button"
                className="bg-red-400 hover:bg-red-800 border-none outline-none  rounded p-2 text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ProductsList;
