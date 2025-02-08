// app/products/edit/[productId]/page.tsx
import { ProductFormClient } from "@/components/product-form-client";
import { getAllCategories } from "@/lib/categories/getAllCategories";
import { getProductById } from "@/lib/products/getProductById";
import { CategoryList } from "../../../../../../types";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);
  const categories: CategoryList = await getAllCategories();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductFormClient
        categories={categories}
        initialData={product}
        isEdit={true}
      />
    </div>
  );
}
