import { Suspense } from "react";
import { CategoryList } from "@/components/category-list";
import { CategoryListSkeleton } from "@/components/category-list-skeleton";

export default function CategoriesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
}
