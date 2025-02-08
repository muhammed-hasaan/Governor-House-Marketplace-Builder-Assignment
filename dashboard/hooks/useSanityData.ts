import { useEffect, useState } from "react";
import { client } from "../lib/sanity";

export type SanityData = {
  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];
  products: {
    _id: string;
    name: string;
    slug: string;
    category: {
      _ref: string;
    };
    price: number;
    image: string;
  }[];
  orders: {
    _id: string;
    customerId: string;
    orderDate: string;
    orderStatus: string;
    totalAmount: number;
  }[];
};

export function useSanityData() {
  const [data, setData] = useState<SanityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(`
          {
            "categories": *[_type == "category"] {
              _id,
              name,
              "slug": slug.current
            },
            "products": *[_type == "product"] {
              _id,
              name,
              "slug": slug.current,
              category,
              price,
              "image": image.asset->url
            },
            "orders": *[_type == "order"] {
              _id,
              customerId,
              orderDate,
              orderStatus,
              totalAmount
            }
          }
        `);
        setData(result);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}
