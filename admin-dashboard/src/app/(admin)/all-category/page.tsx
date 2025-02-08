import { getAllCategories } from "@/lib/categories/getAllCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Category } from "../../../../types";
import { CreateCategoryForm } from "@/components/CreateCategoryForm";

const AllCategory = async () => {
  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Categories Dashboard
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateCategoryForm />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: Category) => (
          <Card key={category._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {category.name}
                <Badge variant="secondary">{category._id.split("-")[1]}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Slug: {category.slug.current}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
