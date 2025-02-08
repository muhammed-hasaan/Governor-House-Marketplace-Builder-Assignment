import { Suspense } from "react";
import { ProductList } from "@/components/product-list";
import { ProductListSkeleton } from "@/components/product-list-skeleton";
import { AddProductButton } from "@/components/add-product-button";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <AddProductButton />
      </div>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
