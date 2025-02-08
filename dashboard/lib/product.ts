import { client } from "@/lib/sanity";

export async function getProducts() {
  return client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      "slug": slug.current,
      "category": category->name,
      price,
      quantity,
      "imageUrl": image.asset->url,
      tags,
      description,
      features,
      dimensions
    }
  `);
}

export async function addProduct(product: any) {
  return await client.create({
    _type: "product",
    name: product.name,
    slug: {
      _type: "slug",
      current: product.name.toLowerCase().replace(/ /g, "-"),
    },
    category: { _type: "reference", _ref: product.category },
    price: product.price,
    quantity: product.quantity,
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: product.imageAssetId, // This should be the Sanity asset ID
      },
    },
    tags: product.tags,
    description: product.description,
    features: product.features,
    dimensions: product.dimensions,
  });
}

export async function updateProduct(id: any, product: any) {
  return client
    .patch(id)
    .set({
      name: product.name,
      slug: {
        _type: "slug",
        current: product.name.toLowerCase().replace(/ /g, "-"),
      },
      category: { _type: "reference", _ref: product.category },
      price: product.price,
      quantity: product.quantity,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: product.imageAssetId, // This should be the Sanity asset ID
        },
      },
      tags: product.tags,
      description: product.description,
      features: product.features,
      dimensions: product.dimensions,
    })
    .commit();
}

export async function deleteProduct(id: any) {
  return client.delete(id);
}

export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] {
      _id,
      name
    }
  `);
}

export async function uploadImage(file: any) {
  return client.assets.upload("image", file);
}
