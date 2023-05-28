import User from "@/models/driver";
import { connectToDatabase } from "@/utils/database";
import React from "react";
import DriverList from "./DriverList";

async function getDrivers() {
  try {
    await connectToDatabase();
    const drivers = await User.find().sort({ createdAt: -1 });
    return drivers;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const LoadDrivers = async () => {
  const data = await getDrivers();

  if (data && data.length === 0) {
    return (
      <div className="text-center my-5 p-1">
        <h1 className="text-xl text-white font-semibold">
          There are no drivers registered.
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 shadow my-5 p-5 rounded ">
      <DriverList items={JSON.stringify(data)} />
    </div>
  );
};

export default LoadDrivers;
