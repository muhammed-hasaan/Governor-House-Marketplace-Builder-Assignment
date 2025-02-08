"use server";
import { client } from "@/lib/client";
import { revalidatePath } from "next/cache";

async function uploadImage(file: File) {
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

async function getCategoryRef(categoryName: string) {
  const query = `*[_type == "category" && slug.current == $slug][0]{_id}`;
  const params = { slug: categoryName.toLowerCase() };
  const category = await client.fetch(query, params);
  console.log("Category Fetched", category);

  return category?._id;
}

export async function updateProduct(productId: string, formData: FormData) {
  console.log("Product Id", productId);
  console.log("Form Data", formData);

  try {
    const categoryName = formData.get("category") as string;
    const categoryRef = await getCategoryRef(categoryName);

    if (!categoryRef) {
      throw new Error(`Category "${categoryName}" not found`);
    }

    const updateData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: {
        _type: "reference",
        _ref: categoryRef,
      },
      quantity: Number.parseInt(formData.get("quantity") as string),
      price: Number.parseFloat(formData.get("price") as string),
      slug: {
        _type: "slug",
        current: formData.get("slug") as string,
      },
      dimensions: {
        depth: Number.parseFloat(formData.get("dimensions.depth") as string),
        width: Number.parseFloat(formData.get("dimensions.width") as string),
        height: Number.parseFloat(formData.get("dimensions.height") as string),
      },
    };

    // Handle features
    const features = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("features[")) {
        features.push(value);
      }
    }
    // @ts-expect-error "Feature not found in features array for feature type " + feature
    updateData.features = features;

    // Handle tags
    const tags = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("tags[")) {
        tags.push(value);
      }
    }
    // @ts-expect-error "Tag not found in tags array for tag type " + tag
    updateData.tags = tags;

    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.name) {
      const imageAsset = await uploadImage(imageFile);
      // @ts-expect-error "Image not found in image asset" + imageAsset._id
      updateData.image = imageAsset;
    }

    console.log("Updated Data", updateData);

    const result = await client.patch(productId).set(updateData).commit();

    revalidatePath("/all-product");
    return { success: true, productId: result._id };
  } catch (error) {
    console.error("Error updating product:", error);
    // @ts-expect-error is returned from the server when the update fails
    return { success: false, error: error.message };
  }
}
