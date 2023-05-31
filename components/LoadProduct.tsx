import Product from "@/models/product";
import { connectToDatabase } from "@/utils/database";
import React from "react";
import ProductsList from "./ProductList";
export const revalidate = 0;
async function getDrivers() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 });
    return products;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const LoadProduct = async () => {
  const data = await getDrivers();

  if (data && data.length === 0) {
    return (
      <div className="text-center my-5 p-1">
        <h1 className="text-xl font-semibold">There are no products.</h1>
      </div>
    );
  }
  return (
    // <div className="bg-slate-100 shadow p-5 rounded mb-5">
    // <h1 className="mb-2 text-2xl font-semibold">Products</h1>
    <div>
      <ProductsList items={JSON.stringify(data)} />
    </div>
    // </div>
  );
};

export default LoadProduct;
