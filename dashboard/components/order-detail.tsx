"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getOrderById, type Order } from "@/lib/orders";
import { OrderActions } from "./order-actions";

export function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedOrder = await getOrderById(id as string);
      setOrder(fetchedOrder);
    } catch (error) {
      console.error("Failed to fetch order:", error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrder(updatedOrder);
  };

  if (isLoading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Order {order._id}</span>
          <Badge>{order.orderStatus}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Customer Information</h3>
          <p>Customer ID: {order.customerId}</p>
          <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Shipping Address</h3>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Order Items</h3>
          {order.orderItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span>
                {item.productName} (x{item.quantity})
              </span>
              <span>${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
          <div className="font-semibold mt-2">
            <span>Total Amount:</span>
            <span className="float-right">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Payment Information</h3>
          <p>Method: {order.paymentMethod}</p>
          <p>
            Status: <Badge>{order.paymentStatus}</Badge>
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Shipping Information</h3>
          <p>Tracking ID: {order.trackingId}</p>
          <p>
            Status: <Badge>{order.trackingStatus}</Badge>
          </p>
          <p>
            Ship Date:{" "}
            {order.shipDate
              ? new Date(order.shipDate).toLocaleDateString()
              : "Not shipped yet"}
          </p>
          <p>Total Weight: {order.totalWeight} kg</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Additional Information</h3>
          <p>Insurance Provider: {order.insuranceProvider}</p>
          <p>Label Messages:</p>
          <ul className="list-disc list-inside">
            <li>Reference 1: {order.labelMessages.reference1}</li>
            <li>Reference 2: {order.labelMessages.reference2}</li>
            <li>Reference 3: {order.labelMessages.reference3}</li>
          </ul>
        </div>

        <Separator />

        <OrderActions order={order} onOrderUpdate={handleOrderUpdate} />
      </CardContent>
    </Card>
  );
}
