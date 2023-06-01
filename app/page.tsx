"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/auth";
import Input from "@/components/Input";

const Home = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const check = () => {
    authContext?.setIsOk(password);
    if (password === "hawarhekmat") {
      router.replace("/home");
    }
  };
  return (
    <section className="flex items-center justify-center h-screen">
      <div dir="rtl" className="p-4 rounded bg-slate-100 shadow">
        <h1 className="text-lg my-3 text-center">Please enter password.</h1>
        <Input
          onChange={handleChange}
          value={password}
          placeholder="Enter password"
          type="password"
        />
        <button
          className="p-3 rounded outline-none border-none bg-sky-500 hover:bg-sky-700 text-white"
          onClick={check}
          type="button"
        >
          Enter
        </button>
      </div>
    </section>
  );
};

export default Home;
