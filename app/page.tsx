import React from "react";
import Landing from "@/components/Landing";

const Home = async () => {
  return (
    <section>
      <div className=" bg-slate-100 shadow p-5 rounded low-y-auto my-10">
        <div className="">
          <h1 className="text-2xl mb-3">Todays list</h1>
          {/* @ts-expect-error Async Server Component */}
          <Landing />
        </div>
      </div>
    </section>
  );
};

export default Home;
