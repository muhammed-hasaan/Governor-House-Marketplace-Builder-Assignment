import ProductForm from "@/components/product-form";

export default function CreateProductPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>
      <ProductForm />
    </div>
  );
}
