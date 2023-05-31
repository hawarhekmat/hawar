import Company from "@/models/company";
import { connectToDatabase } from "@/utils/database";
import React from "react";
import CompanyList from "./CompanyList";

export const revalidate = 0;

async function getCompanies() {
  try {
    await connectToDatabase();
    const companies = await Company.find().sort({ createdAt: -1 });
    return companies;
  } catch (error) {
    console.log(error);
  }
}

const LoadCompanies = async () => {
  const data = await getCompanies();
  if (data && data.length === 0) {
    return (
      <div className="text-center my-5 p-1">
        <h1 className="text-xl font-semibold">
          There are no companies registered.
        </h1>
      </div>
    );
  }
  return (
    // <div className="bg-slate-100 shadow p-5 rounded mt-5 max-h-96 overflow-y-auto">
    <CompanyList items={JSON.stringify(data)} />
    // </div>
  );
};

export default LoadCompanies;
