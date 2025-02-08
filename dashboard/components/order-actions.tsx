"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateOrder } from "@/lib/orders";
import type { Order } from "@/lib/orders";
import { useToast } from "@/hooks/use-toast";

interface OrderActionsProps {
  order: Order;
  onOrderUpdate: (updatedOrder: Order) => void;
}

export function OrderActions({ order, onOrderUpdate }: OrderActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(order);
  const { toast } = useToast();

  const handleStatusUpdate = async (field: string, value: string) => {
    setIsUpdating(true);
    try {
      const updatedOrder = await updateOrder(order._id, { [field]: value });
      console.log("Updated order", updatedOrder);

      setCurrentOrder(updatedOrder);
      onOrderUpdate(updatedOrder);
      toast({
        title: "Order Updated",
        description: `Successfully updated ${field} to ${value}`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Order Status</label>
          <Select
            disabled={isUpdating}
            value={currentOrder.orderStatus}
            onValueChange={(value) => handleStatusUpdate("orderStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Status</label>
          <Select
            disabled={isUpdating}
            value={currentOrder.paymentStatus}
            onValueChange={(value) =>
              handleStatusUpdate("paymentStatus", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tracking Status</label>
          <Select
            disabled={isUpdating}
            value={currentOrder.trackingStatus}
            onValueChange={(value) =>
              handleStatusUpdate("trackingStatus", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tracking status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="inTransit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/orders")}
            disabled={isUpdating}
          >
            Back to Orders
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleStatusUpdate("orderStatus", "canceled")}
            disabled={isUpdating || currentOrder.orderStatus === "canceled"}
          >
            Cancel Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
