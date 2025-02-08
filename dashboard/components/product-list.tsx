"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { UpdateProductDialog } from "@/components/update-product-dialog";
import { deleteProduct, getProducts } from "@/lib/product";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const fetchedProducts = await getProducts();
    const reverseProducts = await fetchedProducts.reverse();
    setProducts(reverseProducts);
  }

  async function handleDelete(productId: any) {
    await deleteProduct(productId);
    fetchProducts();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <Card key={product._id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <Badge>{product.category}</Badge>
          </CardHeader>
          <CardContent>
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              width={200}
              height={200}
              className="mb-2 object-cover"
            />
            <p className="font-bold">Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p className="mt-2">{product.description}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Features:</h4>
              <ul className="list-disc list-inside">
                {product.features.map((feature: any, index: any) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Dimensions:</h4>
              <p>
                H: {product.dimensions.height}, W: {product.dimensions.width},
                D: {product.dimensions.depth}
              </p>
            </div>
            <div className="mt-2">
              {product.tags.map((tag: any) => (
                <Badge key={tag} variant="secondary" className="mr-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <Button onClick={() => setUpdateProduct(product)}>Update</Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {updateProduct && (
        <UpdateProductDialog
          product={updateProduct}
          onClose={() => setUpdateProduct(null)}
          onUpdate={fetchProducts}
        />
      )}
    </div>
  );
}
