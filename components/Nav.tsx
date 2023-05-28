import Link from "next/link";
import React from "react";
import NavSmall from "./NavSmall";

const Nav = () => {
  return (
    <nav className="bg-white/25 w-full sticky top-0 left-0 backdrop-blur transition-colors duration-500 shadow py-3 ">
      <div className="container mx-auto px-24 flex items-center justify-between lg:justify-start lg:flex-row gap-3">
        <div className="flex items-center justify-center">
          <h1>
            <Link className="text-2xl font-sans font-semibold" href={`/`}>
              HAWAR
            </Link>
          </h1>
        </div>
        <div className="hidden justify-start ml-5 gap-3 items-center lg:flex">
          <Link className="hover:text-sky-500" href={"/new-list"}>
            New list
          </Link>
          <Link className="hover:text-sky-500" href={"/company"}>
            Manage companies
          </Link>
          <Link className="hover:text-sky-500" href={"/driver"}>
            Manage drivers
          </Link>
          <Link className="hover:text-sky-500" href={"/product"}>
            Manage products
          </Link>
          <Link className="hover:text-sky-500" href={"/tickets"}>
            Search
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
