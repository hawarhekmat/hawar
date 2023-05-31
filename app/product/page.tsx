import LoadProduct from "@/components/LoadProduct";
import NewProduct from "@/components/NewProduct";
import React from "react";
export const revalidate = 0;
const Product = async () => {
  return (
    <section>
      <NewProduct />
      {/* @ts-expect-error Async Server Component */}
      <LoadProduct />
    </section>
  );
};

export default Product;
