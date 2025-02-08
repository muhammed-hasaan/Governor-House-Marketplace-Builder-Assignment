"use server";
import { client } from "@/lib/client";
import { revalidatePath } from "next/cache";

export async function createCategory(name: string) {
  try {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const newCategory = await client.create({
      _type: "category",
      name,
      slug: {
        _type: "slug",
        current: slug,
      },
    });

    // Revalidate the categories page to show the new category
    revalidatePath("/all-category");

    return { success: true, category: newCategory };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}
