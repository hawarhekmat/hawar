import TicketsFilter from "@/components/TicketsFilter";
import React from "react";
export const revalidate = 0;
const Tickets = async () => {
  return (
    <section className="p-5 my-10">
      <TicketsFilter />
    </section>
  );
};

export default Tickets;
