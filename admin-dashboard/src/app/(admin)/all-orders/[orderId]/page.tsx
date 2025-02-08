import { getOrderById } from "@/lib/orders/getOrderById";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function OrderDetails({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order ID: {order._id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold">Customer Information</h2>
              <p>Customer ID: {order.customerId}</p>
              <p>Name: {order.returnTo.name}</p>
              <p>Address: {order.returnTo.address}</p>
              <p>City: {order.returnTo.city}</p>
              <p>State: {order.returnTo.state}</p>
              <p>Postal Code: {order.returnTo.postalCode}</p>
            </div>
            <div>
              <h2 className="font-semibold">Order Information</h2>
              <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p>Status: {order.orderStatus}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Payment Status: {order.paymentStatus}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold">Order Items</h2>
            <ul>
              {order.orderItems.map((item, index) => (
                <li key={index}>
                  {item.quantity}x {item.productName} - ${item.price} each
                  (Subtotal: ${item.subtotal})
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
