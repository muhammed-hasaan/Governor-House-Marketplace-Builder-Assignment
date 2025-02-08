import React from "react";
import type { SanityData } from "../hooks/useSanityData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type MainContentProps = {
  activeSection: "categories" | "products" | "orders" | null;
  activeItem: string | null;
  data: SanityData | null;
};

export function MainContent({
  activeSection,
  activeItem,
  data,
}: MainContentProps) {
  if (!data || !activeSection || !activeItem) {
    return (
      <div className="flex items-center min-h-screen">
        <div className="max-w-lg p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Dashboard Information
          </h1>
          <p className="text-gray-600 leading-relaxed">
            The dashboard currently uses static credentials for access. In the
            future, I plan to implement user authentication by verifying
            credentials against the site's database. This will ensure secure and
            dynamic access control.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Additional features, such as interactive charts and advanced
            functionalities, will also be integrated to enhance the overall user
            experience.
          </p>
        </div>
      </div>
    );
  }

  switch (activeSection) {
    case "categories":
      const category = data.categories.find((c) => c._id === activeItem);
      const categoryProducts = data.products.filter(
        (p) => p.category._ref === activeItem
      );
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{category?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryProducts.map((product) => (
              <Card key={product._id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mb-2"
                  />
                  <p>Price: ${product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );

    case "products":
      const product = data.products.find((p) => p._id === activeItem);
      return (
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>{product?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={product?.image || ""}
                alt={product?.name || ""}
                width={400}
                height={400}
                className="mb-4"
              />
              <p>Price: ${product?.price}</p>
              <p>
                Category:{" "}
                {
                  data.categories.find((c) => c._id === product?.category._ref)
                    ?.name
                }
              </p>
            </CardContent>
          </Card>
        </div>
      );

    case "orders":
      const order = data.orders.find((o) => o._id === activeItem);
      return (
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Order {order?._id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Customer ID: {order?.customerId}</p>
              <p>
                Order Date:{" "}
                {new Date(order?.orderDate || "").toLocaleDateString()}
              </p>
              <p>Status: {order?.orderStatus}</p>
              <p>Total Amount: ${order?.totalAmount}</p>
            </CardContent>
          </Card>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-lg p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Dashboard Information
            </h1>
            <p className="text-gray-600 leading-relaxed">
              The dashboard currently uses static credentials for access. In the
              future, I plan to implement user authentication by verifying
              credentials against the site's database. This will ensure secure
              and dynamic access control.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Additional features, such as interactive charts and advanced
              functionalities, will also be integrated to enhance the overall
              user experience.
            </p>
          </div>
        </div>
      );
  }
}
