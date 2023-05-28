import ProductsList from "@/models/list";
import { connectToDatabase } from "@/utils/database";
import Link from "next/link";
import React from "react";
import DeleteRecord from "./DeleteRecord";
import Image from "next/image";
import ListRecord from "./ListRecord";

async function getListsForToday() {
  try {
    await connectToDatabase();
    const date = new Date();
    const year = date.getFullYear().toString();
    const dayOfWeek = `${date.getDay() + 1}`;
    const month = `${date.getMonth() + 1}`;
    const dayOfMonth = date.getDate().toString();
    const data = await ProductsList.find({
      year,
      month,
      dayOfWeek,
      dayOfMonth,
    }).sort({ createdAt: -1 });

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const Landing = async () => {
  const data = await getListsForToday();

  if (data.length === 0) {
    return (
      <div className="my-2">
        <h1>
          There are no lists for today!, go and{" "}
          <Link className="text-sky-500" href={`/new-list`}>
            Create
          </Link>{" "}
          one.
        </h1>
      </div>
    );
  }
  return (
    <div className="">
      <ListRecord data={JSON.stringify(data)} />
    </div>
  );
};

export default Landing;
