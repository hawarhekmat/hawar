import React from "react";
import Landing from "@/components/Landing";
export const revalidate = 0;
const Home = async () => {
  return (
    <section>
      {/* @ts-expect-error Async Server Component */}
      <Landing />
    </section>
  );
};

export default Home;
