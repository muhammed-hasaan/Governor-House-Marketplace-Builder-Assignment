// app/actions/createProduct.ts
"use server";

import { client } from "@/lib/client";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  try {
    const productData = {
      _type: "product",
      name: formData.get("name"),
      description: formData.get("description"),
      slug: {
        _type: "slug",
        current: formData.get("slug"),
      },
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      dimensions: {
        depth: formData.get("dimensions.depth"),
        width: formData.get("dimensions.width"),
        height: formData.get("dimensions.height"),
      },
      features: formData.getAll("features"),
      tags: formData.getAll("tags"),
      category: {
        _type: "reference",
        _ref: await getCategoryRef(formData.get("category") as string),
      },
      image: await uploadImage(formData.get("image") as File),
    };

    const result = await client.create(productData);

    revalidatePath("/products");
    return { success: true, productId: result._id };
  } catch (error: any) {
    console.error("Sanity error:", error);
    return { success: false, error: error.message };
  }
}

async function getCategoryRef(categoryName: string) {
  const query = `*[_type == "category" && slug.current == $slug][0]{_id}`;
  const params = { slug: categoryName.toLowerCase() };
  const category = await client.fetch(query, params);
  console.log("Category Fetched", category);

  return category?._id;
}

export async function uploadImage(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const imageAsset = await client.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type,
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: imageAsset._id,
    },
  };
}
