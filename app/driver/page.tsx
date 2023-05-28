import LoadDrivers from "@/components/LoadDrivers";
import NewDriver from "@/components/NewDriver";
import React from "react";

const Driver = () => {
  return (
    <section>
      <NewDriver />
      {/* @ts-expect-error Async Server Component */}
      <LoadDrivers />
    </section>
  );
};

export default Driver;
