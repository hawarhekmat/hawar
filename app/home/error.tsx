"use client";

import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-white font-semibold text-2xl ml-2">
        There was an error while loading data.
      </h1>
      <button
        className="border-none outline-none cursor-pointer bg-slate-100 rounded p-2"
        type="button"
        onClick={() => {
          reset();
        }}
      >
        Try again
      </button>
    </section>
  );
};

export default Error;
