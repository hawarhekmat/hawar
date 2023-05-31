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
    <div dir="rtl" className="w-full my-5">
      <table className="border-collapse w-full border border-slate-800">
        <thead>
          <tr>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Product Name
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
                      handleDelete(company._id);
                    }}
                    type="button"
                    className="bg-red-400 hover:bg-red-800 border-none outline-none  rounded p-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
