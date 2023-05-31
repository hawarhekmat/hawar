"use client";

import React, { useState } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const NewProduct = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "") {
      toast({
        title: "Alert",
        description: "Please provide product name.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    try {
      const res = await fetch("/api/create-product", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (!res.ok) {
        toast({
          title: "Alert",
          description:
            "There was an error while creating the product, please try again.",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
      setName("");
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

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div dir="rtl" className="p-5 rounded shadow bg-slate-100 my-5">
      <h1 className="mb-3 decoration-solid underline font-semibold">
        Add products
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={handleName}
          placeholder="Product name"
          type="text"
          value={name}
        />
        <button className="py-3 px-8 rounded border-none outline-none bg-emerald-500 text-white hover:bg-emerald-700">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
