import LoadCompanies from "@/components/LoadCompanies";
import NewCompany from "@/components/NewCompany";
import React from "react";
export const revalidate = 0;
const Company = () => {
  return (
    <section>
      <NewCompany />
      {/* @ts-expect-error Async Server Component */}
      <LoadCompanies />
    </section>
  );
};

export default Company;
