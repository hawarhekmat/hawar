"use client";

import Link from "next/link";
import React, { useContext } from "react";
import NavSmall from "./NavSmall";
import { AuthContext } from "@/providers/auth";

const Nav = () => {
  const authContext = useContext(AuthContext);
  if (!authContext?.isOk) return <></>;
  return (
    <nav
      dir="rtl"
      className="bg-white/25 w-full sticky top-0 left-0 backdrop-blur transition-colors duration-500 shadow py-3 "
    >
      <div className="container mx-auto px-24 flex items-center justify-between lg:justify-start lg:flex-row gap-3">
        <div className="flex items-center justify-center">
          <h1>
            <Link className="text-2xl font-sans font-semibold" href={`/home`}>
              HAWAR
            </Link>
          </h1>
        </div>
        <div className="hidden justify-start ml-5 gap-3 items-center lg:flex">
          <Link className="hover:text-sky-500" href={"/new-list"}>
            لیستی نوێ
          </Link>
          <Link className="hover:text-sky-500" href={"/company"}>
            بەڕێوەبردنی کۆمپانیا
          </Link>
          <Link className="hover:text-sky-500" href={"/driver"}>
            بەڕێوەبردنی سایەق
          </Link>
          <Link className="hover:text-sky-500" href={"/product"}>
            بەڕێوەبردنی بەرهەم
          </Link>
          <Link className="hover:text-sky-500" href={"/tickets"}>
            گەڕان
          </Link>
        </div>
        <div className="lg:hidden">
          <NavSmall />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
