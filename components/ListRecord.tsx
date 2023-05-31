"use client";
import React, { useState } from "react";
import DeleteRecord from "./DeleteRecord";
import PrintAndPDFAll from "./PrintAndPDFAll";

type ListRecordProps = {
  data: string;
};

const ListRecord = ({ data }: ListRecordProps) => {
  const converted = JSON.parse(data);
  return (
    <div dir="rtl" className="my-5">
      <div className="flex gap-3 items-center justify-between my-2 py-2">
        <h1>Todays List</h1>
        <PrintAndPDFAll data={converted} />
      </div>
      <table className="border-collapse w-full border border-slate-800">
        <thead>
          <tr>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Company
            </th>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Product
            </th>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Date
            </th>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Time
            </th>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Driver Name
            </th>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Driver Queue
            </th>
            <th className="border py-2 px-4 bg-slate-100 text-black/70">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {converted.map((list: any) => (
            <tr key={list._id}>
              <td className="border border-slate-300 px-4 py-2">
                {list.company}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {list.products}
              </td>
              <td className="border border-slate-300 px-4 py-2">{`${list.month}/${list.dayOfMonth}/${list.year}`}</td>
              <td className="border border-slate-300 px-4 py-2">{list.time}</td>
              <td className="border border-slate-300 px-4 py-2">
                {list.drivers.join(", ")}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {list.driverID}
              </td>
              <td className="border border-slate-300 px-4 text-right py-2">
                <DeleteRecord rData={list} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRecord;
