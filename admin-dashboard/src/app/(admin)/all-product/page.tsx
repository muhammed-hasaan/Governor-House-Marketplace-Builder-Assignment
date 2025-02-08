import { getAllProducts } from "@/lib/products/getAllProducts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { urlFor } from "@/lib/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteButtonClient from "@/components/delete-button-client";
import { ProductList } from "../../../../types";

const AllProducts = async () => {
  const products: ProductList = await getAllProducts();

  console.log("SIngle PRoducts", products[0]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    {product.image.asset && (
                      <Image
                        src={urlFor(product.image.asset).url()}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>
                    {/* Edit Button with Link */}
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/products/edit/${product._id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DeleteButtonClient productId={product._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllProducts;
