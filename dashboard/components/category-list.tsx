import { client } from "@/lib/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getCategories() {
  return client.fetch(`
    *[_type == "category"] {
      _id,
      name,
      "slug": slug.current
    }
  `);
}

export async function CategoryList() {
  const categories = await getCategories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category: any) => (
        <Card key={category._id}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Slug: {category.slug}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
