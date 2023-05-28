"use client";
import React, { useRef, useState } from "react";
import DeleteRecord from "./DeleteRecord";
import Image from "next/image";

type ListRecordProps = {
  data: string;
};

const ListRecord = ({ data }: ListRecordProps) => {
  const converted = JSON.parse(data);
  const [printing, setPrinting] = useState(false);
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {converted.map((list: any) => (
          <li key={list._id} className="bg-slate-50 shadow-md rounded p-3 my-2">
            <div className="flex items-center justify-start py-5">
              <Image
                src={`/${list.companyLogo}`}
                alt="company logo"
                className="block rounded"
                width={50}
                height={50}
              />
            </div>
            <h1 className="text-xl font-semibold">Company: {list.company}</h1>
            <p className="text-base my-2">Product: {list.products}</p>
            <p className="text-base my-2">
              Date: {list.month}/{list.dayOfMonth}/{list.year}
            </p>
            <p className="text-base my-2">
              Time: {list.h}:{list.m}:{list.s} 24H format
            </p>
            <p className="text-sm">Drivers: {list.drivers.join(", ")}</p>
            <DeleteRecord rData={list} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRecord;
